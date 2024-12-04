"use client";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserWishlist } from "@/api-calls/wishlist-api-calls";
import { useParams } from "react-router-dom";
import { TPopulatedWishlist } from "../../types/home-page-types";
import useWishlistStore from "@/stores/wishlist-count-store";
import useUserStore from "@/stores/user-state-store";

function WishlistIcon() {
  // const { id } = useParams();
  const { id } = useUserStore();
  const { count, setCount } = useWishlistStore();

  const { data: wishlistItems, isLoading } = useQuery({
    queryKey: ["wishlistItems", id],
    queryFn: () => fetchUserWishlist(id!), // Pass the function reference properly
    enabled: !!id, // Prevent the query from running if `id` is undefined
    select: (data) => data as TPopulatedWishlist[],
  });

  useEffect(() => {
    if (!isLoading && wishlistItems) {
      setCount(wishlistItems.length);
    }
  }, [wishlistItems]);
  return (
    <motion.div
      className="relative inline-block cursor-pointer"
      whileHover={{ scale: 1.1 }} // Slight scaling on hover
      whileTap={{ scale: 0.95 }} // Slight scaling on tap
    >
      <Heart className="w-6 h-6 text-gray-700 transition-colors duration-300" />
      {count > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-lg"
        >
          {count > 99 ? "99+" : count}
        </motion.div>
      )}
    </motion.div>
  );
}

export default WishlistIcon;
