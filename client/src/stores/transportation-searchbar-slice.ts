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
  selectedPickupLocation: string;
  selectedDropOffLocation: string;
  setPickupLocation: (location: string) => void;
  setPickupSuggestions: (suggestions: string[]) => void;
  setPickupSuggestionsPlaceId: (placeId: string[]) => void;
  setDropOffLocation: (location: string) => void;
  setDropOffSuggestions: (suggestions: string[]) => void;
  setDropOffSuggestionsPlaceId: (placeId: string[]) => void;
  setDepartureTime: (time: Date | undefined) => void;
  setPassengers: (count: number) => void;
  setSelectedPickupLocation: (location: string) => void;
  setSelectedDropOffLocation: (location: string) => void;
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
  selectedPickupLocation: "",
  selectedDropOffLocation: "",
  setPickupLocation: (location) => set({ pickupLocation: location.length === 0 ? [] : [location] }),
  setPickupSuggestions: (suggestions) => set({ pickupSuggestions: suggestions }),
  setPickupSuggestionsPlaceId: (placeId) => set({ pickupSuggestionsPlaceId: placeId }),
  setDropOffLocation: (location) =>
    set({ dropOffLocation: location.length === 0 ? [] : [location] }),
  setDropOffSuggestions: (suggestions) => set({ dropOffSuggestions: suggestions }),
  setDropOffSuggestionsPlaceId: (placeId) => set({ dropOffSuggestionsPlaceId: placeId }),
  setDepartureTime: (time) => set({ departureTime: time ? [time] : [] }),
  setPassengers: (count) => set({ passengers: count }),
  setSelectedPickupLocation: (location) => set({ selectedPickupLocation: location }),
  setSelectedDropOffLocation: (location) => set({ selectedDropOffLocation: location }),
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
