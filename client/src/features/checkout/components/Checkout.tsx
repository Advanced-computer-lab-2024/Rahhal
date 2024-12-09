import { OrderSummary } from "./OrderSummary";
import { Input } from "@/components/ui/input";
import { DeliveryForm } from "./DeliveryForm";
import { getUserById, updateUser } from "@/api-calls/users-api-calls";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CompletionPopup } from "./CompletionPopup";
import { PaymentOptions } from "./PaymentOptions";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { constructReceiptData, createOrderInstance, updateProductsStock } from "../utils/helpers";
import { emptyCart, fetchUserCart } from "@/api-calls/cart-api-calls";
import { usePromocode } from "@/api-calls/promocode-api-calls";
import { sendReceipt } from "@/api-calls/payment-api-calls";
import { useCurrencyStore, useRatesStore } from "@/stores/currency-exchange-store";
import { currencyExchangeSpec } from "@/utils/currency-exchange";
import useUserStore from "@/stores/user-state-store";
import useCartStore from "@/stores/nav-bar-icon-stores/cart-count-store";

export default function Checkout() {
  const { id } = useUserStore();
  const { data: user } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id as string),
    enabled: !!id,
  });
  const { data: cart } = useQuery({
    queryKey: ["user-cart", id],
    queryFn: () => fetchUserCart(id as string),
    enabled: !!id,
  });

  const navigate = useNavigate();
  const { toast } = useToast();
  const { currency } = useCurrencyStore();
  const { rates } = useRatesStore();

  const [selectedAddress, setSelectedAddress] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState<{
    address?: string;
    city?: string;
    postalCode?: string;
    phone?: string;
  }>({});

  const BASE_DELIVERY_FEE = 100;
  const [deliveryFee, setDeliveryFee] = useState(BASE_DELIVERY_FEE);

  const [discountAmount, setDiscountAmount] = useState(0);
  const [activePromotion, setActivePromotion] = useState<ActivePromotion | null>(null);
  const [totalAmount, setTotalAmount] = useState(0);

  const [currentCheckoutStep, setCurrentCheckoutStep] = useState(1);
  const [stripePaymentTrigger, setStripePaymentTrigger] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const { setCount } = useCartStore();

  const currencyConvertor = (originalPrice: number) => {
    return currencyExchangeSpec("EGP", originalPrice, rates, currency) ?? 0;
  };

  const handleContinueToPayment = () => {
    const newErrors: { address?: string; city?: string; postalCode?: string; phone?: string } = {};

    if (!newAddress) {
      newErrors.address = "Address is required";
    }
    if (!city) {
      newErrors.city = "City is required";
    }
    if (!postalCode) {
      newErrors.postalCode = "Postal code is required";
    }
    if (!phone) {
      newErrors.phone = "Phone is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } else {
      newErrors.address = "";
      newErrors.city = "";
      newErrors.postalCode = "";
      newErrors.phone = "";
      setErrors(newErrors);
    }

    setCurrentCheckoutStep(2);
  };

  const handleFreeDelivery = () => {
    setDeliveryFee(0);
  };

  const handleCompleteOrder = () => {
    if (selectedPaymentMethod === "creditCard") {
      setStripePaymentTrigger(true);
    } else if (selectedPaymentMethod === "wallet") {
      const walletBalance = user?.balance || 0;
      if (walletBalance < totalAmount) {
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
      if (user && cart) {
        const fullAddress = `${newAddress}, ${city}`;
        const updatedPromocode =
          activePromotion?.promotion.type === "shipping" ? "DELIVERY" : activePromotion?.code || "";

        await updateProductsStock(cart);

        const order = await createOrderInstance(
          cart,
          selectedPaymentMethod,
          discountAmount,
          updatedPromocode,
          fullAddress,
        );

        if (selectedPaymentMethod === "wallet") {
          await updateUser(user, { balance: (user.balance as number) - totalAmount });
        }
        if (activePromotion) {
          await usePromocode(activePromotion.code, user._id);
        }

        const orderReceipt = constructReceiptData(order, deliveryFee, currency, currencyConvertor);
        await sendReceipt(id!, orderReceipt);
        await emptyCart(cart.user);
        setCount(0);

        if (saveInfo) {
          const updatedAddresses = [...(user.addresses || []), fullAddress];
          await updateUser(user, { addresses: updatedAddresses });
        }
        setCompleted(true);
        setTimeout(() => {
          setCompleted(false);
          navigate(`/my-orders`);
        }, 7000);
      }
    } catch (e) {
      toast({
        title: "Error",
        description: (e as any).response.data.error,
        variant: "destructive",

        duration: 3000,
      });
    }
  };

  const handleGoToPrevStep = () => {
    setCurrentCheckoutStep(1);
  };
  return (
    <>
      <div className="min-h-screen flex">
        <div className="w-1/2 bg-white">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-5xl font-semibold">Checkout</h1>
            </div>
            {currentCheckoutStep === 2 ? (
              user && (
                <div className="mt-10">
                  <PaymentOptions
                    selectedPaymentMethod={selectedPaymentMethod}
                    stripePaymentTrigger={stripePaymentTrigger}
                    walletBalance={(user.balance as number) || 0}
                    onPaymentCompletion={handlePaymentCompletion}
                    setStripePaymentTrigger={setStripePaymentTrigger}
                    setIsLoading={setIsPaymentLoading}
                    setSelectedPaymentMethod={setSelectedPaymentMethod}
                    amount={totalAmount}
                  />
                  <div className="flex gap-4 mt-4">
                    <Button variant="outline" onClick={handleGoToPrevStep}>
                      <ArrowLeft className="h-5 w-5 " />
                    </Button>
                  </div>
                </div>
              )
            ) : (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Contact</h2>
                  </div>
                  <div className="mt-4 space-y-4">
                    <Input
                      type="email"
                      placeholder="Email"
                      defaultValue={user?.email || ""}
                      disabled
                    />
                  </div>
                </div>
                {user && (
                  <DeliveryForm
                    user={user}
                    selectedAddress={selectedAddress}
                    setSelectedAddress={setSelectedAddress}
                    newAddress={newAddress}
                    setNewAddress={setNewAddress}
                    city={city}
                    setCity={setCity}
                    postalCode={postalCode}
                    setPostalCode={setPostalCode}
                    phone={phone}
                    setPhone={setPhone}
                    saveInfo={saveInfo}
                    setSaveInfo={setSaveInfo}
                    selectedPaymentMethod={selectedPaymentMethod}
                    setSelectedPaymentMethod={setSelectedPaymentMethod}
                    errors={errors}
                    setErrors={setErrors}
                  />
                )}
              </div>
            )}
          </div>
        </div>

        <div className="w-1/2 bg-gray-50 ">
          <div className="p-8 sticky top-0  ">
            {user && cart && (
              <div className="max-w-md mx-auto p-4">
                <OrderSummary
                  cart={cart}
                  discountAmount={discountAmount}
                  activePromotion={activePromotion}
                  total={totalAmount}
                  userId={id!}
                  setDiscountAmount={setDiscountAmount}
                  setActivePromotion={setActivePromotion}
                  setTotal={setTotalAmount}
                  onFreeDelivery={handleFreeDelivery}
                />
                <Button
                  className="mt-6 w-full bg-complimentary-color hover:bg-complementary-hover disabled:bg-[--complimentary-color-fade] text-white py-3 px-4 rounded-md font-medium transition-colors"
                  onClick={currentCheckoutStep == 2 ? handleCompleteOrder : handleContinueToPayment}
                  disabled={currentCheckoutStep == 2 && selectedPaymentMethod === ""}
                >
                  {isPaymentLoading
                    ? "Processing..."
                    : currentCheckoutStep == 2
                      ? "Complete Order"
                      : "Continue to Payment"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {user && (
        <CompletionPopup
          completed={completed}
          isPayedWithWallet={selectedPaymentMethod === "wallet"}
          remainingWalletBalance={(user.balance as number) - totalAmount}
          orderDetails="This is a test order"
        />
      )}
    </>
  );
}
