import mongoose from "mongoose";
import type { IRating } from "@/database/shared";
import {
  ratingSchema,
  validateMapNotEmpty,
  validateStringNotEmpty,
  validateRatings,
} from "@/database/shared";

export interface IHistoricalPlace {
  name: string;
  description: string;
  location: { longitude: number; latitude: number; placeId?: string };
  openingHours: { open: Date; close: Date };
  price: Record<string, number>;
  images: string[];
  tags?: mongoose.Schema.Types.ObjectId[];
  ratings?: IRating[];
  preferenceTags?: mongoose.Schema.Types.ObjectId[];
  owner: string;
  category?: mongoose.Schema.Types.ObjectId;
}

const historicalPlaceSchema = new mongoose.Schema<IHistoricalPlace>({
  name: {
    type: String,
    required: true,
    validate: {
      validator: validateStringNotEmpty,
      message: "Name must not be empty",
    },
  },
  description: {
    type: String,
    required: true,
    validate: {
      validator: validateStringNotEmpty,
      message: "Description must not be empty",
    },
  },
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
        type: Date,
        required: true,
      },
      close: {
        type: Date,
        required: true,
      },
    },
    required: true,
  },
  // @ts-ignore
  price: {
    type: Map,
    of: Number,
    required: true,
    validate: {
      validator: validateMapNotEmpty,
      message: "Price must not be empty",
    },
  },
  images: { type: [String], required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "HistoricalTag" }],
  preferenceTags: [{ type: mongoose.Schema.Types.ObjectId, ref: "PreferenceTag" }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  owner: {
    type: String,
    required: true,
    validate: {
      validator: validateStringNotEmpty,
      message: "Owner must not be empty",
    },
  },
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
