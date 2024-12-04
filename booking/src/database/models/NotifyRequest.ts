import mongoose from "mongoose";

const notifyRequestSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  entity: {
    type: String,
    required: true,
  },
});

export default mongoose.model("NotifyRequest", notifyRequestSchema);
