import mongoose from "mongoose";
import { CONSTANTS } from "@/utils/constants";

export interface IHistoricalPlace {
  name: string;
  description: string;
  location: { longitude: number; latitude: number };
  openingHours: { open: string; close: string };
  ticketPrice: { foreigner: number, native: number, student: number};
  images: string[];
  tags: string[];
  ratings: number[];
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
          validator: validateTime, 
          message: "Invalid timing format, must be in form 00:00"
        } 
      },
      close: { 
        type: String, 
        required: true, 
        validate: {
          validator: validateTime, 
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
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "HistoricalTags"}],
  ratings: {
    type: [Number],
    required: true,
    validate: {
      validator: validateRating,
      message: "Invalid rating format, must be a number between 0 and 5",
    },
  },
});

function validateTime(time: string) {
  return time.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/);
}

function validateRating(ratings: number[]) {
  return ratings.every(rating => 
    rating >= CONSTANTS.MIN_RATING && rating <= CONSTANTS.MAX_RATING
  );
}

const HistoricalPlace = mongoose.model<IHistoricalPlace>("HistoricalPlace", historicalPlaceSchema);

export default HistoricalPlace;
