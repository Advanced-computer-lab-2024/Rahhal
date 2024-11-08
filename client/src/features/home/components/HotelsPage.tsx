import { useHotelSearchBarStore } from "@/stores/hotel-search-bar-slice";
import HotelSearchBar from "./HotelSearchBar";
import { fetchPlaceDetails } from "@/api-calls/google-maps-api-calls";

//it will be used to see if you can book (based on being tourist/ guest user)
interface HotelPageProps {
  loggedIn: boolean;
}

function HotelsPage({ loggedIn }: HotelPageProps) {
  const { destinationLocation, destinationSuggestions, destinationSuggestionsPlaceId } =
    useHotelSearchBarStore();
  const onIconClick = async () => {
    const destinationSelectedIndex = destinationSuggestions.indexOf(destinationLocation[0]);
    const destinationPlaceId = destinationSuggestionsPlaceId[destinationSelectedIndex];
    const placeDetails = await fetchPlaceDetails(destinationPlaceId);
    if (placeDetails) {
      const { name } = placeDetails;
      //call your hotel api with the with "name" attribute as its parameter
    } else {
      console.error("Failed to fetch place details");
    }
  };

  return (
    <div className=" w-[100%] flex">
      <HotelSearchBar onIconClick={onIconClick} />
    </div>
  );
}

export default HotelsPage;