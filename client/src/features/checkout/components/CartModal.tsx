import { useState } from "react"
import { Minus, Plus } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { CartExample } from "../utils/CartExample"
import { useNavigate, useParams } from "react-router-dom"


interface CartModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartModal({ open, onOpenChange }: CartModalProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const navigate = useNavigate();
  const { id: paramId } = useParams<{ id?: string }>();

  // Initialize quantities from CartExample
  useState(() => {
    const initialQuantities: Record<string, number> = {}
    CartExample.products.forEach(item => {
      initialQuantities[item.product._id] = item.quantity
    })
    setQuantities(initialQuantities)
  })

  const updateQuantity = (productId: string, delta: number) => {
    setQuantities(prev => {
      const product = CartExample.products.find(p => p.product._id === productId)
      if (!product) return prev

      const newQuantity = (prev[productId] || 0) + delta
      if (newQuantity < 0 || newQuantity > product.product.quantity) return prev

      return { ...prev, [productId]: newQuantity }
    })
  }

  const subtotal = CartExample.products.reduce((sum, item) => {
    return sum + (item.product.price * (quantities[item.product._id] || item.quantity))
  }, 0)

  return (
    <Sheet open={open} onOpenChange={onOpenChange} >
      <SheetContent className="w-full sm:max-w-[425px] px-6">
        <SheetHeader className="space-y-0 pb-4">
          <SheetTitle className="text-xl">Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-[calc(100vh-8rem)]">

          <div className="flex-1 overflow-auto -mx-6 px-6">
            {CartExample.products.map((item) => (
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
                  <p className="font-medium mt-1"> {item.product.price.toFixed(2)} EGP</p>

                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product._id, -1)}
                      disabled={quantities[item.product._id] <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{quantities[item.product._id] || item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product._id, 1)}
                      disabled={quantities[item.product._id] >= item.product.quantity}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="link"
                      className="ml-auto text-sm"
                      onClick={() => {
                        setQuantities(prev => {
                          const newQuantities = { ...prev }
                          delete newQuantities[item.product._id]
                          return newQuantities
                        })
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold"> {subtotal.toFixed(2)} EGP</span>
            </div>
            <Button className="w-full" size="lg" onClick={() => navigate(`/checkout/${paramId}`)}>
              Check out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

