import type { IWishlist } from "@/utils/types";
import * as wishlistRepository from "@/database/repositories/wishlist-repository";

export async function getWishlist(filter: Partial<IWishlist>) {
  return wishlistRepository.getWishlist(filter);
}

export async function getWishlistById(id: string) {
  return wishlistRepository.getWishlistById(id);
}

export async function createWishlist(wishlistData: Partial<IWishlist>) {
  return wishlistRepository.createWishlist(wishlistData);
}

export async function updateWishlist(id: string, wishlistData: Partial<IWishlist>) {
  return wishlistRepository.updateWishlist(id, wishlistData);
}

export async function deleteWishlist(id: string) {
  return wishlistRepository.deleteWishlist(id);
}

export async function deleteWishlistItem(wishlistData: Partial<IWishlist>) {
  return wishlistRepository.deleteWishlistItem(wishlistData);
}
