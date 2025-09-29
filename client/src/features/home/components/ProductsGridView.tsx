import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import FilterSortSearchHeader from "@/features/home/components/FilterSortSearchHeader";
import FilterSideBar from "@/features/home/components/filter-sidebar/FilterSideBar";
import { FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchAvailableProducts } from "@/api-calls/products-api-calls";
import { Product, IRating, SortOption } from "../types/home-page-types";
import MinMaxRangeSlider from "@/features/home/components/filter-sidebar/MinMaxRangeSlider";
import FilterStarRating from "@/features/home/components/filter-sidebar/FilterStarRating";
import { getPriceValue } from "../utils/price-calculator";
import ProductCard from "@/features/home/components/product-card/ProductCard";
import FilterButton from "./FilterButton";
import SortButton from "./SortButton";

// Fetching logic from the database
const ProductGridView = () => {
  const [search, setSearch] = useState<string>("");
  const [skeleton, setSkeleton] = useState<boolean>(true);
  const [combined, setCombined] = useState<Product[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([
    0, 1000,
  ]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [sortOption, setSortOption] = useState<SortOption | null>(null);

  // useQueries
  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["product", "products"],
    queryFn: fetchAvailableProducts,
    select: (data) => data as Product[],
  });

  useEffect(() => {
    if (!isLoadingProducts) {
      setSkeleton(false);
    }
  }, [!isLoadingProducts]);

  const handleSort = (sortOption: SortOption) => {
    setSortOption(sortOption);
  };

  const resetFilters = () => {
    if (combined.length > 0) {
      const maxPrice = Math.max(
        ...combined.map((item) => getPriceValue(item.price))
      );
      setSelectedPriceRange([0, maxPrice]); // Dynamically set the max price
    } else {
      setSelectedPriceRange([0, 10000]); // Fallback if combined is empty
    }
    setSelectedRatings([]);
  };

  useEffect(() => {
    // Combine all data into one array initially
    if (!isLoadingProducts && products) setCombined([...products]);
  }, [isLoadingProducts, products]);

  useEffect(() => {
    if (combined.length > 0) {
      const maxPrice = Math.max(
        ...combined.map((item) => getPriceValue(item.price))
      );
      setSelectedPriceRange([0, maxPrice]);
    }
  }, [combined]);

  let combinedSideBarFilters = [
    {
      title: "Reset Filters",
      content: (
        <Button
          variant="outline"
          size="sm"
          onClick={resetFilters}
          className="flex items-center justify-center w-full bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded-lg transition-all duration-300 shadow-sm"
        >
          <FilterX className="w-5 h-5 text-red-500" />
          <span className="ml-2 font-medium text-gray-700">Reset Filters</span>
        </Button>
      ),
    },
    {
      title: "Price Range",
      content: (
        <MinMaxRangeSlider
          values={selectedPriceRange}
          onValueChange={setSelectedPriceRange}
        />
      ),
    },
    {
      title: "Rating",
      content: (
        <FilterStarRating
          values={selectedRatings}
          onValueChange={setSelectedRatings}
        />
      ),
    },
  ];

  const getAverageRating = (ratings?: IRating[]) => {
    if (!ratings || ratings.length === 0) return 0;
    return (
      ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length
    );
  };

  //Searching first, then result is filter  then result is sorted
  const filteredProducts = combined
    .filter((item) => {
      // Filter based on search
      if (search) {
        return item.name.toLowerCase().includes(search.toLowerCase());
      }
      return true;
    })
    .filter((item) => {
      const itemPrice = getPriceValue(item.price);
      const itemRating = getAverageRating(item.ratings);
      const matchPrice =
        (selectedPriceRange[0] != -1 &&
          itemPrice >= selectedPriceRange[0] &&
          itemPrice <= selectedPriceRange[1]) ||
        (selectedPriceRange[0] === -1 && selectedPriceRange[1] === -1);
      const matchRating =
        selectedRatings.length === 0 ||
        selectedRatings.some(
          (rating) => itemRating >= rating && itemRating < rating + 1
        );

      return matchPrice && matchRating;
    });

  const sortedProducts = filteredProducts.sort((a, b) => {
    const aRatings = getAverageRating(a.ratings ?? []);
    const bRatings = getAverageRating(b.ratings ?? []);
    const aPrice = getPriceValue(a.price);
    const bPrice = getPriceValue(b.price);

    const sort =
      sortOption === "price-high-low"
        ? bPrice - aPrice
        : sortOption === "price-low-high"
          ? aPrice - bPrice
          : sortOption === "rating-low-high"
            ? aRatings - bRatings
            : bRatings - aRatings;
    return sort;
  });

  return (
    <div className="w-full overflow-hidden">
      <FilterSortSearchHeader
        searchPlaceHolder={"Search for products.. "}
        setSearch={setSearch}
        handleSort={handleSort}
      />
      <hr className="border-t bg-[var(--gray-scale)]" />

      {/* Desktop Layout - Large screens only */}
      <div className="hidden xl:flex w-full">
        <FilterSideBar sideBarItems={combinedSideBarFilters} />
        <div className="flex-1 overflow-y-auto h-[70vh] xl:h-[80vh] 2xl:h-[87vh]">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-2xl xl:text-3xl font-semibold">Products</h1>
            <div className="flex items-center space-x-4">
              <FilterButton />
              <SortButton onSort={handleSort} />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center w-full">
            <div className="grid grid-cols-4  gap-x-6 gap-y-16 p-4 w-full max-w-7xl justify-items-center">
              {skeleton && (
                <div className="space-y-2 col-span-full">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              )}

              {!skeleton &&
                sortedProducts?.map((products: Product) => (
                  <ProductCard
                    key={products._id}
                    id={products._id}
                    imageUrl={products.picture}
                    name={products.name}
                    price={products.price}
                    sellername={products.sellerName}
                    rating={getAverageRating(products.ratings)}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tablet Layout - Medium to Large screens */}
      <div className="hidden lg:flex xl:hidden w-full">
        <FilterSideBar sideBarItems={combinedSideBarFilters} />
        <div className="flex-1 overflow-y-auto h-[70vh] lg:h-[80vh]">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl lg:text-2xl font-semibold">Products</h1>
            <div className="flex items-center space-x-2">
              <FilterButton />
              <SortButton onSort={handleSort} />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center w-full p-4 pb-20">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16 w-full max-w-5xl justify-items-center">
              {skeleton && (
                <div className="space-y-2 col-span-full">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              )}

              {!skeleton &&
                sortedProducts?.map((products: Product) => (
                  <ProductCard
                    key={products._id}
                    id={products._id}
                    imageUrl={products.picture}
                    name={products.name}
                    price={products.price}
                    sellername={products.sellerName}
                    rating={getAverageRating(products.ratings)}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Mobile Filter/Sort Bar */}
        <div className="flex items-center justify-between p-4 bg-white border-b">
          <h1 className="text-lg font-semibold">Products</h1>
          <div className="flex items-center space-x-2">
            <FilterButton />
            <SortButton onSort={handleSort} />
          </div>
        </div>

        {/* Mobile Sidebar */}
        <FilterSideBar sideBarItems={combinedSideBarFilters} />

        {/* Mobile Content */}
        <div className="flex flex-col items-center justify-center w-full p-4 pb-20">
          <div className="grid grid-cols-1 gap-x-6 gap-y-16 w-full max-w-4xl justify-items-center">
            {skeleton && (
              <div className="space-y-2 col-span-full">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            )}

            {!skeleton &&
              sortedProducts?.map((products: Product) => (
                <ProductCard
                  key={products._id}
                  id={products._id}
                  imageUrl={products.picture}
                  name={products.name}
                  price={products.price}
                  sellername={products.sellerName}
                  rating={getAverageRating(products.ratings)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGridView;
