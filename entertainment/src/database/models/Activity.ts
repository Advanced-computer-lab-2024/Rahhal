import mongoose from "mongoose";
import type { IRating } from "@/database/shared";
import {
  ratingSchema,
  validateMapNotEmpty,
  validateStringNotEmpty,
  validateRatings,
} from "@/database/shared";

// Define the schema for the activities collection
export interface IActivity {
  name: string;
  description: string;
  date: Date;
  time: Date;
  images: string[];
  location: { longitude: number; latitude: number; placeId?: string };
  price: Record<string, number>;
  category?: mongoose.Schema.Types.ObjectId;
  tags?: string[];
  specialDiscount?: number;
  isBookingOpen: boolean;
  preferenceTags?: mongoose.Schema.Types.ObjectId[];
  ratings?: IRating[];
  isAppropriate: boolean;
  owner: string;
  ownerName: string;
  deleted: boolean;
}

const activitySchema = new mongoose.Schema<IActivity>({
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
  date: { type: Date, required: true },
  time: { type: Date, required: true },
  images: { type: [String], required: true },
  location: {
    type: {
      longitude: { type: Number, required: true },
      latitude: { type: Number, required: true },
      placeId: { type: String },
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
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    validate: {
      validator: validateStringNotEmpty,
      message: "Category must not be empty",
    },
  },
  tags: { type: [String] },
  specialDiscount: { type: Number },
  isBookingOpen: { type: Boolean, required: true },
  preferenceTags: { type: [mongoose.Schema.Types.ObjectId], ref: "PreferenceTag" },
  ratings: {
    type: [ratingSchema],
    validate: {
      validator: validateRatings,
      message: "Invalid rating format, must be a number between 0 and 5",
    },
  },
  isAppropriate: { type: Boolean, required: true, default: true },
  owner: {
    type: String,
    required: true,
    validate: {
      validator: validateStringNotEmpty,
      message: "Owner must not be empty",
    },
  },
  ownerName: {
    type: String,
    required: true,
    validate: {
      validator: validateStringNotEmpty,
      message: "Owner name must not be empty",
    },
  },
  deleted: { type: Boolean, default: false },
});

const Activity = mongoose.model<IActivity>("Activity", activitySchema);

export default Activity;
