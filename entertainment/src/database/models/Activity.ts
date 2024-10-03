import * as activitiesValidator from "@/database/validators/activities-validator";
import mongoose from "mongoose";

// Define the schema for the activities collection
export interface IActivity {
  name: string;
  date: Date;
  time: Date;
  location: { longitude: number; latitude: number };
  price: number | { min: number; max: number };
  category: string;
  tags: string[];
  specialDiscounts: string[];
  isBookingOpen: boolean;
  preferenceTags: string[];
  ratings: number[];
}

const activitySchema = new mongoose.Schema<IActivity>({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: Date, required: true },
  location: {
    type: {
      longitude: { type: Number, required: true },
      latitude: { type: Number, required: true },
    },
    required: true,
  },
  price: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    validate: {
      validator: activitiesValidator.validatePrice,
      message: "Invalid price format, must be a number or an object { min: number, max: number }",
    },
  },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  specialDiscounts: { type: [String], required: true },
  isBookingOpen: { type: Boolean, required: true },
  preferenceTags: { type: [String], required: true },
  ratings: {
    type: [Number],
    required: true,
    validate: {
      validator: activitiesValidator.validateRating,
      message: "Invalid rating format, must be a number between 0 and 5",
    },
  },
});

const Activity = mongoose.model<IActivity>("Activity", activitySchema);

export default Activity;
