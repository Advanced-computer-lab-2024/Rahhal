import SearchBar from "@/features/home/components/search-bar/SearchBar";
import { useState } from "react";

function TravelSearchBar() {
  const [fromSearch, setSearch] = useState<string[]>([]);
  const [toSearch, setToSearch] = useState<string[]>([]);
  const [departureDate, setDepartureDate] = useState<Date[]>([]);
  const [returnDate, setReturnDate] = useState<Date[]>([]);
  const [adults, setAdults] = useState([0]);
  const [children, setChildren] = useState([0]);
  const [infants, setInfants] = useState([0]);

  const handleFromSearchClick = (value: string) => {
    setSearch([value]);
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
  const searchPartsValues = [["New York", "Los Angeles"], ["New York", "Los Angeles"], [], [], []];
  return (
    <SearchBar
      inputBox={false}
      searchParts={searchParts}
      searchPartsValues={searchPartsValues}
      searchPartsHandlers={[
        { state: fromSearch, setState: handleFromSearchClick },
        { state: toSearch, setState: handleToSearchClick },
        { state: departureDate, setState: handleDepartureDateChange },
        { state: returnDate, setState: handleReturnDateChange },
        { state: adults, setState: handleAdultsChange },
        { state: children, setState: handleChildrenChange },
        { state: infants, setState: handleInfantsChange },
      ]}
      searchPartsTypes={["dropdown", "dropdown", "date", "date", "stepper"]}
      searchPartsPlaceholders={searchPartsPlaceholders}
    />
  );
}

export default TravelSearchBar;
