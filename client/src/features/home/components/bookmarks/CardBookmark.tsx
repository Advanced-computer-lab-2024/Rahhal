"use client";
import * as React from "react";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import useBookmarkStore from "@/stores/nav-bar-icon-stores/bookmark-count-store";
import { addBookmark, isEntityBookmarked, removeBookmark } from "@/api-calls/bookmark-api-calls";
import { bookmarkType } from "@/utils/enums";
import SignUpModal from "../SignupModal";
import { toast } from "@/hooks/use-toast";
import useUserStore from "@/stores/user-state-store";

interface BookmarkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
  entityType: bookmarkType;
}

export default function CardBookmark({ id, entityType }: BookmarkButtonProps) {
  const { id: userId } = useUserStore();
  const [isBookmarked, setBookmarked] = useState(false);
  const { incrementCount, decrementCount } = useBookmarkStore();
  const [isGuestAction, setIsGuestAction] = useState(false);

  useEffect(() => {
    if (!userId) return;
    isEntityBookmarked(userId, id, entityType).then(setBookmarked);
  }, [userId, id]);

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!id) return;

    if (!userId) {
      setIsGuestAction(true);
      return;
    }

    if (isBookmarked) {
      try {
        await removeBookmark(userId, id, entityType);
        setBookmarked(false);
        decrementCount();
      } catch (error) {
        toast({
          title: `Failed to remove ${entityType} bookmark, Please try again later.`,
          variant: "destructive",
          duration: 3500,
        });
      }
    } else {
      try {
        await addBookmark(userId, id, entityType);
        setBookmarked(true);
        incrementCount();
      } catch (error) {
        toast({
          title: `Failed to add ${entityType} bookmark, Please try again later.`,
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
          onClose={(e) => {
            e.stopPropagation();
            setIsGuestAction(false);
          }}
          text={"Making a list? Sign in to bookmark your favourite events"}
        />
      )}
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
    </>
  );
}
