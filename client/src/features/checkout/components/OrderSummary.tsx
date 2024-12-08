import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, AlertCircle, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import { useCurrencyStore, useRatesStore } from "@/stores/currency-exchange-store";
import currencyExchange, { currencyExchangeSpec } from "@/utils/currency-exchange";
import { applyPromocode } from "@/api-calls/payment-api-calls";
import { AxiosError } from "axios";
import { PopulatedCart } from "@/features/home/types/home-page-types";

export function OrderSummary({
  cart,
  activePromotion,
  discountAmount,
  total,
  setTotal,
  setDiscountAmount,
  setActivePromotion,
  userId,
}: {
  cart: PopulatedCart;
  activePromotion: ActivePromotion | null;
  discountAmount: number;
  total: number;
  setTotal: (value: number) => void;
  setActivePromotion: (value: ActivePromotion | null) => void;
  setDiscountAmount: (value: number) => void;
  userId: string;
}) {
  const { currency } = useCurrencyStore();
  const { rates } = useRatesStore();
  const baseCurrency = "EGP";

  const [promoCode, setPromoCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const defaultShipping = 100;

  let subtotal = cart.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const subTotalConverted = currencyExchangeSpec(baseCurrency, subtotal, rates, currency);
  const subTotalDisplayed = subTotalConverted ? subTotalConverted.toFixed(2) : "N/A";

  const getShippingCost = () => {
    if (activePromotion?.promotion.type === "shipping") return 0;
    return defaultShipping;
  };

  const discountAmountConverted = currencyExchange(baseCurrency, discountAmount);
  const discountAmountDisplayed = discountAmountConverted
    ? discountAmountConverted.toFixed(2)
    : "N/A";

  let shippingCost = getShippingCost();
  const shippingCostConverted = currencyExchange(baseCurrency, shippingCost);
  const shippingCostDisplayed = shippingCostConverted ? shippingCostConverted.toFixed(2) : "N/A";

  const subtotalAfterDiscount = subtotal - discountAmount;

  const tax = subtotalAfterDiscount * 0.12;
  const taxConverted = currencyExchange(baseCurrency, tax);
  const taxDisplayed = taxConverted ? taxConverted.toFixed(2) : "N/A";

  const totalConverted = currencyExchange(baseCurrency, total);
  const totalDisplayed = totalConverted ? totalConverted.toFixed(2) : "N/A";

  const calculateDiscount = () => {
    if (!activePromotion) return 0;
    switch (activePromotion.promotion.type) {
      case "percentage":
        return (subtotal * activePromotion.promotion.value) / 100;
      case "fixed":
        return Math.min(activePromotion.promotion.value, subtotal);
      default:
        return 0;
    }
  };

  useEffect(() => {
    const newDiscountAmount = calculateDiscount();
    setDiscountAmount(newDiscountAmount);
    setTotal(subtotalAfterDiscount + shippingCost + tax);
  }, [activePromotion, tax]);

  const handleApplyPromoCode = async () => {
    setError(null);
    if (!promoCode.trim()) {
      setError("Please enter a promo code");
      return;
    }
    const normalizedCode = promoCode.trim().toUpperCase();
    try {
      const promotion = await applyPromocode(normalizedCode, userId);
      if (promotion && promotion.message) {
        setError(promotion.message);
        return;
      }
      setActivePromotion({ code: normalizedCode, promotion });
      setPromoCode("");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message || "An error occurred");
      } else {
        setError("An error occurred");
      }
    }
  };

  const handleRemovePromotion = () => {
    setActivePromotion(null);
    getShippingCost();
  };

  const productsWithViewingPrices = cart.products.map((item) => ({
    ...item,
    viewingPrice:
      currencyExchangeSpec(
        baseCurrency,
        item.product.price * item.quantity,
        rates,
        currency,
      )?.toFixed(2) || "N/A",
  }));

  return (
    <div className="space-y-4">
      {productsWithViewingPrices.map((item) => (
        <div key={item.product._id} className="flex items-center gap-4">
          <div className="relative">
            <img
              src={item.product.picture}
              alt={item.product.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <span className="absolute -top-2 -right-2 bg-[#E0D1A5] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm ">
              {item.quantity}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{item.product.name}</h3>
          </div>
          <div className="text-right">
            <p className="font-medium">
              {item.viewingPrice} {currency}
            </p>
          </div>
        </div>
      ))}

      {activePromotion && (
        <Alert className="bg-green-50 border-green-200">
          <AlertDescription className="flex justify-between items-center">
            <div>
              <span className="font-medium">{activePromotion.code}</span>:{" "}
              {activePromotion.promotion.description}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemovePromotion}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {!activePromotion && (
        <div className="mt-6">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline" onClick={handleApplyPromoCode}>
              Apply
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      )}

      <div className="space-y-2 pt-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>
            {" "}
            {subTotalDisplayed} {currency}
          </span>
        </div>

        {activePromotion && discountAmount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>
              -{discountAmountDisplayed} {currency}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span>Shipping</span>
            <Package className="w-4 h-4" />
          </div>
          {shippingCost === 0 ? (
            <span className="text-green-600">FREE</span>
          ) : (
            <span>
              {shippingCostDisplayed} {currency}
            </span>
          )}
        </div>
      </div>
      <div className="pt-4 border-t">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-lg">Total</p>
            <p className="text-sm text-gray-600">
              Including {taxDisplayed} {currency} in taxes
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">{currency}</p>
            <p className="font-medium text-lg">{totalDisplayed} </p>
          </div>
        </div>
      </div>
    </div>
  );
}
