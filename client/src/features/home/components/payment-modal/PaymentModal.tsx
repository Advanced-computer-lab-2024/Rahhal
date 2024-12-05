"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

import { Check } from "lucide-react";


import currencyExchange from "@/utils/currency-exchange";

// Replace with your Stripe publishable key

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
}
interface BookingFormProps {
  price: number;
  name: string;
  type: string;
  currency: string;
  discountPerc?: number;

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
}: BookingFormProps) {
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscountPerc, setPromoDiscountPerc] = useState(0); // Promo code discount percentage
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [promoStatus, setPromoStatus] = useState<"idle" | "success" | "error">("idle");
  const [isLoading, setIsLoading] = useState(false);

  // Apply both discounts
  const totalPrice = price * (1 - (discountPerc ?? 0) / 100) * (1 - promoDiscountPerc / 100);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 3000));
    parentBookingFunc();
    setIsLoading(false);
    onClose();
  };

  const handleRedeemPromo = async () => {
    setIsRedeeming(true);
    // Simulate API call to validate promo code
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate promo code validation (50% chance of success)
    const isSuccess = Math.random() < 0.5;

    if (isSuccess) {
      setPromoDiscountPerc(15);
      setPromoStatus("success");
    } else {
      setPromoStatus("error");
      setTimeout(() => setPromoStatus("idle"), 2000);
    }

    setIsRedeeming(false);
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
        {promoStatus === "error" && (
          <p className="text-red-500 text-sm mt-1">Invalid promo code. Please try again.</p>
        )}
      </div>
      <div>
        <Label htmlFor="card-element">Credit or debit card</Label>
        <div className="mt-1 border rounded-md p-3"></div>
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
        />
      </DialogContent>
    </Dialog>
  );
}
