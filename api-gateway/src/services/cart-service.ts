import { orderAxiosInstance } from "@/utils/axios-instances";
import { populateCart } from "@/utils/cart-populator";
import type { ICart } from "@/utils/types";

export async function getCart(userId: string) {
  try {
    const cart = await orderAxiosInstance.get("/carts?userId=" + userId);
    return populateCart(cart.data);
  }
  catch (error) {
    return new Error("Failed to fetch cart from order server\n" + error);
  }
}

export async function createCart(body: string) {
  return orderAxiosInstance.post("/carts", body);
}

export async function updateCart(userId: string, updatedCart: Partial<ICart>) {
  try {
    const updatedCartResponse = await orderAxiosInstance.patch(`/carts?userId=${userId}`, updatedCart);
    const populatedCart = await populateCart(updatedCartResponse.data);
    
    return populatedCart;
  } catch (error) {
    throw new Error("Failed to update the cart\n" + error);
  }
}
export async function deleteCart(id: string) {
  return orderAxiosInstance.delete(`/carts?userId=${id}`);
}
