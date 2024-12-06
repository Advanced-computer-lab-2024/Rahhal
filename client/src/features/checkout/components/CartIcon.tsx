import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CartModal } from "./CartModal";
import { CartExample } from "../utils/CartExample";

export function CartIcon() {
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = CartExample.products.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Button
        variant="clean"
        size="icon"
        className="relative group" // Add the "group" class here
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCart className="h-6 w-6 transition-transform duration-200 ease-in-out group-hover:scale-110" />
        {totalItems > 0 && (
          <span className="absolute -top-0.5 -right-0.5 h-5 w-5 bg-red-500 rounded-full text-xs text-primary-foreground flex items-center justify-center transition-transform duration-200 ease-in-out group-hover:scale-110">
            {totalItems}
          </span>
        )}
      </Button>
      <CartModal open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
