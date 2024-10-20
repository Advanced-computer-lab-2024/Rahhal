import GeneralGridStyle from "../styles/GeneralGridView.module.css";
import EntertainmentCard from "@/features/home/components/EntertainmentCard";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import FilterSortSearchHeader from "./FilterSortSearchHeader";
import FilterSideBar from "@/features/home/components/filter-sidebar/FilterSideBar";
import HeaderIcons from "./header/HeaderIcons";
import type { Option } from "@/components/ui/multiple-selector";
import { ItinerariesFilter } from "@/features/home/utils/filter-lists/itineraries-filter";
import { CommonFilter } from "@/features/home/utils/filter-lists/common-filter";
import { HistoricalPlacesFilter } from "@/features/home/utils/filter-lists/historical-places-filter";
import { DateRange } from "react-day-picker";
import { FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchActivities } from "@/api-calls/activities-api-calls";
import { fetchCategories } from "@/api-calls/categories-api-calls";
import { fetchPreferenceTags } from "@/api-calls/preference-tags-api-calls";
import { fetchHistoricalPlaces } from "@/api-calls/historical-places-api-calls";
import { fetchHistoricalTags } from "@/api-calls/historical-tags-api-calls";
import { fetchItineraries } from "@/api-calls/itineraries-api-calls";
import ski from "@/assets/ski egypt.jpg";
import {
  Activity,
  Category,
  HistoricalTag,
  HistoricalPlace,
  IRating,
  Itinerary,
  PreferenceTag,
  SortOption,
  Filter,
} from "../types/home-page-types";
import { isWithinInterval } from "date-fns";

export const getPriceValue = (
  price:
    | number
    | { min: number; max: number }
    | { type: string; price: number }[]
    | Record<string, number>,
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

  return Object.values(price).length > 0 ? Math.min(...Object.values(price)) : 0;
};

// Fetching logic from the database
const GeneralGridView = () => {
  const [activeFilter, setActiveFilter] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");
  const [combined, setCombined] = useState<(Itinerary | Activity | HistoricalPlace)[]>([]);
  const [searchPartsValues, setSearchPartsValues] = useState<string[][]>([[], []]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string[]>([]);
  const [skeleton, setSkeleton] = useState<boolean>(true);
  const [finishedLoading, setFinishedLoading] = useState<boolean>(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([0, 10000]);
  const [selectedDates, setSelectedDates] = useState<DateRange>({ from: undefined, to: undefined });
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<Option[]>([]);
  const [selectedHistoricalTags, setSelectedHistoricalTags] = useState<Option[]>([]);
  const [sortOption, setSortOption] = useState<SortOption | null>(null);

  // useQueries
  const {
    data: activities,
    isLoading: isLoadingActivities,
    error: errorActivities,
  } = useQuery({ queryKey: ["entertainment", "activities"], queryFn: fetchActivities });
  const {
    data: itineraries,
    isLoading: isLoadingItineraries,
    error: errorItenaries,
  } = useQuery({ queryKey: ["entertainment", "itineraries"], queryFn: fetchItineraries });
  const {
    data: historicalPlaces,
    isLoading: isHistoricalPlaces,
    error: errorHistorical,
  } = useQuery({ queryKey: ["entertainment", "historicalPlaces"], queryFn: fetchHistoricalPlaces });
  const {
    data: preferenceTags,
    isLoading: isPreferenceTags,
    error: errorPreferenceTags,
  } = useQuery({ queryKey: ["entertainment", "preferenceTags"], queryFn: fetchPreferenceTags });
  const {
    data: historicalTags,
    isLoading: isHistoricalTags,
    error: errorHistoricalTags,
  } = useQuery({ queryKey: ["entertainment", "historicalTags"], queryFn: fetchHistoricalTags });
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useQuery({ queryKey: ["entertainment", "categories"], queryFn: fetchCategories });

  const navigate = useNavigate();

  const handleCardClick = (item: Itinerary | Activity | HistoricalPlace) => {
    // Navigate to detail page, pass the item data via state
    navigate(`/details/${item._id}`, { state: { item } });
  };

  //fetching data
  useEffect(() => {
    setFinishedLoading(
      !isLoadingActivities &&
        !isLoadingItineraries &&
        !isPreferenceTags &&
        !isLoadingCategories &&
        !isHistoricalPlaces &&
        !isHistoricalTags,
    );
  }, [
    isLoadingActivities,
    isLoadingItineraries,
    isPreferenceTags,
    isLoadingCategories,
    isHistoricalPlaces,
    isHistoricalTags,
  ]);

  useEffect(() => {
    if (finishedLoading) {
      setSkeleton(false);
    }
  }, [finishedLoading]);

  const searchParts = ["Category", "Tag"];
  useEffect(() => {
    if (finishedLoading) {
      const categoryNames = categories.map((category: Category) => category.name);
      const preferenceTagsNames = preferenceTags.map(
        (preferenceTag: PreferenceTag) => preferenceTag.name,
      );
      const historicalTagsNames = historicalTags.map(
        (historicalTag: HistoricalTag) => historicalTag.name,
      );
      setSearchPartsValues([categoryNames, [...preferenceTagsNames, ...historicalTagsNames]]);
    }
  }, [finishedLoading]);

  useEffect(() => {
    // Combine all data into one array initially
    if (finishedLoading) setCombined([...activities, ...itineraries, ...historicalPlaces]);
  }, [activities, itineraries, finishedLoading, historicalPlaces]);

  const handleSort = (sortOption: SortOption) => {
    setSortOption(sortOption);
  };

  const handleActiveFilterClick = (filter: Filter) => {
    setActiveFilter((prevFilters) => {
      if (prevFilters.includes(filter)) {
        return prevFilters.filter((item) => item !== filter); // Remove if selected
      } else {
        return [...prevFilters, filter]; // Add if not selected
      }
    });
  };
  const handleCategoryClick = (value: string) => {
    if (selectedCategory.includes(value)) {
      setSelectedCategory(selectedCategory.filter((categoryValue) => categoryValue !== value));
    } else {
      setSelectedCategory(selectedCategory.concat([value]));
    }
  };

  const handleTagClick = (value: string) => {
    if (selectedTag.includes(value)) {
      setSelectedTag(selectedTag.filter((tagValue) => tagValue !== value));
    } else {
      setSelectedTag(selectedTag.concat([value]));
    }
  };

  const resetFilters = () => {
    setSelectedPriceRange([0, 1000]);
    setSelectedRatings([]);
    setSelectedDates({ from: undefined, to: undefined });
    setSelectedLanguages([]);
    setSelectedHistoricalTags([]);
  };

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
  ].concat(
    CommonFilter(
      selectedDates,
      setSelectedDates,
      selectedPriceRange,
      setSelectedPriceRange,
      selectedRatings,
      setSelectedRatings,
      activeFilter.includes("itinerary") && activeFilter.length === 1,
    ),
  );
  if (activeFilter.includes("place")) {
    const historicalTagsNames = historicalTags
      .map((historicalTag: HistoricalTag) => historicalTag.name)
      .map((tag: string) => ({ label: tag, value: tag }));
    combinedSideBarFilters = combinedSideBarFilters.concat(
      HistoricalPlacesFilter(historicalTagsNames, setSelectedHistoricalTags),
    );
  }
  if (activeFilter.includes("itinerary")) {
    const languages: Option[] = Array.from(
      new Set<string>(
        itineraries.flatMap((itinerary: Itinerary) => (itinerary as Itinerary).languages),
      ),
    ).map((language: string) => ({ label: language, value: language }));

    combinedSideBarFilters = combinedSideBarFilters.concat(
      ItinerariesFilter(languages, setSelectedLanguages),
    );
  }

  const getAverageRating = (ratings?: IRating[]) => {
    if (!ratings || ratings.length === 0) return 0;
    return ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length;
  };

  //Searching first, then result is filter  then result is sorted
  const filteredCombinedItems = combined
    .filter((item) => {
      if ("languages" in item) {
        const itemDates = (item as Itinerary).availableDatesTime.map((date) => new Date(date.Date));
        return itemDates.some(
          (date) =>
            new Date(date) >= new Date() ||
            new Date(date).toDateString() === new Date().toDateString(),
        );
      } else if ("isBookingOpen" in item) {
        return (
          new Date((item as Activity).date) >= new Date() ||
          new Date((item as Activity).date).toDateString() === new Date().toDateString()
        );
      } else return true;
    })
    .filter((item) => {
      // Filter based on search
      if (search) {
        return item.name.toLowerCase().includes(search.toLowerCase());
      }
      return true;
    })
    .filter((item) => {
      // Filter based on active filters
      if (activeFilter.length === 0) return true; // No filters applied, show all
      if (activeFilter.includes("itinerary") && "languages" in item) return true;
      if (activeFilter.includes("activity") && "isBookingOpen" in item) return true;
      if (activeFilter.includes("place") && "openingHours" in item) return true;
      return false;
    })
    .filter((item) => {
      // Filter based on selected category
      if (item.category) {
        return selectedCategory.length === 0 || selectedCategory.includes(item.category.name);
      }
    })
    .filter((item) => {
      // Filter based on selected tag
      const preferenceTags = selectedTag.some((tag) =>
        item.preferenceTags?.some((preferenceTag) => preferenceTag.name === tag),
      );
      const historicalTags = selectedTag.some((tag) =>
        (item as HistoricalPlace).tags?.some((historicalTag) => historicalTag.name === tag),
      );
      return selectedTag.length === 0 || preferenceTags || historicalTags;
    })
    .filter((item) => {
      // Filter based on selected languages
      return (
        selectedLanguages.length === 0 ||
        selectedLanguages.some((language) =>
          (item as Itinerary)?.languages?.includes(language.value),
        )
      );
    })
    .filter((item) => {
      // Filter based on selected historical tags
      return (
        selectedHistoricalTags.length === 0 ||
        selectedHistoricalTags.some((tag) =>
          (item as HistoricalPlace)?.tags?.some((t) => t.name === tag.value),
        )
      );
    })
    .filter((item) => {
      // Filter based on selected price range
      const itemPrice = getPriceValue(item.price);
      return (
        (selectedPriceRange[0] != -1 &&
          itemPrice >= selectedPriceRange[0] &&
          itemPrice <= selectedPriceRange[1]) ||
        (selectedPriceRange[0] === -1 && selectedPriceRange[1] === -1)
      );
    })
    .filter((item) => {
      // Filter based on selected ratings
      const itemRating = getAverageRating(item.ratings);
      return (
        selectedRatings.length === 0 ||
        selectedRatings.some((rating) => itemRating >= rating && itemRating < rating + 1)
      );
    })
    .filter((item) => {
      // Filter based on selected dates
      const adjustedToDate = selectedDates?.to
        ? new Date(selectedDates.to.getTime() + 86400000)
        : null;
      let matchDate = null;
      if (
        "openingHours" in item ||
        (selectedDates.from === undefined && selectedDates.to === undefined)
      )
        matchDate = true;
      else if ("isBookingOpen" in item) {
        const itemDate = (item as Activity).date;
        matchDate =
          (selectedDates.from &&
            adjustedToDate &&
            isWithinInterval(itemDate, { start: selectedDates.from, end: adjustedToDate })) ||
          (selectedDates.to === undefined &&
            selectedDates.from &&
            new Date(itemDate).toDateString() === selectedDates.from.toDateString());
      } else if ("languages" in item) {
        const itemDates = (item as Itinerary).availableDatesTime.map((date) => new Date(date.Date));
        matchDate =
          !selectedDates?.from ||
          itemDates.some(
            (date) =>
              (selectedDates.from &&
                adjustedToDate &&
                isWithinInterval(date, { start: selectedDates.from, end: adjustedToDate })) ||
              (selectedDates.to === undefined &&
                selectedDates.from &&
                new Date(date).toDateString() === selectedDates.from.toDateString()),
          );
      }
      return matchDate;
    });

  // Sort combined items
  const sortedCombinedItems = filteredCombinedItems.sort((a, b) => {
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
    <div className={GeneralGridStyle["general-grid-view"]}>
      <FilterSortSearchHeader
        finishedLoading={finishedLoading}
        searchPlaceHolder={"Name"}
        setSearch={setSearch}
        searchParts={searchParts}
        searchPartsValues={searchPartsValues}
        searchPartsHandlers={[
          { state: selectedCategory, setState: handleCategoryClick },
          { state: selectedTag, setState: handleTagClick },
        ]}
        handleSort={handleSort}
      >
        <HeaderIcons
          activeFilters={activeFilter}
          handleActiveFilterClick={handleActiveFilterClick}
        />
      </FilterSortSearchHeader>
      <hr className="border-t border-gray-600 " />
      <div className="flex w-[100vw]">
        <FilterSideBar sideBarItems={combinedSideBarFilters} />
        <div className={GeneralGridStyle["scrollable"]}>
          <div className={GeneralGridStyle["general-grid-view__header"]}>
            <h1>Entertainment</h1>
          </div>

          <div className={GeneralGridStyle["general-grid-view__cards"]}>
            {skeleton && (
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            )}

            {!skeleton &&
              sortedCombinedItems.map((item) => (
                <EntertainmentCard
                  key={item._id}
                  image={ski}
                  rating={getAverageRating(item.ratings)}
                  title={item.name}
                  price={item.price}
                  languages={(item as Itinerary)?.languages}
                  availability={(item as Activity)?.isBookingOpen}
                  openingTime={(item as HistoricalPlace)?.openingHours}
                  onClick={() => handleCardClick(item)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralGridView;