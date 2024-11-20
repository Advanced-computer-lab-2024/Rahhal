import { create } from "zustand";

interface SearchBarState {
  infants: number;
  adults: number;
  children: number;
  destinationLocation: string[];
  destinationSuggestions: string[];
  destinationSuggestionsPlaceId: string[];
  checkIn: Date[];
  checkOut: Date[];
  guests: number;
  setInfants: (value: number) => void;
  setAdults: (value: number) => void;
  setChildren: (value: number) => void;
  setDestinationLocation: (location: string) => void;
  setDestinationSuggestions: (suggestions: string[]) => void;
  setDestinationSuggestionsPlaceId: (placeId: string[]) => void;
  setCheckIn: (time: Date | undefined) => void;
  setCheckOut: (time: Date | undefined) => void;
  setGuests: (count: number) => void;
  resetSearchBar: () => void;
}

export const useHotelSearchBarStore = create<SearchBarState>()((set) => ({
  destinationLocation: [],
  destinationSuggestions: [],
  destinationSuggestionsPlaceId: [],
  checkIn: [],
  checkOut: [],
  guests: 0,
  infants: 0,
  adults: 0,
  children: 0,
  setDestinationLocation: (location) =>
    set({ destinationLocation: location.length === 0 ? [] : [location] }),
  setDestinationSuggestions: (suggestions) => set({ destinationSuggestions: suggestions }),
  setDestinationSuggestionsPlaceId: (placeId) => set({ destinationSuggestionsPlaceId: placeId }),
  setCheckIn: (time) => set({ checkIn: time ? [time] : [] }),
  setCheckOut: (time) => set({ checkOut: time ? [time] : [] }),
  setGuests: (count) => set({ guests: count }),
  setInfants: (value) => set({ infants: value }),
  setAdults: (value) => set({ adults: value }),
  setChildren: (value) => set({ children: value }),
  resetSearchBar: () =>
    set({
      destinationLocation: [],
      destinationSuggestions: [],
      destinationSuggestionsPlaceId: [],
      checkIn: [],
      checkOut: [],
      guests: 0,
      infants: 0,
      adults: 0,
      children: 0,
    }),
}));
