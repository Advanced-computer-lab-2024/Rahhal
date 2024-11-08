import { create } from "zustand";

interface SearchBarState {
  pickupLocation: string[];
  pickupSuggestions: string[];
  pickupSuggestionsPlaceId: string[];
  dropOffLocation: string[];
  dropOffSuggestions: string[];
  dropOffSuggestionsPlaceId: string[];
  departureTime: Date[];
  passengers: number;
  setPickupLocation: (location: string) => void;
  setPickupSuggestions: (suggestions: string[]) => void;
  setPickupSuggestionsPlaceId: (placeId: string[]) => void;
  setDropOffLocation: (location: string) => void;
  setDropOffSuggestions: (suggestions: string[]) => void;
  setDropOffSuggestionsPlaceId: (placeId: string[]) => void;
  setDepartureTime: (time: Date | undefined) => void;
  setPassengers: (count: number) => void;
  resetSearchBar: () => void;
}

export const useSearchBarStore = create<SearchBarState>()((set) => ({
  pickupLocation: [],
  pickupSuggestions: [],
  pickupSuggestionsPlaceId: [],
  dropOffLocation: [],
  dropOffSuggestions: [],
  dropOffSuggestionsPlaceId: [],
  departureTime: [],
  passengers: 0,
  setPickupLocation: (location) => set({ pickupLocation: [location] }),
  setPickupSuggestions: (suggestions) => set({ pickupSuggestions: suggestions }),
  setPickupSuggestionsPlaceId: (placeId) => set({ pickupSuggestionsPlaceId: placeId }),
  setDropOffLocation: (location) => set({ dropOffLocation: [location] }),
  setDropOffSuggestions: (suggestions) => set({ dropOffSuggestions: suggestions }),
  setDropOffSuggestionsPlaceId: (placeId) => set({ dropOffSuggestionsPlaceId: placeId }),
  setDepartureTime: (time) => set({ departureTime: time ? [time] : [] }),
  setPassengers: (count) => set({ passengers: count }),
  resetSearchBar: () =>
    set({
      pickupLocation: [],
      pickupSuggestions: [],
      pickupSuggestionsPlaceId: [],
      dropOffLocation: [],
      dropOffSuggestions: [],
      dropOffSuggestionsPlaceId: [],
      departureTime: [],
      passengers: 0,
    }),
}));
