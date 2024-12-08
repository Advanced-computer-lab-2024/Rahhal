import { PopulatedCart, TOrder } from "@/features/home/types/home-page-types";
import { createOrder } from "@/api-calls/order-api-calls";

export async function createOrderInstance(
  cart: PopulatedCart,
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
    userId: cart.user,
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
  return (await createOrder(order)) as TOrder;
}

export function constructReceiptData(
  order: TOrder,
  deliveryFee: number,
  currency: string,
  convertor: (originalPrice: number) => number,
): string {
  let receipt = `\nPAYMENT RECEIPT FOR ORDER ${order._id}\n`;
  receipt += "-----------------\n\n";
  receipt += "ITEM : PRICE\n";

  // Add items
  order.items.forEach((item) => {
    const convertedPrice = convertor(item.price * item.quantity);
    receipt += `${item.name} (x${item.quantity}):  ${currency} ${convertedPrice.toFixed(2)}\n`;
  });

  receipt += "-----------------\n";
  receipt += `Delivery: ${currency} ${convertor(deliveryFee).toFixed(2)}\n`;

  if (order.discountAmount && order.discountAmount > 0) {
    receipt += `Discount: -  ${currency} ${convertor(order.discountAmount).toFixed(2)}\n`;
  }

  const finalTotalPrice = order.totalPrice + deliveryFee - (order.discountAmount || 0);

  receipt += `Total Price:  ${currency} ${convertor(finalTotalPrice).toFixed(2)}\n`;
  receipt += `Transaction deducted amount: EGP ${finalTotalPrice}`;

  return receipt;
}
