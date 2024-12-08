import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import {
  decrementQuantity,
  fetchUserCart,
  incrementQuantity,
  removeItemFromCart,
} from "@/api-calls/cart-api-calls";
import { useQuery } from "@tanstack/react-query";
import type { PopulatedCart } from "@/features/home/types/home-page-types";
import useCartStore from "@/stores/nav-bar-icon-stores/cart-count-store";
import useProductRefreshStore from "@/stores/refresh-product-store";
import { useCurrencyStore, useRatesStore } from "@/stores/currency-exchange-store";
import { currencyExchangeSpec } from "@/utils/currency-exchange";

interface CartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartModal({ open, onOpenChange }: CartModalProps) {
  const [cart, setCart] = useState<PopulatedCart | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [prices, setPrices] = useState<Record<string, number>>([]);
  const navigate = useNavigate();
  const { id: paramId } = useParams<{ id?: string }>();
  const { incrementCount, decrementCount, setCount } = useCartStore();
  const { setRefresh } = useProductRefreshStore();
  const { currency } = useCurrencyStore();
  const { rates } = useRatesStore();
  const baseCurrency = "EGP";

  const { data: cartData, isSuccess } = useQuery({
    queryKey: ["cart", "products"],
    queryFn: () => fetchUserCart(paramId as string),
    enabled: !!paramId && open,
    select: (data) => data as PopulatedCart,
  });

  useEffect(() => {
    if (isSuccess && cartData) {
      setCart(cartData);
    }
  }, [cartData]);

  useEffect(() => {
    if (cart) {
      const initialQuantities: Record<string, number> = {};
      cart.products.forEach((item) => {
        initialQuantities[item.product._id] = item.quantity;
      });
      setQuantities(initialQuantities);
    }
  }, [cart]);

  const incrementProductInCart = async (productId: string) => {
    setCart(await incrementQuantity(paramId!, productId));
    incrementCount();
  };

  const decrementProductInCart = async (productId: string) => {
    setCart(await decrementQuantity(paramId!, productId));
    decrementCount();
  };

  const removeProductFromCart = async (productId: string) => {
    setCart(await removeItemFromCart(paramId!, productId));
    setCount(0);
  };

  let subtotal = cart
    ? cart.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    : 0;
  const subTotalConverted = currencyExchangeSpec(baseCurrency, subtotal, rates, currency);
  const subTotalDisplayed = subTotalConverted ? subTotalConverted.toFixed(2) : "N/A";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-[425px] px-6">
        <SheetHeader className="space-y-0 pb-4">
          <SheetTitle className="text-xl">Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-[calc(100vh-8rem)]">
          {cart?.products.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <ShoppingCart className="w-24 h-24 text-gray-300 mb-4" />
              <p className="text-xl font-medium mb-4">Your cart is empty</p>
              <Button
                className="w-full bg-[--complimentary-color-dark] hover:bg-[--complimentary-color-fade]"
                size="lg"
                onClick={() => {
                  onOpenChange(false);
                  setRefresh(false);
                  navigate(`/shop/${paramId}`);
                }}
              >
                Explore Our Products
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto -mx-6 px-6">
                {cart?.products.map((item) => {
                  const convertedPrice = currencyExchangeSpec(
                    baseCurrency,
                    item.product.price,
                    rates,
                    currency,
                  );
                  const displayedPrice = convertedPrice ? convertedPrice.toFixed(2) : "N/A";
                  return (
                    <div key={item.product._id} className="flex gap-4 py-4 border-b">
                      <img
                        src={item.product.picture}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="font-medium mt-1">
                          {displayedPrice} {currency}
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => decrementProductInCart(item.product._id)}
                            disabled={quantities[item.product._id] <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {quantities[item.product._id] || item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => incrementProductInCart(item.product._id)}
                            disabled={quantities[item.product._id] >= item.product.quantity}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="link"
                            className="ml-auto text-sm"
                            onClick={() => removeProductFromCart(item.product._id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    {subTotalDisplayed} {currency}{" "}
                  </span>
                </div>
                <Button
                  className="w-full bg-[--primary-color-dark] hover:bg-[--primary-color-fade]"
                  size="lg"
                  onClick={() => navigate(`/checkout/${paramId}`)}
                >
                  Check out
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
