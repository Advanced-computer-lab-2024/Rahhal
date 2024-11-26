import type { IWishlist, PopulatedWishlist } from "@/utils/types";
import { entertainmentAxiosInstance } from "@/utils/axios-instances";

export async function populateWishlist(wishlist: IWishlist[]): Promise<PopulatedWishlist[]> {
  const populatedWishlist = await Promise.all(
    wishlist.map(async (item) => {
      const populatedProduct = await entertainmentAxiosInstance.get(`/wishlists/${item.product}`);
      return {
        user: item.user,
        ...populatedProduct.data,
      };
    }),
  );
  return populatedWishlist;
}
