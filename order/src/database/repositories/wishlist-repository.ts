import Wishlist from "@/database/models/Wishlist";
import type { IWishlist } from "@/utils/types";

export async function getWishlist(filter: Partial<IWishlist>) {
  return await Wishlist.find(filter);
}

export async function getWishlistById(id: string) {
  return await Wishlist.findById(id);
}

export async function createWishlist(wishlistData: IWishlist) {
  const newWishlist = new Wishlist(wishlistData);
  return await newWishlist.save();
}

export async function updateWishlist(id: string, wishlistData: Partial<IWishlist>) {
  return await Wishlist.findByIdAndUpdate(id, wishlistData, { new: true, runValidators: true });
}

export async function deleteWishlist(id: string) {
  return await Wishlist.findByIdAndDelete(id);
}
