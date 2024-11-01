import { Types } from "mongoose";
import mongoose, { Schema } from "mongoose";

export enum Status {
  pending = "pending",
  resolved = "resolved",
}

export interface IComplaint {
  _id: Types.ObjectId;
  title: string;
  body: string;
  date: Date;
  status: Status;
  owner: mongoose.Schema.Types.ObjectId;
  replies?: string[];
}

const complaintSchema: Schema = new Schema<IComplaint>(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Status,
      default: Status.pending,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    replies: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true },
);

const Complaint = mongoose.model<IComplaint>("Complaint", complaintSchema);
export default Complaint;
