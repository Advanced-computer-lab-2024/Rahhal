import mongoose from "mongoose";
import type { IRating } from "@/database/shared";
import { ratingSchema, validateRatings } from "@/database/shared";

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
  appropriate: boolean;
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
    type: Map,
    of: Number,
    required: true,
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
  appropriate: { type: Boolean, required: true, default: true },
  owner: { type: String, required: true },
});

const Activity = mongoose.model<IActivity>("Activity", activitySchema);

export default Activity;
