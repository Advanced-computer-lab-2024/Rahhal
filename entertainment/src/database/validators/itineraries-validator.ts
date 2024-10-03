import { CONSTANTS } from "../../utils/constants";

// Validate location coordinates to be within the range of longitude -180 to 180 and latitude -90 to 90
export function validateLocations(locations: [{ longitude: number; latitude: number }]) {
  return locations.every((location) => {
    return (
      location.longitude >= CONSTANTS.MIN_LONGITUDE &&
      location.longitude <= CONSTANTS.MAX_LONGITUDE &&
      location.latitude >= CONSTANTS.MIN_LATITUDE &&
      location.latitude <= CONSTANTS.MAX_LATITUDE
    );
  });
}

// Validate price format to be a number or an object { min: number, max: number } and to be greater than or equal to 0
export function validateTourPrice(tour_price: number | { min: number; max: number }) {
  if (typeof tour_price === "number") {
    return tour_price >= CONSTANTS.ZERO;
  } else if (typeof tour_price === "object") {
    return tour_price.min >= CONSTANTS.ZERO && tour_price.max > tour_price.min;
  }
  return false;
}

// Validate rating format to be a number between 0 and 5
export function validateRating(ratings: number[]) {
  return ratings.every(
    (rating) => rating >= CONSTANTS.MIN_RATING && rating <= CONSTANTS.MAX_RATING,
  );
}
