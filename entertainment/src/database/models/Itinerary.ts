import mongoose from "mongoose";
import type { IRating } from "../../database/shared";
import {
  ratingSchema,
  validateListNotEmpty,
  validateRatings,
  validateStringNotEmpty,
} from "../../database/shared";
import * as itineraryValidator from "../validators/itineraries-validator";

export interface IItinerary {
  name: string;
  description: string;
  activities: string[];
  locations: [{ longitude: number; latitude: number; placeId?: string }];
  timeline: string;
  durationOfActivities: string[];
  images: string[];
  languages: string[];
  price: number | { min: number; max: number };
  availableDatesTime: { Date: Date; Time: Date }[];
  accessibility: string;
  pickUpLocation: { longitude: number; latitude: number; placeId?: string };
  dropOffLocation: { longitude: number; latitude: number; placeId?: string };
  ratings?: IRating[];
  preferenceTags?: mongoose.Schema.Types.ObjectId[];
  category?: mongoose.Schema.Types.ObjectId;
  active: boolean;
  appropriate: boolean;
  owner: string;
  deleted: boolean;
}

const itinerarySchema = new mongoose.Schema<IItinerary>({
  name: {
    type: String,
    required: true,
    validate: {
      validator: validateStringNotEmpty,
      message: "Itinerary name must not be empty",
    },
  },
  description: {
    type: String,
    required: true,
    validate: {
      validator: validateStringNotEmpty,
      message: "Itinerary description must not be empty",
    },
  },
  activities: { type: [String], required: true },
  images: { type: [String], required: true },
  locations: {
    type: [
      {
        longitude: { type: Number, required: true },
        latitude: { type: Number, required: true },
        placeId: { type: String },
      },
    ],
    required: true,
    validate: [
      itineraryValidator.validateLocations,
      "Invalid location coordinates: Longitude must be between -180 and 180, latitude must be between -90 and 90",
    ],
  },
  timeline: {
    type: String,
    required: true,
    validate: {
      validator: validateStringNotEmpty,
      message: "Itinerary timeline must not be empty",
    },
  },
  durationOfActivities: {
    type: [String],
    required: true,
    validate: {
      validator: validateListNotEmpty,
      message: "Itinerary duration of activities must not be empty",
    },
  },
  languages: { type: [String], required: true },
  price: {
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
  accessibility: {
    type: String,
    required: true,
    validate: {
      validator: validateStringNotEmpty,
      message: "Itinerary accessibility must not be empty",
    },
  },
  pickUpLocation: {
    type: {
      longitude: { type: Number, required: true },
      latitude: { type: Number, required: true },
      placeId: { type: String },
    },
    required: true,
  },
  dropOffLocation: {
    type: {
      longitude: { type: Number, required: true },
      latitude: { type: Number, required: true },
      placeId: { type: String },
    },
    required: true,
  },
  ratings: {
    type: [ratingSchema],
    validate: {
      validator: validateRatings,
      message: "Invalid rating format, must be a number between 0 and 5",
    },
  },
  preferenceTags: { type: [mongoose.Schema.Types.ObjectId], ref: "PreferenceTag" },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
    validate: {
      validator: validateStringNotEmpty,
      message: "Itinerary category must not be empty",
    },
  },
  active: { type: Boolean, required: true, default: true },
  appropriate: { type: Boolean, required: true, default: true },
  owner: {
    type: String,
    required: true,
    validate: {
      validator: validateStringNotEmpty,
      message: "Itinerary owner must not be empty",
    },
  },
  deleted: { type: Boolean, default: false },
});

const Itinerary = mongoose.model<IItinerary>("Itinerary", itinerarySchema);
export default Itinerary;
