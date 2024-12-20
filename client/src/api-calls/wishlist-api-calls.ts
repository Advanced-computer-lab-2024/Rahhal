import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";
import type { TPopulatedWishlist } from "@/features/home/types/home-page-types";

export async function fetchUserWishlist(userId: string): Promise<TPopulatedWishlist[]> {
  const response = await axios.get(SERVICES_URLS.ORDER + `/wishlists`, {
    params: {
      user: userId,
    },
  });
  return response.data as TPopulatedWishlist[];
}

export async function isProductWishlisted(userId: string, productId: string): Promise<boolean> {
  const response = await axios.get(SERVICES_URLS.ORDER + `/wishlists`, {
    params: {
      user: userId,
      product: productId,
    },
  });
  console.log("Wishlist response", response.data);
  return Array.isArray(response.data) && response.data.length > 0;
}

export async function addToWishlist(userId: string, productId: string) {
  const response = await axios.post(SERVICES_URLS.ORDER + `/wishlists`, {
    user: userId,
    product: productId,
  });
  return response.data;
}

export async function removeFromWishlist(userId: string, productId: string) {
  const response = await axios.delete(SERVICES_URLS.ORDER + `/wishlists`, {
    params: {
      user: userId,
      product: productId,
    },
  });
  return response.data;
}
