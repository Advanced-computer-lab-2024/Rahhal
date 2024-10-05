import { CONSTANTS } from "../../utils/constants";

// Validate price format to be a number and greater than 0
export function validatePrice(price: number) {
  if (typeof price === "number") {
    return price >= CONSTANTS.ZERO;
  }
  return false;
}

// Validate rating format to be a number between 0 and 5
export function validateRating(ratings: number) {
  return ratings >= CONSTANTS.MIN_RATING && ratings <= CONSTANTS.MAX_RATING;
}
