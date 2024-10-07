import { CONSTANTS } from "@/utils/constants";

export function validateTime(time: string) {
  return time.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/);
}

export function validateRating(ratings: number[]) {
  return ratings.every(
    (rating) => rating >= CONSTANTS.MIN_RATING && rating <= CONSTANTS.MAX_RATING,
  );
}
