"use client";
import * as React from "react";
import { Book, Bookmark, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import useBookmarkStore from "@/stores/bookmark-count-store";
import { addBookmark, isEntityBookmarked, removeBookmark } from "@/api-calls/bookmark-api-calls";
import { useParams } from "react-router-dom";
import { bookmarkType } from "@/utils/enums";

interface BookmarkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
  entityType: bookmarkType;
}

export default function CardBookmark({ id, entityType, className, ...props }: BookmarkButtonProps) {
  const { id: userId } = useParams();
  const [isBookmarked, setBookmarked] = useState(false);
  const { incrementCount, decrementCount } = useBookmarkStore();

  useEffect(() => {
    if (!userId) return;
    isEntityBookmarked(userId, id, entityType).then(setBookmarked);
    console.log("Wishlist status", isBookmarked);
  }, [userId, id]);

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!id) return; // Ensure the product has a valid ID

    if (!userId) {
      alert("You must login");
      return;
    }

    if (isBookmarked) {
      try {
        await removeBookmark(userId, id, entityType);
        setBookmarked(false);
        decrementCount();
      } catch (error) {
        console.error("Failed to remove from wishlist", error);
      }
    } else {
      try {
        await addBookmark(userId, id, entityType);
        setBookmarked(true);
        incrementCount();
      } catch (error) {
        console.error("Failed to add to wishlist", error);
      }
    }
  };
  return (
    <Bookmark
      className={cn(
        "absolute top-2 right-2",
        "transition-all duration-200",
        "hover:scale-110 active:scale-95",
        "stroke-[1.5]",
        "stroke-white",
        isBookmarked ? "fill-[var(--primary-color)]" : " fill-foreground/50",
      )}
      onClick={handleBookmarkClick}
    />
  );
}
