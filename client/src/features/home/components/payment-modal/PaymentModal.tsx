import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Check, Wallet, CreditCard } from "lucide-react";
import { applyPromocode } from "@/api-calls/payment-api-calls";
import { Promotion } from "@/features/home/types/home-page-types";
import { useLocation, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { PaymentOptions, TPaymentMethod } from "@/features/checkout/components/PaymentOptions";
import { getUserById, updateUser } from "@/api-calls/users-api-calls";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRatesStore } from "@/stores/currency-exchange-store";
import { currencyExchangeSpec } from "@/utils/currency-exchange";

const paymentMethods: TPaymentMethod[] = [
  {
    id: "wallet",
    label: "Wallet",
    icon: <Wallet className="text-primary-color" />,
    expandable: false,
  },
  {
    id: "creditCard",
    label: "Pay via card card",
    icon: <CreditCard className="text-primary-color" />,
    expandable: true,
  },
];
interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: number;
  name: string;
  type: string;
  currency: string;
  discountPerc?: number;
  taxiPrice?: number;
  parentBookingFunc: () => void;
  userId: string;
}
interface BookingFormProps {
  price: number;
  name: string;
  type: string;
  currency: string;
  discountPerc?: number;
  userId: string;

  onClose: () => void;
  parentBookingFunc: () => void;
}

function useIdFromParamsOrQuery() {
  const { id: paramId } = useParams<{ id?: string }>();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const queryId = queryParams.get("userId");

  return paramId || queryId;
}

function BookingForm({
  price,
  name,
  type,
  currency,
  discountPerc,
  onClose,
  parentBookingFunc,
  userId,
}: BookingFormProps) {
  const id = useIdFromParamsOrQuery();

  const { data: user } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id as string),
    enabled: !!id,
  });
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscountPerc, setPromoDiscountPerc] = useState(0); // Promo code discount percentage
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [promoStatus, setPromoStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stripePaymentTrigger, setStripePaymentTrigger] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { toast } = useToast();
  const { rates } = useRatesStore();

  // Apply both discounts
  const totalPrice = price * (1 - (discountPerc ?? 0) / 100) * (1 - promoDiscountPerc / 100);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    handleCompleteOrder();
    setStripePaymentTrigger(true);
  };

  const handleCompleteOrder = () => {
    if (selectedPaymentMethod === "creditCard") {
      setStripePaymentTrigger(true);
    } else if (selectedPaymentMethod === "wallet") {
      const walletBalance = user?.balance || 0;

      if (walletBalance < totalPrice) {
        toast({
          title: "Insufficient balance",
          description:
            "Unfortunately, you do not have enough balance in your wallet to complete this order",
          variant: "destructive",
          duration: 3000,
        });
      } else {
        handlePaymentCompletion();
      }
    } else {
      handlePaymentCompletion();
    }
  };

  const handlePaymentCompletion = async () => {
    try {
      setIsLoading(true);

      // Do the actual booking
      await parentBookingFunc();
      await new Promise((resolve) => setTimeout(resolve, 3000));

      let remainingBalanceConverted, remainingBalanceFormatted;
      if (selectedPaymentMethod === "wallet") {
        const remainingBalance = (user.balance as number) - totalPrice;
        await updateUser(user, { balance: remainingBalance });
        remainingBalanceConverted = currencyExchangeSpec("EGP", remainingBalance, rates, currency);
        remainingBalanceFormatted = remainingBalanceConverted
          ? remainingBalanceConverted.toFixed(2)
          : "N/A";
      }

      toast({
        title: "Thank you for choosing Rahhal",
        description:
          selectedPaymentMethod === "wallet"
            ? `You have ${remainingBalanceFormatted} ${currency} left in your wallet, enjoy them 🥳`
            : "Payment Successful",
        variant: "default",
        duration: 5000,
      });
    } catch (e) {
      toast({
        title: "Error",
        description: (e as any).response.data.error,
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setStripePaymentTrigger(false);
      setIsLoading(false);
      onClose();
    }
  };

  const handleRedeemPromo = async () => {
    setIsRedeeming(true);

    try {
      const promoCodeResponse = (await applyPromocode(promoCode, userId)) as Promotion;
      if (promoCodeResponse.type == "percentage") {
        setPromoStatus("success");
        setPromoDiscountPerc(promoCodeResponse.value);
      }
    } catch (error: unknown) {
      setPromoStatus("error");
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message || "An error occurred");
      } else {
        setErrorMessage("An error occurred");
      }
      setIsRedeeming(false);
      setTimeout(() => setPromoStatus("idle"), 3000);
    }
  };

  const handleRemovePromo = () => {
    setPromoCode("");
    setPromoDiscountPerc(0);
    setPromoStatus("idle");
    setIsRedeeming(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Order Summary</h3>
        <p>
          {type}: {name}
        </p>
        <p>
          Price: {currency} {price.toFixed(0)}
        </p>
        {(discountPerc ?? 0) > 0 && (
          <p className="text-blue-600">
            Discount ({discountPerc ?? 0}%): -{currency}{" "}
            {(price * ((discountPerc ?? 0) / 100)).toFixed(0)}
          </p>
        )}
        {promoDiscountPerc > 0 && (
          <p className="text-green-600">
            Promo Code Discount ({promoDiscountPerc}%): -{currency}{" "}
            {(price * (1 - (discountPerc ?? 0) / 100) * (promoDiscountPerc / 100)).toFixed(0)}
          </p>
        )}
        <p className="font-bold">
          Total: {currency} {totalPrice.toFixed(0)}
        </p>
      </div>
      <div>
        <Label htmlFor="promoCode">Promo Code</Label>
        <div className="flex mt-1">
          <div className="relative flex-grow">
            <Input
              id="promoCode"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
              className={`pr-20 ${promoStatus === "error" ? "border-red-500 animate-shake" : ""}`}
              disabled={promoStatus === "success"}
            />
            {promoStatus === "success" ? (
              <button
                type="button"
                onClick={handleRemovePromo}
                className="absolute right-0 top-0 h-full px-3 py-2 text-sm text-green-600 flex items-center hover:text-green-700 transition-colors"
              >
                <Check className="mr-1 h-4 w-4" /> Remove
              </button>
            ) : (
              <button
                type="button"
                onClick={handleRedeemPromo}
                disabled={isRedeeming || promoCode.length === 0}
                className="absolute right-0 top-0 h-full px-3 py-2 text-sm text-primary hover:text-primary-dark transition-colors disabled:text-gray-400"
              >
                {isRedeeming ? "Redeeming..." : "Redeem"}
              </button>
            )}
          </div>
        </div>
        {promoStatus === "error" && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
      </div>
      <div>
        <div className="mt-1 border rounded-md p-3">
          {user && (
            <PaymentOptions
              walletBalance={user?.balance || 0}
              selectedPaymentMethod={selectedPaymentMethod}
              stripePaymentTrigger={stripePaymentTrigger}
              onPaymentCompletion={handlePaymentCompletion}
              setStripePaymentTrigger={setStripePaymentTrigger}
              setIsLoading={setIsPaymentLoading}
              setSelectedPaymentMethod={setSelectedPaymentMethod}
              paymentMethods={paymentMethods}
              amount={totalPrice}
            />
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          type="submit"
          className="w-full max-w-md py-6 text-lg bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)]"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading
            </>
          ) : (
            <>
              Pay {currency} {totalPrice.toFixed(2)}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

export default function BookingModal({
  currency,
  name,
  price,
  type,
  isOpen,
  onClose,
  discountPerc,
  parentBookingFunc,
  userId,
}: BookingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Book {type}</DialogTitle>
        </DialogHeader>

        <BookingForm
          price={price}
          name={name}
          type={type}
          currency={currency}
          discountPerc={discountPerc}
          onClose={onClose}
          parentBookingFunc={parentBookingFunc}
          userId={userId}
        />
      </DialogContent>
    </Dialog>
  );
}
