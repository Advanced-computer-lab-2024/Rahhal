import mongoose from "mongoose";
import * as historicalPlaceValidator from "@/database/validators/historical-places-validator";
import type { IRating } from "@/database/shared";
import { ratingSchema, validateRatings } from "@/database/shared";

export interface IHistoricalPlace {
  name: string;
  description: string;
  location: { longitude: number; latitude: number };
  openingHours: { open: string; close: string };
  ticketPrice: { foreigner: number, native: number, student: number};
  images: string[];
  tagIds?: string[];
  ratings: IRating[];
  preferenceTagIds?: string[];
  assigneeId: string;
  categoryId?: string;
}

const historicalPlaceSchema = new mongoose.Schema<IHistoricalPlace>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    type: {
      longitude: { type: Number, required: true },
      latitude: { type: Number, required: true },
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
          message: "Invalid timing format, must be in form 00:00"
        } 
      },
      close: { 
        type: String, 
        required: true, 
        validate: {
          validator: historicalPlaceValidator.validateTime, 
          message: "Invalid timing format, must be in form 00:00"
        } 
      },
    },
    required: true,
  },
  ticketPrice: {
    type: {
      foreigner: { type: Number, required: true },
      native: { type: Number, required: true },
      student: { type: Number, required: true },
    },
    required: true,
  },
  images: { type: [String], required: true },
  tagIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "HistoricalTag"}],
  preferenceTagIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "PreferenceTag"}],
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category"},
  assigneeId: { type: String, required: true },
  ratings: {
    type: [ratingSchema],
    required: true,
    validate: {
      validator: validateRatings,
      message: "Invalid rating format, must be a number between 0 and 5",
    },
  },
});

const HistoricalPlace = mongoose.model<IHistoricalPlace>("HistoricalPlace", historicalPlaceSchema);

export default HistoricalPlace;
