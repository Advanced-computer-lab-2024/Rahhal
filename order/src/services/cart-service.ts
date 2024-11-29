import type { ICart, CartItem } from "@/utils/types";
import Cart from "@/database/models/Cart";
import * as cartRepository from "@/database/repositories/cart-repository"

export async function getCart(userId: string) {
    return await cartRepository.getCart(userId);
}

export async function createCart(userId: string) {
    return await cartRepository.createCart(userId);
}

export async function deleteCart(userId: string) {
    return await cartRepository.deleteCart(userId);
}

export async function updateCart(userId: string, cartData: Partial<ICart>) {
    return await cartRepository.updateCart(userId, cartData);
}

