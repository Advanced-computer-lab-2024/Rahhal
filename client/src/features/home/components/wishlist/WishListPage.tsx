import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchUserWishlist } from "@/api-calls/wishlist-api-calls";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../product-card/ProductCard";
import { IRating } from "../../types/home-page-types";

function BookmarksPage() {
  const { id } = useParams();

  const {
    data: wishlistData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userOrders", id],
    queryFn: () => fetchUserWishlist(id as string),
    enabled: !!id,
  });

  const getAverageRating = (ratings?: IRating[]) => {
    if (!ratings || ratings.length === 0) return 0;
    return ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length;
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-center mt-[2%] mx-[10%]">
        <p className="text-[1.8rem] font-normal text-black">My Wishlist</p>
      </div>

      <div className="flex mt-[2%] mx-[10%] gap-2">
        {(isLoading || !wishlistData) && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        )}

        {/* Wishlist */}
        {!isLoading &&
          wishlistData &&
          wishlistData.map((item) => {
            return (
              <ProductCard
                id={item.product._id}
                name={item.product.name}
                price={item.product.price}
                imageUrl={item.product.picture}
                rating={getAverageRating(item.product.ratings)}
                seller={item.product.seller}
              />
            );
          })}
      </div>
    </>
  );
}

export default BookmarksPage;
