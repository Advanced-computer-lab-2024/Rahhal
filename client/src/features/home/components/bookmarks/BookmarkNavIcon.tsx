"use client";
import { Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserBookmarks } from "@/api-calls/bookmark-api-calls";
import { useNavigate } from "react-router-dom";
import { TPopulatedBookmark } from "../../types/home-page-types";
import useBookmarkStore from "@/stores/nav-bar-icon-stores/bookmark-count-store";
import useUserStore from "@/stores/user-state-store";

function BookmarkNavIcon() {
  const { id} = useUserStore();
  const { count, setCount } = useBookmarkStore();
  const navigate = useNavigate();

  const { data: bookmarkedItems, isLoading } = useQuery({
    queryKey: ["BookmarkedItems", id],
    queryFn: () => fetchUserBookmarks(id!),
    enabled: !!id,
    select: (data) => data as TPopulatedBookmark[],
  });

  useEffect(() => {
    if (!isLoading && bookmarkedItems) {
      setCount(bookmarkedItems.length);
    }
  }, [bookmarkedItems]);
  return (
    <motion.div
      className="relative inline-block cursor-pointer"
      whileHover={{ scale: 1.1 }} // Slight scaling on hover
      whileTap={{ scale: 0.95 }} // Slight scaling on tap
    >
      <Bookmark
        className="w-6 h-6 text-gray-700 transition-colors duration-300"
        onClick={() => navigate(`/my-bookmarks`)}
      />
      {count > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="absolute -top-1.5 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-lg"
        >
          {count > 99 ? "99+" : count}
        </motion.div>
      )}
    </motion.div>
  );
}

export default BookmarkNavIcon;
