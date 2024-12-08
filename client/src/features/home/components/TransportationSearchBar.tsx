import SearchBar from "@/features/home/components/search-bar/SearchBar";
import { useState } from "react";
import { fetchSuggestions } from "@/api-calls/google-maps-api-calls";
import { useSearchBarStore } from "@/stores/search-bar-stores/transportation-searchbar-slice";

interface TransportationSearchBarProps {
  onIconClick: () => void;
}

function TransportationSearchBar({ onIconClick }: TransportationSearchBarProps) {
  const {
    pickupLocation,
    pickupSuggestions,
    dropOffLocation,
    dropOffSuggestions,
    departureTime,
    setPickupLocation,
    setPickupSuggestions,
    setPickupSuggestionsPlaceId,
    setDropOffLocation,
    setDropOffSuggestions,
    setDropOffSuggestionsPlaceId,
    setDepartureTime,
    setPassengers,
  } = useSearchBarStore();

  const [adults, setAdults] = useState([0]);
  const [children, setChildren] = useState([0]);
  const [infants, setInfants] = useState([0]);

  const handlePickUpChange = async (value: string) => {
    if (value.length > 2) {
      try {
        const fetchedSugg = await fetchSuggestions(value, "establishment");
        if (fetchedSugg) {
          setPickupSuggestions(fetchedSugg.map((suggestion) => suggestion.description));
          setPickupSuggestionsPlaceId(fetchedSugg.map((suggestion) => suggestion.placeId));
        }
      } catch (error) {
        console.error("Error handling departure suggestions:", error);
      }
    }
  };

  const handleDropOffChange = async (value: string) => {
    if (value.length > 2) {
      try {
        const fetchedSugg = await fetchSuggestions(value, "establishment");
        if (fetchedSugg) {
          setDropOffSuggestions(fetchedSugg.map((suggestion) => suggestion.description));
          setDropOffSuggestionsPlaceId(fetchedSugg.map((suggestion) => suggestion.placeId));
        }
      } catch (error) {
        console.error("Error handling arrival suggestions:", error);
      }
    }
  };

  const handleAdultsChange = (value: number) => {
    setAdults([value]);
    setPassengers(value + children[0] + infants[0]);
  };

  const handleChildrenChange = (value: number) => {
    setChildren([value]);
    setPassengers(adults[0] + value + infants[0]);
  };

  const handleInfantsChange = (value: number) => {
    setInfants([value]);
    setPassengers(adults[0] + children[0] + value);
  };

  const searchParts = ["From", "To", "Departure", "Passengers"];
  const searchPartsPlaceholders = ["Pickup location", "Destination", "Departure", "Passengers"];
  const searchPartsValues = [pickupSuggestions, dropOffSuggestions, [], [], []];
  return (
    <SearchBar
      inputBox={false}
      searchParts={searchParts}
      searchPartsValues={searchPartsValues}
      searchPartsHandlers={[
        { state: pickupLocation, setState: setPickupLocation },
        { state: dropOffLocation, setState: setDropOffLocation },
        { state: departureTime, setState: setDepartureTime },
        { state: adults, setState: handleAdultsChange },
        { state: children, setState: handleChildrenChange },
        { state: infants, setState: handleInfantsChange },
      ]}
      searchPartsTypes={["dropdown", "dropdown", "date", "stepper"]}
      searchPartsPlaceholders={searchPartsPlaceholders}
      searchPartsOnValueChange={[handlePickUpChange, handleDropOffChange]}
      onIconClick={onIconClick}
      displayHours={true}
    />
  );
}

export default TransportationSearchBar;
