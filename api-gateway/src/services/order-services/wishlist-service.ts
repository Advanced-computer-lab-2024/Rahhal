import { orderAxiosInstance } from "@/utils/axios-instances";
import type { IWishlist } from "@/utils/types";
import { populateWishlist, populateWishlists } from "@/utils/wishlist-populator";

export async function getWishlist(filter: Partial<IWishlist>) {
  try {
    const wishlists = await orderAxiosInstance.get("/wishlists", { params: filter });
    return populateWishlists(wishlists.data);
  } catch (error) {
    return new Error("Failed to fetch wishlists from order server\n" + error);
  }
}

export async function getWishlistById(id: string) {
  try {
    const wishlist = await orderAxiosInstance.get(`/wishlists/${id}`);
    return populateWishlist(wishlist.data);
  } catch (error) {
    return new Error("Failed to fetch wishlist from order server\n" + error);
  }
}

export async function createWishlist(body: string) {
  return orderAxiosInstance.post("/wishlists", body);
}

export async function updateWishlist(id: string, body: string) {
  return orderAxiosInstance.patch(`/wishlists/${id}`, body);
}

export async function deleteWishlist(id: string) {
  return orderAxiosInstance.delete(`/wishlists/${id}`);
}

export async function deleteWishlistItem(wishlistItem: Partial<IWishlist>) {
  return orderAxiosInstance.delete("/wishlists", { params: wishlistItem });
}
