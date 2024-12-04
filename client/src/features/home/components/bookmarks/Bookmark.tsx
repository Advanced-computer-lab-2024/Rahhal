"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { useParams } from "react-router-dom";
import { isEntityBookmarked, removeBookmark, addBookmark } from "@/api-calls/bookmark-api-calls";
import { bookmarkType } from "@/utils/enums";
import useBookmarkStore from "@/stores/nav-bar-icon-stores/bookmark-count-store";
import SignUpModal from "../SignupModal";
import { toast } from "@/hooks/use-toast";
import useUserStore from "@/stores/user-state-store";

interface AnimatedBookmarkProps {
  id: string;
  bookmarkType: bookmarkType;
}

export default function AnimatedBookmark({ id, bookmarkType }: AnimatedBookmarkProps) {
  const [isBookmarked, setBookmarked] = useState(false);
  const [isGuestAction, setIsGuestAction] = useState(false);
  // const userId = useParams().id;
  const {id : userId} = useUserStore();
  const { incrementCount, decrementCount } = useBookmarkStore();

  useEffect(() => {
    if (!userId) return;
    isEntityBookmarked(userId, id, bookmarkType).then(setBookmarked);
  }, [userId, id]);

  const handleBookmarkClick = async () => {
    if (!id) return;
    // Ensure the product has a valid ID

    if (!userId || userId === "undefined") {
      setIsGuestAction(true);
      return;
    }

    if (isBookmarked) {
      try {
        await removeBookmark(userId, id, bookmarkType);
        setBookmarked(false);
        decrementCount();
      } catch (error) {
        toast({
          title: `Failed to remove ${bookmarkType} bookmark, Please try again later.`,
          variant: "destructive",
          duration: 3500,
        });
      }
    } else {
      try {
        await addBookmark(userId, id, bookmarkType);
        setBookmarked(true);
        incrementCount();
      } catch (error) {
        toast({
          title: `Failed to add ${bookmarkType} bookmark, Please try again later.`,
          variant: "destructive",
          duration: 3500,
        });
      }
    }
  };

  return (
    <>
      {isGuestAction && (
        <SignUpModal
          onClose={() => {
            setIsGuestAction(false);
          }}
          text={"Excited to book? Sign in or create an account to secure your spot now!"}
        />
      )}
      <button
        onClick={handleBookmarkClick}
        className="p-2 relative inline-flex items-center justify-center"
        aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      >
        <motion.div
          animate={{ scale: isBookmarked ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <Bookmark
            size={22}
            className={`transition-colors duration-300 ${
              isBookmarked ? "text-[var(--primary-color)]" : "text-black"
            }`}
          />
          <motion.div
            initial={false}
            animate={{
              pathLength: isBookmarked ? 1 : 0,
              opacity: isBookmarked ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              inset: 0,
              fill: "var(--primary-color)",
              strokeWidth: 0,
              zIndex: 10,
            }}
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 absolute">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </motion.div>
        </motion.div>
        <p className="ml-1 text-sm hover:underline">{isBookmarked ? "Bookmarked" : "Bookmark"} </p>
      </button>
    </>
  );
}
