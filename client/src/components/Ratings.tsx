import React from "react";
import { Star } from "lucide-react";
import type { TRating } from "@/types/shared";
import { useContext } from "react";
import { EditContextTourGuide } from "@/features/tour-guide/components/TourGuideHomePage";
interface ReviewProps {
  reviews?: TRating[];
}

const ReviewStar = ({ filled }: { filled: boolean }) => (
  <Star
    size={20}
    className={filled ? "text-yellow-400" : "text-gray-300"}
    fill={filled ? "currentColor" : "none"}
  />
);

const ReviewCard = ({ review }: { review: TRating }) => (
  <div className="bg-white shadow-md rounded-lg p-3 sm:p-4 mb-4">
    <div className="flex flex-col sm:flex-row sm:items-center mb-2 space-y-1 sm:space-y-0">
      <span className="font-bold mr-2 text-sm sm:text-base">
        {review.userName}
      </span>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <ReviewStar key={star} filled={star <= review.rating} />
        ))}
      </div>
    </div>
    {review.review && (
      <p className="text-gray-600 text-sm sm:text-base">{review.review}</p>
    )}
  </div>
);

const ReviewDisplay: React.FC<ReviewProps> = ({ reviews }) => {
  const { user } = useContext(EditContextTourGuide);
  const reviewsMapped = reviews ?? user.ratings ?? [];
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        Customer Reviews
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviewsMapped.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
      {reviewsMapped.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          <p>No reviews yet</p>
        </div>
      )}
    </div>
  );
};

export default ReviewDisplay;
