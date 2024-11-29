import Cart from "../models/Cart";
import { ICart } from "../../utils/types";

export async function getCart(userId: string) {
    return await Cart.findById(userId);
}

export async function createCart(userId: string) {
    const newCart = new Cart({ user: userId, products: [] });
    return await newCart.save();
}

export async function deleteCart(userId: string) {
    return await Cart.findByIdAndDelete(userId);
}

export async function updateCart(userId: string, cartData: Partial<ICart>) {
    return await Cart.findByIdAndUpdate(userId, cartData, { new: true });
}

