import mongoose from "mongoose";
import { bookingType, bookingStatus } from "@/utils/types";

const bookingSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  entity: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: Object.values(bookingType),
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(bookingStatus),
    required: true,
    default: bookingStatus.Upcoming,
  },
  selectedPrice: {
    type: Number,
  },
  selectedDate: {
    type: Date,
  }
});

export default mongoose.model("Booking", bookingSchema);