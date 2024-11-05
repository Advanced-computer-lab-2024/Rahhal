import { Schema } from "mongoose";
import { CONSTANTS } from "../utils/constants";
export interface IRating {
  userId: string;
  userName: string;
  rating: number;
  review?: string;
}

export const ratingSchema = new Schema<IRating>({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: false },
});

export function validateRatings(ratings: IRating[]) {
  return ratings.every(
    (rating) => rating.rating >= CONSTANTS.MIN_RATING && rating.rating <= CONSTANTS.MAX_RATING,
  );
}
