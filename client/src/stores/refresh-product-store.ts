import { create } from "zustand";

interface refreshProductState {
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
}

const useProductRefreshStore = create<refreshProductState>((set) => ({
  refresh: false,
  setRefresh: (refresh) => set({ refresh }),
}));

export default useProductRefreshStore;
