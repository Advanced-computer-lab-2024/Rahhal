import SearchBar from "@/features/home/components/search-bar/SearchBar";
import { useState } from "react";
import { fetchSuggestions } from "@/api-calls/google-maps-api-calls";
import { useHotelSearchBarStore } from "@/stores/hotel-search-bar-slice";

interface HotelSearchBarProps {
  onIconClick: () => void;
}

function HotelSearchBar({ onIconClick }: HotelSearchBarProps) {
  const [adults, setAdults] = useState([0]);
  const [children, setChildren] = useState([0]);
  const [infants, setInfants] = useState([0]);

  const {
    destinationLocation,
    destinationSuggestions,
    checkIn,
    checkOut,
    setDestinationLocation,
    setDestinationSuggestions,
    setDestinationSuggestionsPlaceId,
    setCheckIn,
    setCheckOut,
    setGuests,
  } = useHotelSearchBarStore();

  const handlePickUpChange = async (value: string) => {
    if (value.length > 2) {
      try {
        const fetchedSuggRegions = await fetchSuggestions(value, "(regions)");
        const fetchedSuggHotels = await fetchSuggestions(value, "lodging");
        if (fetchedSuggRegions && fetchedSuggHotels) {
          const fetchedSugg = Array.from(
            new Map(
              [...fetchedSuggRegions, ...fetchedSuggHotels].map((suggestion) => [
                suggestion.description,
                suggestion,
              ]),
            ).values(),
          );
          setDestinationSuggestions(fetchedSugg.map((suggestion) => suggestion.description));
          setDestinationSuggestionsPlaceId(fetchedSugg.map((suggestion) => suggestion.placeId));
        }
      } catch (error) {
        alert("Error handling destination suggestions");
        console.error("Error handling destination suggestions:", error);
      }
    }
  };

  const handleAdultsChange = (value: number) => {
    setAdults([value]);
    setGuests(adults[0] + children[0] + infants[0]);
  };

  const handleChildrenChange = (value: number) => {
    setChildren([value]);
    setGuests(adults[0] + children[0] + infants[0]);
  };

  const handleInfantsChange = (value: number) => {
    setInfants([value]);
    setGuests(adults[0] + children[0] + infants[0]);
  };

  const searchParts = ["Where", "Check-in", "Check-out", "Guests"];
  const searchPartsPlaceholders = ["Destination", "Check-in", "Check-out", "Guests"];
  const searchPartsValues = [destinationSuggestions, [], [], []];
  return (
    <SearchBar
      inputBox={false}
      searchParts={searchParts}
      searchPartsValues={searchPartsValues}
      searchPartsHandlers={[
        { state: destinationLocation, setState: setDestinationLocation },
        { state: checkIn, setState: setCheckIn },
        { state: checkOut, setState: setCheckOut },
        { state: adults, setState: handleAdultsChange },
        { state: children, setState: handleChildrenChange },
        { state: infants, setState: handleInfantsChange },
      ]}
      searchPartsTypes={["dropdown", "date", "date", "stepper"]}
      searchPartsPlaceholders={searchPartsPlaceholders}
      searchPartsOnValueChange={[handlePickUpChange]}
      onIconClick={onIconClick}
    />
  );
}

export default HotelSearchBar;