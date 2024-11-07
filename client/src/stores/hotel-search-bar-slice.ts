import { create } from "zustand";

interface SearchBarState {
  destinationLocation: string[];
  destinationSuggestions: string[];
  destinationSuggestionsPlaceId: string[];
  checkIn: Date[];
  checkOut: Date[];
  guests: number;
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
  setDestinationLocation: (location) => set({ destinationLocation: [location] }),
  setDestinationSuggestions: (suggestions) => set({ destinationSuggestions: suggestions }),
  setDestinationSuggestionsPlaceId: (placeId) => set({ destinationSuggestionsPlaceId: placeId }),
  setCheckIn: (time) => set({ checkIn: time ? [time] : [] }),
  setCheckOut: (time) => set({ checkOut: time ? [time] : [] }),
  setGuests: (count) => set({ guests: count }),
  resetSearchBar: () =>
    set({
      destinationLocation: [],
      destinationSuggestions: [],
      destinationSuggestionsPlaceId: [],
      checkIn: [],
      checkOut: [],
      guests: 0,
    }),
}));
