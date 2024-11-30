import type { IProduct, IWishlist, PopulatedWishlist } from "@/utils/types";
import { productAxiosInstance } from "@/utils/axios-instances";

export async function populateWishlist(wishlistItem: IWishlist) {
  const populatedProduct = await productAxiosInstance.get<IProduct>(
    `/products/${wishlistItem.product}`,
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
      return populateWishlist(wishlistItem);
    }),
  );
  return populatedWishlist;
}
