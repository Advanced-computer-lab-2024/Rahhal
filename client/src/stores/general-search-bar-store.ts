import { create } from "zustand";

interface SearchBarState {
  focusIndex: number;
  hoverIndex: number;
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
  setFocusIndex: (index: number) => void;
  setHoverIndex: (index: number) => void;
}

export const useGeneralSearchBarStore = create<SearchBarState>()((set) => ({
  focusIndex: 0,
  hoverIndex: 0,
  dropdownOpen: false,
  setDropdownOpen: (dropdownOpen) => set({ dropdownOpen }),
  setFocusIndex: (index) => set({ focusIndex: index }),
  setHoverIndex: (index) => set({ hoverIndex: index }),
}));
