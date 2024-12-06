import { orderAxiosInstance } from "@/utils/axios-instances";
import { populateCart } from "@/utils/cart-populator";
import type { CartUpdates } from "@/utils/types";

export async function getCart(user: string) {
  try {
    const cart = await orderAxiosInstance.get("/carts", {
      params: { user },
    });
    return await populateCart(cart.data);
  } catch (error) {
    return new Error("Failed to fetch cart from order server\n" + error);
  }
}

export async function createCart(body: string) {
  return orderAxiosInstance.post("/carts", body);
}

export async function updateCart(cart: {
  user: string;
  operation: CartUpdates;
  productId: string;
}) {
  try {
    const updatedCartResponse = await orderAxiosInstance.patch("/carts", null, {
      params: cart,
    });
    return await populateCart(updatedCartResponse.data);
  } catch (error) {
    throw new Error("Failed to update the cart\n" + error);
  }
}

export async function addItemToCart(body: string) {
  try {
    const populatedCart = await orderAxiosInstance.post("/carts/add", body);
    return await populateCart(populatedCart.data);
  } catch (error) {
    throw new Error("Failed to add item to cart\n" + error);
  }
}

export async function removeItemFromCart(user: string, productId: string) {
  try {
    const populatedCart = await orderAxiosInstance.delete("/carts/remove", {
      params: { user: user, productId: productId },
    });
    return await populateCart(populatedCart.data);
  } catch (error) {
    throw new Error("Failed to remove item from cart\n" + error);
  }
}

export async function deleteCart(user: string) {
  return orderAxiosInstance.delete("/carts", {
    params: { user },
  });
}
