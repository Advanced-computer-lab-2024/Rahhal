import { create } from 'zustand'

interface WishlistState {
    count: number
    addToWishlist: () => void
    removeFromWishlist: () => void
    resetWishlist: () => void
}


const useWishlistStore = create<WishlistState>((set) => ({
    count: 0,
    addToWishlist: () =>
        set((state) => ({ count: state.count + 1 })),

    removeFromWishlist: () =>
        set((state) => ({ count: Math.max(0, state.count - 1) })), // Ensure count doesn't go below 0

    resetWishlist: () =>
        set(() => ({ count: 0 }))
}))

export default useWishlistStore