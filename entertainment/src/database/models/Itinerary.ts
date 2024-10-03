import mongoose from "mongoose";
import { CONSTANTS } from "../../utils/constants";

export interface IItinerary {
  name: string;
  details: string;
  activities: string[];
  locations: [{ longitude: number; latitude: number }];
  timeline: string;
  duaration_of_activities: string[];
  language: string;
  tour_price: number | { min: number; max: number };
  available_dates_time: { Date: Date; Time: Date }[];
  accessibility: string;
  pick_up_location: { longitude: number; latitude: number };
  drop_off_location: { longitude: number; latitude: number };
  ratings: number[];
  preference_tags: string[];
}

const itinerarySchema = new mongoose.Schema<IItinerary>({
  name: { type: String, required: true },
  details: { type: String, required: true },
  activities: { type: [String], required: true },
  locations: {
    type: [
      {
        longitude: { type: Number, required: true },
        latitude: { type: Number, required: true },
      },
    ],
    required: true,
    validate: [
      validateLocations,
      "Invalid location coordinates: Longitude must be between -180 and 180, latitude must be between -90 and 90",
    ],
  },
  timeline: { type: String, required: true },
  duaration_of_activities: { type: [String], required: true },
  language: { type: String, required: true },
  tour_price: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    validate: {
      validator: validateTour_price,
      message: "Invalid price format, must be a number or an object { min: number, max: number }",
    },
  },
  available_dates_time: {
    type: [
      {
        Date: { type: Date, required: true },
        Time: { type: Date, required: true },
      },
    ],
    required: true,
  },
  accessibility: { type: String, required: true },
  pick_up_location: {
    type: {
      longitude: { type: Number, required: true },
      latitude: { type: Number, required: true },
    },
    required: true,
  },
  drop_off_location: {
    type: {
      longitude: { type: Number, required: true },
      latitude: { type: Number, required: true },
    },
    required: true,
  },
  ratings: {
    type: [Number],
    required: true,
    validate: {
      validator: validateRating,
      message: "Invalid rating format, must be a number between 0 and 5",
    },
  },
  preference_tags: { type: [String], required: true },
});

// Validate location coordinates to be within the range of longitude -180 to 180 and latitude -90 to 90
function validateLocations(locations: [{ longitude: number; latitude: number }]) {
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
function validateTour_price(tour_price: number | { min: number; max: number }) {
  if (typeof tour_price === "number") {
    return tour_price >= CONSTANTS.ZERO;
  } else if (typeof tour_price === "object") {
    return tour_price.min >= CONSTANTS.ZERO && tour_price.max > tour_price.min;
  }
  return false;
}

// Validate rating format to be a number between 0 and 5
function validateRating(ratings: number[]) {
  return ratings.every(
    (rating) => rating >= CONSTANTS.MIN_RATING && rating <= CONSTANTS.MAX_RATING,
  );
}

const Itinerary = mongoose.model<IItinerary>("Itinerary", itinerarySchema);
export default Itinerary;
