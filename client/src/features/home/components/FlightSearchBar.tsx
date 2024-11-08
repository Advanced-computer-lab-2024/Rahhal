import SearchBar from "@/features/home/components/search-bar/SearchBar";
import { fetchSuggestions } from "@/api-calls/google-maps-api-calls";
import { useFlightSearchBarStore } from "@/stores/flight-searchbar-slice";

interface FlightSearchBarProps {
  onIconClick: () => void;
}

function FlightSearchBar({ onIconClick }: FlightSearchBarProps) {
  const {
    departureLocation,
    departureSuggestions,
    arrivalLocation,
    arrivalSuggestions,
    departureTime,
    arrivalTime,
    adults,
    children,
    infants,
    setDepartureLocation,
    setDepartureSuggestions,
    setDepartureSuggestionsPlaceId,
    setArrivalLocation,
    setArrivalSuggestions,
    setArrivalSuggestionsPlaceId,
    setDepartureTime,
    setArrivalTime,
    setAdults,
    setChildren,
    setInfants,
  } = useFlightSearchBarStore();

  const handlePickUpChange = async (value: string) => {
    if (value.length > 2) {
      try {
        const fetchedSugg = await fetchSuggestions(value, "establishment");
        const filteredSugg = fetchedSugg?.filter((suggestion) =>
          suggestion.description.toLowerCase().includes("airport"),
        );
        if (filteredSugg) {
          setDepartureSuggestions(filteredSugg.map((suggestion) => suggestion.description));
          setDepartureSuggestionsPlaceId(filteredSugg.map((suggestion) => suggestion.placeId));
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
        const filteredSugg = fetchedSugg?.filter((suggestion) =>
          suggestion.description.toLowerCase().includes("airport"),
        );
        if (filteredSugg) {
          setArrivalSuggestions(filteredSugg.map((suggestion) => suggestion.description));
          setArrivalSuggestionsPlaceId(filteredSugg.map((suggestion) => suggestion.placeId));
        }
      } catch (error) {
        console.error("Error handling arrival suggestions:", error);
      }
    }
  };

  const searchParts = ["From", "To", "Departure", "Return", "Passengers"];
  const searchPartsPlaceholders = [
    "Pickup location",
    "Destination",
    "Departure",
    "Return",
    "Passengers",
  ];
  const searchPartsValues = [departureSuggestions, arrivalSuggestions, [], [], [], []];
  return (
    <SearchBar
      inputBox={false}
      searchParts={searchParts}
      searchPartsValues={searchPartsValues}
      searchPartsHandlers={[
        { state: departureLocation, setState: setDepartureLocation },
        { state: arrivalLocation, setState: setArrivalLocation },
        { state: departureTime, setState: setDepartureTime },
        { state: arrivalTime, setState: setArrivalTime },
        { state: adults, setState: setAdults },
        { state: children, setState: setChildren },
        { state: infants, setState: setInfants },
      ]}
      searchPartsTypes={["dropdown", "dropdown", "date", "date", "stepper"]}
      searchPartsPlaceholders={searchPartsPlaceholders}
      searchPartsOnValueChange={[handlePickUpChange, handleDropOffChange]}
      onIconClick={onIconClick}
    />
  );
}

export default FlightSearchBar;
