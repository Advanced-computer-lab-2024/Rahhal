import { CONSTANTS } from "../../utils/constants";


// Validate price format to be a number or an object { min: number, max: number } and to be greater than or equal to 0
export function validatePrice(price: number | { min: number; max: number }) {
    if (typeof price === "number") {
        return price >= CONSTANTS.ZERO;
    } else if (typeof price === "object") {
        return price.min >= CONSTANTS.ZERO && price.max > price.min;
    }
    return false;
}

// Validate rating format to be a number between 0 and 5
export function validateRating(ratings: number) {
    return ratings >= CONSTANTS.MIN_RATING && ratings <= CONSTANTS.MAX_RATING;
}