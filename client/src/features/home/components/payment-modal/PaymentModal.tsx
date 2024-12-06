import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Check } from "lucide-react";

import { applyPromocode } from "@/api-calls/payment-api-calls";
import { Promotion } from "@/features/home/types/home-page-types";
import StripeForm from "@/components/payment/StripeForm";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscountPerc, setPromoDiscountPerc] = useState(0); // Promo code discount percentage
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [promoStatus, setPromoStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stripePaymentTrigger, setStripePaymentTrigger] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  console.log("user is ", userId);
  // Apply both discounts
  const totalPrice = price * (1 - (discountPerc ?? 0) / 100) * (1 - promoDiscountPerc / 100);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStripePaymentTrigger(true);
    
  };

  const handlePaymentCompletion = async () => {
    try {
      
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 3000));
      parentBookingFunc();
      setIsLoading(false);
      onClose();
      

      setStripePaymentTrigger(false);

      toast({
        title: "Success",
        description: "Payment successful",
        variant: "default",
        duration: 3000,
      });
    } catch (e) {
      toast({
        title: "Error",
        description: (e as any).response.data.error,
        variant: "destructive",

        duration: 3000,
      });
    }
  };

  const handleRedeemPromo = async () => {
    setIsRedeeming(true);

    const promoCodeResponse = (await applyPromocode(promoCode, userId)) as Promotion;

    if (promoCodeResponse.message) {
      setTimeout(() => {
        setPromoStatus("error");
        setErrorMessage(promoCodeResponse.message ?? "");
        setTimeout(() => setPromoStatus("idle"), 1500);
        setIsRedeeming(false);
        return;
      }, 1500);
    }

    if (promoCodeResponse.type == "percentage") {
      setTimeout(() => {
        setPromoStatus("success");
        setPromoDiscountPerc(promoCodeResponse.value);
        setIsRedeeming(false);
      }, 2000);
    }
  };

  const handleRemovePromo = () => {
    setPromoCode("");
    setPromoDiscountPerc(0);
    setPromoStatus("idle");
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
        <Label htmlFor="card-element">Credit or debit card</Label>
        <div className="mt-1 border rounded-md p-3">
          <StripeForm
            onPaymentCompletion={handlePaymentCompletion}
            stripePaymentTrigger={stripePaymentTrigger}
            setStripePaymentTrigger={setStripePaymentTrigger}
            setIsLoading={setIsLoading}
          />
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
      <DialogContent className="sm:max-w-[425px]">
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
