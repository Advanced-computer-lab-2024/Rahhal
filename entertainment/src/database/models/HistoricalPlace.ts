import mongoose from "mongoose";
import * as historicalPlaceValidator from "@/database/validators/historical-places-validator";

export interface IHistoricalPlace {
  name: string;
  description: string;
  location: { longitude: number; latitude: number };
  openingHours: { open: string; close: string };
  ticketPrice: { foreigner: number, native: number, student: number};
  images: string[];
  tags?: string[];
  ratings: number[];
  preferenceTags?: string[];
  assignee: string;
  category?: string;
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
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "HistoricalTag"}],
  preferenceTags: [{ type: mongoose.Schema.Types.ObjectId, ref: "PreferenceTag"}],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category"},
  assignee: { type: String, required: true },
  ratings: {
    type: [Number],
    required: true,
    validate: {
      validator: historicalPlaceValidator.validateRating,
      message: "Invalid rating format, must be a number between 0 and 5",
    },
  },
});

const HistoricalPlace = mongoose.model<IHistoricalPlace>("HistoricalPlace", historicalPlaceSchema);

export default HistoricalPlace;
