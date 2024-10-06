import mongoose from "mongoose";
import * as historicalPlaceValidator from "@/database/validators/historical-places-validator";
import type { IRating } from "@/database/shared";
import { ratingSchema, validateRatings } from "@/database/shared";

export interface IHistoricalPlace {
  name: string;
  description: string;
  location: { longitude: number; latitude: number; placeId?: string };
  openingHours: { open: string; close: string };
  price: { foreigner: number; native: number; student: number };
  images: string[];
  tags?: mongoose.Schema.Types.ObjectId[];
  ratings?: IRating[];
  preferenceTags?: mongoose.Schema.Types.ObjectId[][];
  owner: string;
  category?: mongoose.Schema.Types.ObjectId;
}

const historicalPlaceSchema = new mongoose.Schema<IHistoricalPlace>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    type: {
      longitude: { type: Number, required: true },
      latitude: { type: Number, required: true },
      placeId: { type: String },
    },
    required: true,
  },
  openingHours: {
    type: {
      open: {
        type: String,
        required: true,
        validate: {
          validator: historicalPlaceValidator.validateTime,
          message: "Invalid timing format, must be in form 00:00",
        },
      },
      close: {
        type: String,
        required: true,
        validate: {
          validator: historicalPlaceValidator.validateTime,
          message: "Invalid timing format, must be in form 00:00",
        },
      },
    },
    required: true,
  },
  price: {
    type: {
      foreigner: { type: Number, required: true },
      native: { type: Number, required: true },
      student: { type: Number, required: true },
    },
    required: true,
  },
  images: { type: [String], required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "HistoricalTag" }],
  preferenceTags: [{ type: mongoose.Schema.Types.ObjectId, ref: "PreferenceTag" }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  owner: { type: String, required: true },
  ratings: {
    type: [ratingSchema],
    validate: {
      validator: validateRatings,
      message: "Invalid rating format, must be a number between 0 and 5",
    },
  },
});

const HistoricalPlace = mongoose.model<IHistoricalPlace>("HistoricalPlace", historicalPlaceSchema);

export default HistoricalPlace;
