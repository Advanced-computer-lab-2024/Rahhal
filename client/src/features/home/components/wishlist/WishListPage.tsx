import { Skeleton } from "@/components/ui/skeleton";
import { fetchUserWishlist } from "@/api-calls/wishlist-api-calls";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../product-card/ProductCard";
import { IRating } from "../../types/home-page-types";
import NoWishlist from "@/assets/NoWishListIcon.png";
import useUserStore from "@/stores/user-state-store";

function BookmarksPage() {
  const { id } = useUserStore();

  const {
    data: wishlistData,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["userOrders", id],
    queryFn: () => fetchUserWishlist(id as string),
    enabled: !!id,
  });

  const getAverageRating = (ratings?: IRating[]) => {
    if (!ratings || ratings.length === 0) return 0;
    return (
      ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length
    );
  };
  return (
    <>
      {/* Header */}
      <div className="flex justify-center mt-4 sm:mt-6 md:mt-8 mx-4 sm:mx-6 md:mx-[8%] lg:mx-[10%]">
        <p className="text-xl sm:text-2xl md:text-[1.8rem] font-normal text-black text-center">
          My Wishlist
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6 md:mt-8 mx-4 sm:mx-6 md:mx-[8%] lg:mx-[10%] justify-items-center">
        {(isLoading || !wishlistData) && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        )}

        {wishlistData?.length === 0 && isSuccess && (
          <div className="flex flex-col justify-center items-center h-[50vh] w-full gap-4 sm:gap-6 md:gap-8 col-span-full">
            <img
              src={NoWishlist}
              className="w-32 sm:w-40 md:w-[10.5rem] max-w-xs h-auto mb-4"
              alt="No Wishlist Items"
            />
            <p className="text-lg sm:text-xl md:text-[1.5rem] font-medium text-black text-center px-4">
              No items in your wishlist
            </p>
          </div>
        )}

        {/* Wishlist */}
        {!isLoading &&
          wishlistData &&
          wishlistData.length > 0 &&
          isSuccess &&
          wishlistData.map((item) => {
            return (
              <ProductCard
                id={item.product?._id}
                name={item.product?.name}
                price={item.product?.price}
                imageUrl={item.product?.picture}
                rating={getAverageRating(item.product?.ratings)}
                sellername={item.product?.sellerName}
              />
            );
          })}
      </div>
    </>
  );
}

export default BookmarksPage;
