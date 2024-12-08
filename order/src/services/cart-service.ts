import { CartUpdates } from "@/utils/types";
import type { CartItem } from "@/utils/types";
import * as cartRepository from "@/database/repositories/cart-repository";
import { EMPTYPRODUCT, MIN_QUANTITY } from "@/utils/constants";

export async function getCart(user: string) {
  return await cartRepository.getCart(user);
}

export async function createCart(user: string) {
  return await cartRepository.createCart(user);
}

export async function deleteCart(user: string) {
  return await cartRepository.deleteCart(user);
}

export async function updateCart(user: string, operation: CartUpdates, productId: string) {
  const cart = await getCart(user as string);
  if (!cart) {
    throw new Error("Cart not found");
  }

  let updatedProducts = cart.products;
  switch (operation) {
    case CartUpdates.EmptyCart:
      updatedProducts = [];
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

  return await cartRepository.updateCart(user, updatedProducts);
}

export async function addItemToCart(user: string, productId: string) {
  const cart = await getCart(user as string);
  if (!cart) {
    throw new Error("Cart not found");
  }

  const updatedProducts = cart.products;
  updatedProducts.push({ productId, quantity: MIN_QUANTITY });

  return await cartRepository.updateCart(user, updatedProducts);
}

export async function removeItemFromCart(user: string, productId: string) {
  const cart = await getCart(user as string);
  if (!cart) {
    throw new Error("Cart not found");
  }

  const updatedProducts = cart.products.filter((item: CartItem) => item.productId !== productId);

  return await cartRepository.updateCart(user, updatedProducts);
}
