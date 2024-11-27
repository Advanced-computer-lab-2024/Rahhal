import { CartExample } from "../utils/CartExample";
import { TOrder } from "@/features/home/types/home-page-types";
import { createOrder } from "@/api-calls/order-api-calls";

export async  function handlePayment(
  paymentMethod: string,
  discountAmount: number,
  promoCode: string,
  selectedAddress: string,
) {
  const order: TOrder = {
    userId: CartExample.userId,
    orderStatus: 'processing',
    paymentMethod: paymentMethod,
    items: CartExample.products.map((product) => ({
      name: product.product.name,
      price: product.product.price,
      quantity: product.quantity,
      seller: product.product.seller,
      picture: product.product.picture,
      productId: product.product._id
    })),
    totalPrice: CartExample.products.reduce((acc, product) => acc + product.product.price * product.quantity, 0),
    totalQuantity: CartExample.products.reduce((acc, product) => acc + product.quantity, 0),
    discountAmount: discountAmount,
    promoCode: promoCode,
    shippingAddress: selectedAddress,
    billingAddress: selectedAddress,
  };
  return await createOrder(order);
}