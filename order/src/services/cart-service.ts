import { CartUpdates } from "@/utils/types";
import type { CartItem } from "@/utils/types";
import * as cartRepository from "@/database/repositories/cart-repository";
import { EMPTYPRODUCT, MIN_QUANTITY } from "@/utils/constants";

export async function getCart(userId: string) {
  return await cartRepository.getCart(userId);
}

export async function createCart(userId: string) {
  return await cartRepository.createCart(userId);
}

export async function deleteCart(userId: string) {
  return await cartRepository.deleteCart(userId);
}

export async function updateCart(userId: string, operation: CartUpdates, productId: string) {
  const cart = await getCart(userId as string);
  if (!cart) {
    throw new Error("Cart not found");
  }

  let updatedProducts = cart.products;
  switch (operation) {
    case CartUpdates.EmptyCart:
      updatedProducts = [];
      break;

    case CartUpdates.RemoveProduct:
      updatedProducts = updatedProducts.filter((item: CartItem) => item.productId !== productId);
      break;

    case CartUpdates.IncrementQuantity:
      updatedProducts = updatedProducts.map((item: CartItem) => {
        if (item.productId === productId) {
          return { productId: item.productId, quantity: item.quantity + MIN_QUANTITY };
        }
        return item;
      });

      if (!updatedProducts.some((item: CartItem) => item.productId === productId)) {
        updatedProducts.push({ productId, quantity: MIN_QUANTITY });
      }
      break;

    case CartUpdates.DecrementQuantity:
      updatedProducts = updatedProducts
        .map((item: CartItem) => {
          if (item.productId === productId) {
            const newQuantity = item.quantity - MIN_QUANTITY;
            return newQuantity > EMPTYPRODUCT
              ? { productId: item.productId, quantity: newQuantity }
              : null;
          }
          return item;
        })
        .filter((item) => item !== null);
      break;
  }

  return await cartRepository.updateCart(userId, updatedProducts);
}
