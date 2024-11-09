import { useHotelSearchBarStore } from "@/stores/hotel-search-bar-slice";
import HotelSearchBar from "./HotelSearchBar";
import { fetchPlaceDetails } from "@/api-calls/google-maps-api-calls";
import HotelGridView from "./HotelGridView";
import { fetchHotels } from "@/api-calls/hotel-api-calls";
import { useState } from "react";
import { useHotelStore } from "@/stores/hotel-store";

interface HotelPageProps {
  loggedIn: boolean;
}

function HotelsPage({ loggedIn }: HotelPageProps) {
  const { destinationLocation, destinationSuggestions, destinationSuggestionsPlaceId } =
    useHotelSearchBarStore();
  
  const [ loading , setLoading ] = useState<boolean>(false);
  const {hotels , setHotels} = useHotelStore();

  const onIconClick = async () => {
    const destinationSelectedIndex = destinationSuggestions.indexOf(destinationLocation[0]);
    const destinationPlaceId = destinationSuggestionsPlaceId[destinationSelectedIndex];
    const placeDetails = await fetchPlaceDetails(destinationPlaceId);
    if (placeDetails) {
      const { name } = placeDetails;
      setLoading(true);
      const newHotels = await fetchHotels(name);
      setHotels(newHotels);
      setLoading(false);
    } else {
      console.error("Failed to fetch place details");
    }
  };



  return (
    <>
    <div className=" w-[100%] flex justify-center">
      <HotelSearchBar onIconClick={onIconClick} />
    </div>
    <hr className="border-1 border-black w-full my-5" />
    <HotelGridView loading={loading} hotels={hotels} />
  </>
    
  );
}

export default HotelsPage;
