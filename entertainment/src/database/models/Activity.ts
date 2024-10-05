import mongoose from "mongoose";
import type { IRating } from "@/database/shared";
import { ratingSchema, validateRatings } from "@/database/shared";
import * as activitiesValidator from "@/database/validators/activities-validator";

// Define the schema for the activities collection
export interface IActivity {
  name: string;
  description: string;
  date: Date;
  time: Date;
  images: string[];
  location: { longitude: number; latitude: number; placeId?: string };
  price: number | { type: string; price: number }[];
  category?: mongoose.Schema.Types.ObjectId;
  tags?: string[];
  specialDiscount?: number;
  isBookingOpen: boolean;
  preferenceTags?: mongoose.Schema.Types.ObjectId[];
  ratings?: IRating[];
  owner: string;
}

const activitySchema = new mongoose.Schema<IActivity>({
  name: { type: String, required: true },
  description: { type: String, required: true },
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
  price: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    validate: {
      validator: activitiesValidator.validatePrice,
      message:
        "Invalid price format, must be a number or an array of objects with a type and price",
    },
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
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
  owner: { type: String, required: true },
});

const Activity = mongoose.model<IActivity>("Activity", activitySchema);

export default Activity;
