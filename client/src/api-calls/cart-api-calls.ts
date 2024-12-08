import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";
import { PopulatedCart } from "@/features/home/types/home-page-types";

enum CartUpdates {
  EmptyCart = "emptyCart",
  IncrementQuantity = "incrementQuantity",
  DecrementQuantity = "decrementQuantity",
}

export async function createUserCart(userId: string) {
  const response = await axios.post(`${SERVICES_URLS.ORDER}/carts`, {
    user: userId,
  });
  return response.data;
}

export async function fetchUserCart(userId: string): Promise<PopulatedCart> {
  const response = await axios.get(`${SERVICES_URLS.ORDER}/carts`, {
    params: { user: userId },
  });
  return response.data as PopulatedCart;
}

export async function addItemToCart(user: string, productId: string): Promise<PopulatedCart> {
  const response = await axios.post(`${SERVICES_URLS.ORDER}/carts/add`, {
    user,
    productId,
  });
  return response.data as PopulatedCart;
}

export async function removeItemFromCart(
  userId: string,
  productId: string,
): Promise<PopulatedCart> {
  const response = await axios.delete(`${SERVICES_URLS.ORDER}/carts/remove`, {
    params: { user: userId, productId: productId },
  });
  return response.data as PopulatedCart;
}

export async function incrementQuantity(user: string, productId: string): Promise<PopulatedCart> {
  const response = await axios.patch(`${SERVICES_URLS.ORDER}/carts/`, null, {
    params: {
      user,
      productId,
      operation: CartUpdates.IncrementQuantity,
    },
  });
  return response.data as PopulatedCart;
}

export async function decrementQuantity(user: string, productId: string): Promise<PopulatedCart> {
  const response = await axios.patch(`${SERVICES_URLS.ORDER}/carts/`, null, {
    params: {
      user,
      productId,
      operation: CartUpdates.DecrementQuantity,
    },
  });
  return response.data as PopulatedCart;
}

export async function emptyCart(user: string) {
  const response = await axios.patch(`${SERVICES_URLS.ORDER}/carts`, null, {
    params: { user, operation: CartUpdates.EmptyCart },
  });
  return response.data;
}
