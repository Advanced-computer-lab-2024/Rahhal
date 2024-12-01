import { useHotelSearchBarStore } from "@/stores/hotel-search-bar-slice";
import HotelSearchBar from "./HotelSearchBar";
import { fetchPlaceDetails } from "@/api-calls/google-maps-api-calls";
import HotelGridView from "./HotelGridView";
import { fetchHotels } from "@/api-calls/hotel-api-calls";
import { useState } from "react";
import { useHotelStore } from "@/stores/hotel-store";
import HotelsLandingComponent from "@/features/home/components/hotels-landing-page/HotelsLandingComponent"; // Import the landing page
import { toast } from "@/hooks/use-toast";

interface HotelPageProps {
  loggedIn: boolean;
}

function HotelsPage({ loggedIn }: HotelPageProps) {
  const {
    destinationLocation,
    destinationSuggestions,
    destinationSuggestionsPlaceId,
    checkIn,
    checkOut,
    infants,
    adults,
    children,
  } = useHotelSearchBarStore();

  const [loading, setLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false); // Track if a search has been performed
  const { hotels, setHotels } = useHotelStore();

  const onIconClick = async () => {
    if (!destinationLocation.length) {
      toast({
        title: "Please fill in the destination field",
        variant: "destructive",
        duration: 3500,
      });
      return;
    }
    if (!checkIn.length || !checkOut.length) {
      toast({
        title: "Please specify check-in and check-out dates",
        variant: "destructive",
        duration: 3500,
      });
      return;
    }
    if (infants + adults + children === 0) {
      toast({
        title: "Please specify the number of guests",
        variant: "destructive",
        duration: 3500,
      });
      return;
    }

    const destinationSelectedIndex = destinationSuggestions.indexOf(destinationLocation[0]);
    const destinationPlaceId = destinationSuggestionsPlaceId[destinationSelectedIndex];
    const placeDetails = await fetchPlaceDetails(destinationPlaceId);
    if (placeDetails) {
      const { name } = placeDetails;
      setLoading(true);
      setHasSearched(true); // Mark that a search has been performed
      const newHotels = await fetchHotels(name);
      setHotels(newHotels);
      setLoading(false);
    } else {
      console.error("Failed to fetch place details");
    }
  };

  return (
    <>
      <div className="w-[100%] flex justify-center">
        <HotelSearchBar onIconClick={onIconClick} />
      </div>
      <hr className="border bg-[var(--gray-scale)] w-full my-5" />

      {!hasSearched ? (
        <HotelsLandingComponent />
      ) : (
        <HotelGridView loading={loading} hotels={hotels} />
      )}
    </>
  );
}

export default HotelsPage;
