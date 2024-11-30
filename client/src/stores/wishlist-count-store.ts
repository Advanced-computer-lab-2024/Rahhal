import { create } from "zustand";

interface WishlistState {
  count: number;
  setCount: (count: number) => void;
  incrementCount: () => void;
  decrementCount: () => void;
}

const useWishlistStore = create<WishlistState>((set) => ({
  count: 0,
  setCount: (count) => set({ count }),
  incrementCount: () => set((state) => ({ count: state.count + 1 })),
  decrementCount: () => set((state) => ({ count: state.count - 1 })),
}));

export default useWishlistStore;
