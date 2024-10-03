import mongoose from "mongoose";
import * as itineraryValidator from "../validators/itineraries-validator";

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
      itineraryValidator.validateLocations,
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
      validator: itineraryValidator.validateTourPrice,
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
      validator: itineraryValidator.validateRating,
      message: "Invalid rating format, must be a number between 0 and 5",
    },
  },
  preference_tags: { type: [String], required: true },
});

const Itinerary = mongoose.model<IItinerary>("Itinerary", itinerarySchema);
export default Itinerary;
