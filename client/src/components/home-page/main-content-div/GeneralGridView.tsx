import GeneralGridStyle from "./GeneralGridView.module.css";
import EntertainmentCard from "@/components/entertainment-card/EntertainmentCard";
import felluca from "../../../assets/aswan2.webp";
import ski from "../../../assets/ski egypt.jpg";
import activitypic from "../../../assets/activity.png";
import placepic from "../../../assets/Historic site.png";
import itinerarypic from "../../../assets/iternerary.png";
import pyramid from "../../../assets/pyramids.webp";
import aswan from "../../../assets/Aswan.webp";
import { useEffect, useState } from "react";
import SearchBar from "../../shadcn/SearchBar";
import SortButton from "../../home-page-buttons/SortButton";
import {useQuery} from '@tanstack/react-query'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {Skeleton} from "@/components/ui/skeleton";

type Filter = "itinerary" | "place" | "activity";
type SortOption = "price-high-low" | "price-low-high" | "rating-high-low" | "rating-low-high";
const ACTIVITIES_API = 'http://localhost:3000/api/entertainment/activities';
const ITENARIES_API = 'http://localhost:3000/api/entertainment/itineraries';
const PLACES_API = 'http://localhost:3000/api/entertainment/places';
const TAGS_API = 'http://localhost:3000/api/entertainment/preference-tags';
const CATEGORIES_API = 'http://localhost:3000/api/entertainment/categories';

interface Itinerary {
    _id: string;
    name: string;
    details: string;
    activities: string[];
    locations: [{ longitude: number; latitude: number }];
    timeline: string;
    duarationOfActivities: string[];
    language: string;//TO DO: change to array
    price: number | { min: number; max: number };
    availableDatesTime: { Date: Date; Time: Date }[];
    accessibility: string;
    pickUpLocation: { longitude: number; latitude: number };
    dropOffLocation: { longitude: number; latitude: number };
    ratings: number[];
    preferenceTags: PreferenceTag[];
    category: Category;
    owner: string;
}

interface Activity {
  _id: string;
  name: string;
  date: Date;
  time: Date;
  location: { longitude: number; latitude: number };
  price: number | { min: number; max: number };
  category: Category;
  tags: string[];
  specialDiscounts: string[];
  isBookingOpen: boolean;
  preferenceTags: PreferenceTag[];
  ratings: number[];
}

interface Category {
  _id:string;
  name:string;
}

interface PreferenceTag {
  _id:string;
  name:string;
}


// filter using the 3 icons on the top

// Fetching logic from the database
const GeneralGridView = () => {
  const [activefilter, setActiveFilter] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");
  const [combined, setCombined] = useState<(Itinerary | Activity)[]>([]);
  const [searchPartsValues, setSearchPartsValues] = useState<string[][]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string[]>([]);
  const [skeleton, setSkeleton] = useState<boolean>(true);
  const [finishedLoading, setFinishedLoading] = useState<boolean>(false);

// Fetching funcitons

  const fetchActivities = async () => {
    const res = await fetch(ACTIVITIES_API);
    return res.json();
  };
  
  const fetchItenaries = async () => {
    const res = await fetch(ITENARIES_API);
    return res.json();
  };
  
  // const fetchPlaces = async () => {
  //   const res = await fetch(PLACES_API);
  //   return res.json();
  // };

  const fetchTags = async () => {
    const res = await fetch(TAGS_API);
    return res.json();
  }

  // const fetchCategories = async () => {
  //   const res = await fetch(CATEGORIES_API);
  //   return res.json();
  // }

  // useQueries
  const {data: activities, isLoading: isLoadingActivities, error: errorActivities} = useQuery({queryKey: ['entertainment','activities'], queryFn:fetchActivities});
  const {data: itenaries, isLoading: isLoadingItenaries, error: errorItenaries} = useQuery({queryKey: ['entertainment','itenaries'], queryFn:fetchItenaries});
  // const {data: places, isLoading: isLoadingPlaces, error: errorPlaces} = useQuery({queryKey: ['entertainment','places'], queryFn:fetchPlaces});
  const {data: tags, isLoading: isLoadingTags, error: errorTags} = useQuery({queryKey: ['entertainment','tags'], queryFn:fetchTags});
  // const {data: categories, isLoading: isLoadingCategories, error: errorCategories} = useQuery({queryKey: ['entertainment','categories'], queryFn:fetchCategories});

  // const {data: places} = useQuery('places', fetchPlaces);



  //fetching data
  useEffect(() => {
    setFinishedLoading(!isLoadingActivities && !isLoadingItenaries && !isLoadingTags)
    console.log(activities);
    console.log(itenaries);
  }, [isLoadingActivities, isLoadingItenaries, isLoadingTags]);
  
  useEffect(() => {
    if (finishedLoading) {
      setSkeleton(false);
    }
  }, [finishedLoading]);

  const searchParts = ["Category", "Tag"];

  useEffect(() => {
    setSearchPartsValues([["Beach", "Safari", "Hiking"]]);
  }, []);

  useEffect(() => {
    // Combine all data into one array initially
    if(finishedLoading)
      setCombined([...activities, ...itenaries]);
  }, [activities,itenaries,finishedLoading]);

  //Passing the sort option to the child component
  const [sortOption, setSortOption] = useState<SortOption | null>(null);

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

  //Searching first, then result is filter  then result is sorted
  const filteredCombinedItems = combined
    .filter((item) => {
      // Filter based on search
      if (search) {
        return item.name.toLowerCase().includes(search.toLowerCase());
      }
      return true;
    })
    .filter((item) => {
      // Filter based on active filters
      if (activefilter.length === 0) return true; // No filters applied, show all
      if (activefilter.includes("itinerary") && "language" in item) return true;
      if (activefilter.includes("activity") && "isBookingOpen" in item) return true;
      if (activefilter.includes("place") && "openingTime" in item) return true;
      return false;
    })
    .filter((item) => {
      // Filter based on selected category
      console.log(item);
      return selectedCategory.length === 0 || selectedCategory.includes(item.category.name);
    })
    .filter((item) => {
      // Filter based on selected tag
      //TO DO ADD TAGS FOR PLACES
      return selectedTag.length === 0 || selectedTag.some((tag) => item.preferenceTags.some((preferenceTag) => preferenceTag.name === tag));
    });

    const getPriceValue = (price : number | { min: number; max: number } ) => {
      if (typeof price === 'number') {
        return price;
      } else if (price && typeof price === 'object') {
        return price.min; 
      }
      return 0;
    };
  const getAverageRating = (ratings: number[]) => {
    return ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
  }
  // Sort combined items
  const sortedCombinedItems = filteredCombinedItems.sort((a, b) => {
    const aRatings = getAverageRating(a.ratings);
    const bRatings = getAverageRating(b.ratings);
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
      <div className={GeneralGridStyle["general-grid-view__filter-container"]}>
        <div style={{ padding: "10px" }}>
           <SearchBar
            onSearch={setSearch}
            searchParts={searchParts}
            searchPartsValues={[["Beach", "Safari", "Hiking","justcategory"],["Adventure", "Relaxation", "Culture","justtag"]]}
            searchPartsHandlers={[
              { state: selectedCategory, setState: handleCategoryClick },
              { state: selectedTag, setState: handleTagClick },
            ]}
          />
        </div>

        <div className={GeneralGridStyle["general-grid-view__filter-container__icons"]}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className={`${GeneralGridStyle["icon-wrapper"]} ${activefilter.includes("itinerary") ? GeneralGridStyle["selected"] : ""}`}
                  onClick={() => handleActiveFilterClick("itinerary")}
                >
                  <img src={itinerarypic} alt="itinerary" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Itineraries</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className={`${GeneralGridStyle["icon-wrapper"]} ${activefilter.includes("place") ? GeneralGridStyle["selected"] : ""}`}
                  onClick={() => handleActiveFilterClick("place")}
                >
                  <img src={placepic} alt="place" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Places</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className={`${GeneralGridStyle["icon-wrapper"]} ${activefilter.includes("activity") ? GeneralGridStyle["selected"] : ""}`}
                  onClick={() => handleActiveFilterClick("activity")}
                >
                  <img src={activitypic} alt="activity" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Activities</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div style={{ padding: "10px" }}>
          <SortButton onSort={handleSort} />
        </div>
      </div>

      <div className={GeneralGridStyle["general-grid-view__header"]}>
        <h1>Entertainment</h1>
        <hr className="border-t border-gray-300 my-4" />
      </div>

      <div className={GeneralGridStyle["general-grid-view__card-row"]}>
        {
          skeleton &&
          <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
        }

        {!skeleton && sortedCombinedItems.map((item) => (
          <EntertainmentCard
            key={item._id}
            image={"src/assets/ski egypt.jpg"}
            //fix later
            rating={getAverageRating(item.ratings)}
            title={item.name}
            // location={(item as Activity) ? (item as Activity).location : (item as Itinerary).locations[0]}
            price={item.price}
            language={ [(item as Itinerary)?.language] } 
            //should be changed to an array later on
            availability={(item as Activity)?.isBookingOpen}
            // openingTime={(item as Place)?.openingTime}
          />
        ))}
      </div>

      <div className={GeneralGridStyle["general-grid-view__card-row"]}></div>
    </div>
  );
};

export default GeneralGridView;
