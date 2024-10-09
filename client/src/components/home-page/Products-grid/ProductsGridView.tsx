import ProductGridStyle from "./ProductsGridView.module.css"
import ProductCard from "@/components/product-card/ProductCard";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import FilterSortSearchHeader from "@/components/home-page/main-content-div/FilterSortSearchHeader";
import FilterSideBar from "@/components/filter-sidebar/FilterSideBar";
import type { Option } from "@/components/ui/multiple-selector";
import { FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchProducts } from "@/api-calls/products-api-calls";
import {
  Product,
  IRating,
  SortOption,
} from "../home-page-types";
import  Hoodie  from "@/assets/farmhouse-main.jpeg"
import MinMaxRangeSlider from "@/components/filter-sidebar/MinMaxRangeSlider";
import FilterStarRating from "@/components/filter-sidebar/FilterStarRating";

export const getPriceValue = (
  price:
    | number
    | { min: number; max: number }
    | { foreigner: number; native: number; student: number }
    | { type: string; price: number }[],
) => {
  if (price === undefined || price === null) {
    return 0; // Return a default value (0) when price is not defined
  }
  if (typeof price === "number") return price;
  if ("min" in price && "max" in price) return price.min;
  if ("foreigner" in price && "native" in price && "student" in price)
    return Math.min(price.foreigner, price.native, price.student);
  if (Array.isArray(price)) {
    return price.length > 0 ? Math.min(...price.map((p) => p.price)) : 0;
  }

  return 0;
};

// Fetching logic from the database
const ProductGridView = () => {
  const [search, setSearch] = useState<string>("");
  const [skeleton, setSkeleton] = useState<boolean>(true);
  const [finishedLoading, setFinishedLoading] = useState<boolean>(false);
  const [combined, setCombined] = useState<(Product)[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([0, 1000]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [sortOption, setSortOption] = useState<SortOption | null>(null);

  // useQueries
  const {
    data: products,
    isLoading: isLoadingProducts,
    error: errorProducts,
  } = useQuery({ queryKey: ["product", "products"], queryFn: fetchProducts });

  const navigate = useNavigate();

  const handleCardClick = (item: Product) => {
    // Navigate to detail page, pass the item data via state
    navigate(`/details/${item._id}`, { state: { item } });
  };

  //fetching data
  useEffect(() => {
    setFinishedLoading(
      !isLoadingProducts
    );
  }, 
  [isLoadingProducts]);

  useEffect(() => {
    if (finishedLoading) {
      setSkeleton(false);
    }
  }, [finishedLoading]);

  const handleSort = (sortOption: SortOption) => {
    setSortOption(sortOption);
  };

  const resetFilters = () => {
    setSelectedPriceRange([0, 1000]);
    setSelectedRatings([]);
  };

  useEffect(() => {
    // Combine all data into one array initially
    if (finishedLoading) setCombined([...products]);
  }, [finishedLoading, products]);


  let combinedSideBarFilters = [
    {
      title: "Reset Filters",
      content: (
        <Button variant="outline" size="sm" onClick={resetFilters}>
          <FilterX className="w-4 h-4" />
          <span className="ml-2">Reset Filters</span>
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
        <FilterStarRating values={selectedRatings} onValueChange={setSelectedRatings} />
      ),
    }
  ];

  const getAverageRating = (ratings?: IRating[]) => {
    if (!ratings || ratings.length === 0) return 0;
    return ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length;
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
      selectedRatings.some((rating) => itemRating >= rating && itemRating < rating + 1);
    
    return matchPrice && matchRating ;
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
    <div className={ProductGridStyle["product-grid-view"]}>
      <FilterSortSearchHeader
        finishedLoading={finishedLoading}
        setSearch={setSearch}
        searchParts={[]}
        searchPartsValues={[]}
        searchPartsHandlers={[]}
        handleSort={handleSort}
      >

      </FilterSortSearchHeader>
      <hr className="border-t border-gray-600 " />
      <div className="flex ">
        <FilterSideBar sideBarItems={combinedSideBarFilters} />
        <div className={ProductGridStyle["scrollable"]}>
          <div className={ProductGridStyle["product-grid-view__header"]}>
            <h1>Product</h1>
          </div>

          <div className={ProductGridStyle["product-grid-view__card-row"]}>
            {skeleton && (
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            )}

            {!skeleton &&
              filteredProducts.map((product: Product) => (
                <ProductCard
                  key={product._id}
                  picture={Hoodie}
                  rating={getAverageRating(product.ratings)}
                  title={product.name}
                  price={product.price}
                  seller={product.seller}
                  onClick={() => handleCardClick(product)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGridView;
