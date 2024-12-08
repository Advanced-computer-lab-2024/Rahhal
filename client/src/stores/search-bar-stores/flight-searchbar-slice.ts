import { create } from "zustand";

interface SearchBarState {
  departureLocation: string[];
  departureSuggestions: string[];
  departureSuggestionsPlaceId: string[];
  arrivalLocation: string[];
  arrivalSuggestions: string[];
  arrivalSuggestionsPlaceId: string[];
  departureTime: Date[];
  arrivalTime: Date[];
  adults: number[];
  children: number[];
  infants: number[];
  setDepartureLocation: (location: string) => void;
  setDepartureSuggestions: (suggestions: string[]) => void;
  setDepartureSuggestionsPlaceId: (placeId: string[]) => void;
  setArrivalLocation: (location: string) => void;
  setArrivalSuggestions: (suggestions: string[]) => void;
  setArrivalSuggestionsPlaceId: (placeId: string[]) => void;
  setDepartureTime: (time: Date | undefined) => void;
  setArrivalTime: (time: Date | undefined) => void;
  setAdults: (count: number) => void;
  setChildren: (count: number) => void;
  setInfants: (count: number) => void;
  resetSearchBar: () => void;
}

export const useFlightSearchBarStore = create<SearchBarState>()((set) => ({
  departureLocation: [],
  departureSuggestions: [],
  departureSuggestionsPlaceId: [],
  arrivalLocation: [],
  arrivalSuggestions: [],
  arrivalSuggestionsPlaceId: [],
  departureTime: [],
  arrivalTime: [],
  adults: [0],
  children: [0],
  infants: [0],
  departureAirportCode: "",
  arrivalAirportCode: "",
  setDepartureLocation: (location) =>
    set({ departureLocation: location.length === 0 ? [] : [location] }),
  setDepartureSuggestions: (suggestions) => set({ departureSuggestions: suggestions }),
  setDepartureSuggestionsPlaceId: (placeId) => set({ departureSuggestionsPlaceId: placeId }),
  setArrivalLocation: (location) =>
    set({ arrivalLocation: location.length === 0 ? [] : [location] }),
  setArrivalSuggestions: (suggestions) => set({ arrivalSuggestions: suggestions }),
  setArrivalSuggestionsPlaceId: (placeId) => set({ arrivalSuggestionsPlaceId: placeId }),
  setDepartureTime: (time) => set({ departureTime: time ? [time] : [] }),
  setArrivalTime: (time) => set({ arrivalTime: time ? [time] : [] }),
  setAdults: (count) => set({ adults: [count] }),
  setChildren: (count) => set({ children: [count] }),
  setInfants: (count) => set({ infants: [count] }),
  resetSearchBar: () =>
    set({
      departureLocation: [],
      departureSuggestions: [],
      departureSuggestionsPlaceId: [],
      arrivalLocation: [],
      arrivalSuggestions: [],
      arrivalSuggestionsPlaceId: [],
      departureTime: [],
      arrivalTime: [],
      adults: [0],
      children: [0],
      infants: [0],
    }),
}));
