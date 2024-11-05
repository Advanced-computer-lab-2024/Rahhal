import SearchBar from "@/features/home/components/search-bar/SearchBar";
import { useState } from "react";
import {
  fetchPlaceDetails,
  fetchSuggestions,
  getAirportCode,
} from "@/api-calls/transportation-api-calls";

function TravelSearchBar() {
  const [fromSearch, setSearch] = useState<string[]>([]);
  const [toSearch, setToSearch] = useState<string[]>([]);
  const [departureDate, setDepartureDate] = useState<Date[]>([]);
  const [returnDate, setReturnDate] = useState<Date[]>([]);
  const [adults, setAdults] = useState([0]);
  const [children, setChildren] = useState([0]);
  const [infants, setInfants] = useState([0]);
  const [fromSuggestions, setFromSuggestions] = useState<string[]>([]);
  const [fromSuggestionPlaceId, setFromSuggestionPlaceId] = useState<string[]>([]);

  // Handle input change
  const handleChange = async (value: string) => {
    setSearch([value]);
    if (value.length > 2) {
      try {
        const fetchedSugg = await fetchSuggestions(value); // Await the async fetchSuggestions call
        if (fetchedSugg) {
          setFromSuggestions(fetchedSugg.map((suggestion) => suggestion.description));
          setFromSuggestionPlaceId(fetchedSugg.map((suggestion) => suggestion.placeId));
        }
      } catch (error) {
        console.error("Error handling suggestions:", error);
      }
    }
  };

  const handleSelect = async (suggestion: string) => {
    setSearch([suggestion]);
    const selectedIndex = fromSuggestions.indexOf(suggestion);

    // Retrieve the corresponding place_id
    const placeId = fromSuggestionPlaceId[selectedIndex];

    if (!placeId) {
      console.error("Place ID not found for the selected suggestion");
      return;
    }
    // Fetch place details for latitude and longitude
    const geocode = await fetchPlaceDetails(placeId);
    if (geocode) {
      try {
        return await getAirportCode(geocode.lng, geocode.lat);
      } catch (error) {
        console.error("Error getting airport code:", error);
      }
    }
  };

  const handleToSearchClick = (value: string) => {
    setToSearch([value]);
  };

  const handleDepartureDateChange = (date: Date | undefined) => {
    if (!date) {
      setDepartureDate([]);
    } else {
      setDepartureDate([date]);
    }
  };

  const handleReturnDateChange = (date: Date | undefined) => {
    if (!date) {
      setReturnDate([]);
    } else {
      setReturnDate([date]);
    }
  };

  const handleAdultsChange = (value: number) => {
    setAdults([value]);
  };

  const handleChildrenChange = (value: number) => {
    setChildren([value]);
  };

  const handleInfantsChange = (value: number) => {
    setInfants([value]);
  };

  const searchParts = ["From", "To", "Departure", "Return", "Passengers"];
  const searchPartsPlaceholders = [
    "Pickup location",
    "Destination",
    "Departure",
    "Return",
    "Passengers",
  ];
  const searchPartsValues = [fromSuggestions, ["New York", "Los Angeles"], [], [], []];
  return (
    <SearchBar
      inputBox={false}
      searchParts={searchParts}
      searchPartsValues={searchPartsValues}
      searchPartsHandlers={[
        { state: fromSearch, setState: handleSelect },
        { state: toSearch, setState: handleToSearchClick },
        { state: departureDate, setState: handleDepartureDateChange },
        { state: returnDate, setState: handleReturnDateChange },
        { state: adults, setState: handleAdultsChange },
        { state: children, setState: handleChildrenChange },
        { state: infants, setState: handleInfantsChange },
      ]}
      searchPartsTypes={["dropdown", "dropdown", "date", "date", "stepper"]}
      searchPartsPlaceholders={searchPartsPlaceholders}
      searchPartsOnValueChange={[handleChange]}
    />
  );
}

export default TravelSearchBar;
