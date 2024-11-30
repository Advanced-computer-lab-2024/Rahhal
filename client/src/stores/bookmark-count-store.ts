import { create } from "zustand";

interface BookmarkState {
  count: number;
  setCount: (count: number) => void;
  incrementCount: () => void;
  decrementCount: () => void;
}

const useBookmarkStore = create<BookmarkState>((set) => ({
  count: 0,
  setCount: (count) => set({ count }),
  incrementCount: () => set((state) => ({ count: state.count + 1 })),
  decrementCount: () => set((state) => ({ count: state.count - 1 })),
}));

export default useBookmarkStore;
