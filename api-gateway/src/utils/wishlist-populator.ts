import type { IProduct, IWishlist, PopulatedWishlist } from "@/utils/types";
import { entertainmentAxiosInstance } from "@/utils/axios-instances";

export async function populateWishlist(wishlistItem: IWishlist) {
  const populatedProduct = await entertainmentAxiosInstance.get<IProduct>(
    `/wishlists/${wishlistItem.product}`,
  );
  return {
    _id: wishlistItem._id,
    user: wishlistItem.user,
    product: populatedProduct.data,
  };
}

export async function populateWishlists(wishlist: IWishlist[]): Promise<PopulatedWishlist[]> {
  const populatedWishlist = await Promise.all(
    wishlist.map(async (wishlistItem) => {
      return await populateWishlist(wishlistItem);
    }),
  );
  return populatedWishlist;
}
