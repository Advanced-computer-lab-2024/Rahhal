import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { CartModal } from "./CartModal";
import { useQuery } from "@tanstack/react-query";
import { fetchUserCart } from "@/api-calls/cart-api-calls";
import { PopulatedCart } from "@/features/home/types/home-page-types";
import useCartStore from "@/stores/nav-bar-icon-stores/cart-count-store";
import useProductRefreshStore from "@/stores/refresh-product-store";
import useUserStore from "@/stores/user-state-store";

export function CartIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const { count, setCount } = useCartStore();

  const { id: paramId } = useUserStore();
  const { setRefresh } = useProductRefreshStore();

  const { data: cartData, isSuccess } = useQuery({
    queryKey: ["cart", "products"],
    queryFn: () => fetchUserCart(paramId as string),
    enabled: !!paramId,
    select: (data) => data as PopulatedCart,
  });

  useEffect(() => {
    if (isSuccess && cartData) {
      setCount(cartData.products.reduce((sum, item) => sum + item.quantity, 0));
    }
  }, [cartData]);

  const handleIconClick = (state: boolean) => {
    setIsOpen(state);
    setRefresh(state);
  };
  return (
    <>
      <Button
        variant="clean"
        size="icon"
        className="relative"
        onClick={() => {
          setIsOpen(true);
          setRefresh(true);
        }}
      >
        <ShoppingCart className="h-6 w-6" />
        {count > 0 && (
          <span className="absolute -top-0 -right-0 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-lg">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </Button>
      <CartModal open={isOpen} onOpenChange={handleIconClick} />
    </>
  );
}
