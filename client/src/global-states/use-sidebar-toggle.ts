import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SideBarToggleState {
  isOpen: boolean;
  setIsOpen: () => void;
}

export const useSideBarToggle = create(
  persist<SideBarToggleState>(
    (set, get) => ({
      isOpen: false,
      setIsOpen: () => {
        set({ isOpen: !get().isOpen });
      },
    }),
    {
      name: "sidebarOpen",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
