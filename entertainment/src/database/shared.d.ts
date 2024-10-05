export interface IRating {
  userId: string;
  rating: number;
  review?: string;
}

export const ratingSchema = new Schema<IRating>({
  user: { type: String, required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: false },
});

export function validateRatings(ratings: IRating[]) {
  return ratings.every(
    (rating) => rating >= CONSTANTS.MIN_RATING && rating <= CONSTANTS.MAX_RATING,
  );
}
