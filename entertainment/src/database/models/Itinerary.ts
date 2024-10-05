import mongoose, { Schema } from "mongoose";
import * as itineraryValidator from "../validators/itineraries-validator";

export interface IItinerary {
  name: string;
  details: string;
  activities: string[];
  locations: [{ longitude: number; latitude: number }];
  timeline: string;
  duarationOfActivities: string[];
  language: string;
  tourPrice: number | { min: number; max: number };
  availableDatesTime: { Date: Date; Time: Date }[];
  accessibility: string;
  pickUpLocation: { longitude: number; latitude: number };
  dropOffLocation: { longitude: number; latitude: number };
  ratings: number[];
  preferenceTags: mongoose.Types.ObjectId[];
  category: mongoose.Types.ObjectId;
  owner: string;
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
  duarationOfActivities: { type: [String], required: true },
  language: { type: String, required: true },
  tourPrice: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    validate: {
      validator: itineraryValidator.validateTourPrice,
      message: "Invalid price format, must be a number or an object { min: number, max: number }",
    },
  },
  availableDatesTime: {
    type: [
      {
        Date: { type: Date, required: true },
        Time: { type: Date, required: true },
      },
    ],
    required: true,
  },
  accessibility: { type: String, required: true },
  pickUpLocation: {
    type: {
      longitude: { type: Number, required: true },
      latitude: { type: Number, required: true },
    },
    required: true,
  },
  dropOffLocation: {
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
  preferenceTags: { type: [mongoose.Types.ObjectId], ref: "PreferenceTag", required: false},
  category: { type: mongoose.Types.ObjectId, ref: "Category", required: true },
  owner: { type: String, required: true },
});

const Itinerary = mongoose.model<IItinerary>("Itinerary", itinerarySchema);
export default Itinerary;
