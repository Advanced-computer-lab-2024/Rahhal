import { useState, useEffect } from "react";
import Checkbox from "@/components/ui/CheckBox";
import { StarIcon } from "lucide-react";

export default function FilterStarRating({
  values,
  onValueChange,
}: {
  values: number[];
  onValueChange: (values: number[]) => void;
}) {
  const [selectedRatings, setSelectedRatings] = useState<number[]>(values);

  useEffect(() => {
    setSelectedRatings(values);
  }, [values]);

  const handleStarRatingChange = (rating: number) => {
    let updatedRatings;
    if (selectedRatings.includes(rating)) {
      updatedRatings = selectedRatings.filter((r) => r !== rating);
    } else {
      updatedRatings = [...selectedRatings, rating];
    }
    setSelectedRatings(updatedRatings);
    onValueChange(updatedRatings);
  };

  return (
    <div className="bg-background p-4 md:p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Filter by Star Rating</h3>
      <div className="grid gap-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <div
            key={rating}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleStarRatingChange(rating)}
          >
            <Checkbox
              id={`star-rating-${rating}`}
              checked={selectedRatings.includes(rating)}
              className="text-primary"
            />
            <div className="flex items-center gap-0.5 text-primary">
              {Array.from({ length: rating }).map((_, ) => (
                <StarIcon className="w-5 h-5 fill-current" />
              ))}
              {Array.from({ length: 5 - rating }).map((_, ) => (
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              ))}
            </div>
            <span className="text-base font-medium">
              {rating} {rating === 1 ? "star" : "stars"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}