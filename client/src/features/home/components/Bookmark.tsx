"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";

export default function AnimatedBookmark() {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <button
      onClick={toggleBookmark}
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
      <p className="ml-1 text-sm hover:underline">{"Bookmark"}</p>
    </button>
  );
}
