import SearchBar from "@/features/home/components/search-bar/SearchBar";
import { useState } from "react";
import { fetchSuggestions } from "@/api-calls/google-maps-api-calls";
import { useHotelSearchBarStore } from "@/stores/search-bar-stores/hotel-search-bar-slice";

interface HotelSearchBarProps {
  onIconClick: () => void;
}

function HotelSearchBar({ onIconClick }: HotelSearchBarProps) {
  const {
    adults,
    destinationLocation,
    children,
    infants,
    destinationSuggestions,
    checkIn,
    checkOut,
    setChildren,
    setAdults,
    setInfants,
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
    setAdults(value);
    setGuests(value + children + infants);
  };

  const handleChildrenChange = (value: number) => {
    setChildren(value);
    setGuests(adults + value + infants);
  };

  const handleInfantsChange = (value: number) => {
    setInfants(value);
    setGuests(adults + children + value);
  };

  const searchParts = ["Where", "Check-in", "Check-out", "guests"];
  const searchPartsPlaceholders = ["Destination", "Check-in", "Check-out", "guests"];
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
        { state: [adults], setState: handleAdultsChange },
        { state: [children], setState: handleChildrenChange },
        { state: [infants], setState: handleInfantsChange },
      ]}
      searchPartsTypes={["dropdown", "date", "date", "stepper"]}
      searchPartsPlaceholders={searchPartsPlaceholders}
      searchPartsOnValueChange={[handlePickUpChange]}
      onIconClick={onIconClick}
    />
  );
}

export default HotelSearchBar;
