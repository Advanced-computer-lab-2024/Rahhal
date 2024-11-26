import React from "react";
import { Star } from "lucide-react";
import { TRating } from "@/types/shared";

interface ReviewListProps {
  reviews: TRating[];
  initialDisplayCount?: number;
}

const Review: React.FC<ReviewListProps> = ({
  reviews,
  initialDisplayCount = 6, // Increased default to show 3 rows in 2 columns
}) => {
  const [showAll, setShowAll] = React.useState(false);

  const displayedReviews = showAll ? reviews : reviews.slice(0, initialDisplayCount);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedReviews.map((review) => (
          <div
            key={review.userId}
            className="flex items-start space-x-3 bg-white rounded-lg p-4 shadow-sm"
          >
            {/* Avatar with initials */}
            <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">
                {review.userName[0].toUpperCase()}
              </span>
            </div>

            {/* Review content */}
            <div className="flex-1 min-w-0">
              {" "}
              {/* Added min-w-0 to prevent overflow */}
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-gray-900 truncate">{review.userName}</h3>
                <div className="flex flex-shrink-0">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className={`${
                        index < review.rating
                          ? "text-[var(--primary-color)] fill-[var(--primary-color)]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-600 break-words">{review.review}</p>
            </div>
          </div>
        ))}
      </div>

      {reviews.length > initialDisplayCount && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-6 w-full text-center text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default Review;
