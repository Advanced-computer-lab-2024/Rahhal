import { CONSTANTS } from "@/utils/constants";

// Validate price format to be a number or an object [{type: string, price: number}] and to be greater than or equal to 0
export function validatePrice(price: number | { type: string; price: number }[]) {
  if (typeof price === "number") {
    return price >= CONSTANTS.ZERO;
  } else if (typeof price === "object") {
    return price.every(
      (priceObject) =>
        priceObject.price >= CONSTANTS.ZERO &&
        typeof priceObject.type === "string" &&
        priceObject.type.length > CONSTANTS.ZERO &&
        typeof priceObject.price === "number",
    );
  }
  return false;
}

// Validate rating format to be a number between 0 and 5
export function validateRating(ratings: number[]) {
  return ratings.every(
    (rating) => rating >= CONSTANTS.MIN_RATING && rating <= CONSTANTS.MAX_RATING,
  );
}
