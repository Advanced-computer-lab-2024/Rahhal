import { create } from "zustand";

interface WishlistItem {
  id: string;
}

interface WishlistState {
  count: number; // Wishlist count
  wishlist: WishlistItem[]; // List of items in the wishlist
  addToWishlist: (item: WishlistItem) => void; // Add an item
  removeFromWishlist: (id: string) => void; // Remove an item by ID
  resetWishlist: () => void; // Reset wishlist
  isWishlisted: (id: string) => boolean; // Check if an item is wishlisted
}

const useWishlistStore = create<WishlistState>((set, get) => ({
  count: 0,
  wishlist: [],

  addToWishlist: (item) => {
    const currentWishlist = get().wishlist;
    if (!currentWishlist.some((wishlistItem) => wishlistItem.id === item.id)) {
      set((state) => ({
        wishlist: [...state.wishlist, item],
        count: state.count + 1,
      }));
    }
  },

  removeFromWishlist: (id) => {
    const currentWishlist = get().wishlist;
    if (currentWishlist.some((wishlistItem) => wishlistItem.id === id)) {
      set((state) => ({
        wishlist: state.wishlist.filter((item) => item.id !== id),
        count: Math.max(0, state.count - 1),
      }));
    }
  },

  resetWishlist: () =>
    set(() => ({
      wishlist: [],
      count: 0,
    })),

  isWishlisted: (id) => {
    const currentWishlist = get().wishlist;
    return currentWishlist.some((item) => item.id === id);
  },
}));

export default useWishlistStore;