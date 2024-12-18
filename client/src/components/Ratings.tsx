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
  <div className="bg-white shadow-md rounded-lg p-4 mb-4">
    <div className="flex items-center mb-2">
      <span className="font-bold mr-2">{review.userName}</span>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <ReviewStar key={star} filled={star <= review.rating} />
        ))}
      </div>
    </div>
    {review.review && <p className="text-gray-600">{review.review}</p>}
  </div>
);

const ReviewDisplay: React.FC<ReviewProps> = ({ reviews }) => {
  const { user } = useContext(EditContextTourGuide);
  const reviewsMapped = reviews ?? user.ratings ?? [];
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      {reviewsMapped.map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}
    </div>
  );
};

export default ReviewDisplay;
