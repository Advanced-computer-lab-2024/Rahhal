import Cart from "../models/Cart";
import type { CartItem } from "../../utils/types";

export async function getCart(userId: string) {
  return await Cart.findOne({ user: userId });
}

export async function createCart(userId: string) {
  const newCart = new Cart({ user: userId, products: [] });
  return await newCart.save();
}

export async function deleteCart(userId: string) {
  return await Cart.findOneAndDelete({ user: userId });
}

export async function updateCart(userId: string, cartData: CartItem[]) {
  return await Cart.findOneAndUpdate(
    { user: userId },
    { user: userId, products: cartData },
    { new: true, runValidators: true },
  );
}
