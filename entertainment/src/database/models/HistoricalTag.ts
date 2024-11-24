import mongoose from "mongoose";
import { validateStringNotEmpty } from "../shared";

export interface IHistoricalTag {
  name: string;
}

const HistoricalTagsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Historical Tag name is required"],
    unique: [true, "Historical Tag already exists"],
    validate: {
      validator: validateStringNotEmpty,
      message: "Historical Tag name must not be empty",
    },
  },
});

export const HistoricalTagsModel = mongoose.model<IHistoricalTag>(
  "HistoricalTag",
  HistoricalTagsSchema,
);
