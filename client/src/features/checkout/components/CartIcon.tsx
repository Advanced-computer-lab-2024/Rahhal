import { ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { CartModal } from './CartModal'
import { CartExample } from "../utils/CartExample"

export function CartIcon() {
  const [isOpen, setIsOpen] = useState(false)
  

  const totalItems = CartExample.products.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCart className="h-6 w-6" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Button>
      <CartModal open={isOpen} onOpenChange={setIsOpen} />
    </>
  )
}
