import { TOrder } from "@/features/home/types/home-page-types";
import { createOrder } from "@/api-calls/order-api-calls";

export async function createOrderInstance(
  cart: Cart,
  paymentMethod: string,
  discountAmount: number,
  promoCode: string,
  selectedAddress: string,
) {
  const totalPriceWithoutTax = cart.products.reduce(
    (acc, product) => acc + product.product.price * product.quantity,
    0,
  );
  const order: TOrder = {
    userId: cart.userId,
    orderStatus: "processing",
    paymentMethod: paymentMethod,
    items: cart.products.map((product) => ({
      name: product.product.name,
      price: product.product.price,
      quantity: product.quantity,
      seller: product.product.seller,
      picture: product.product.picture,
      productId: product.product._id,
    })),
    totalPrice: totalPriceWithoutTax + 0.12 * totalPriceWithoutTax,
    totalQuantity: cart.products.reduce((acc, product) => acc + product.quantity, 0),
    discountAmount: discountAmount,
    promoCode: promoCode,
    shippingAddress: selectedAddress,
    billingAddress: selectedAddress,
  };
  return await createOrder(order);
}
