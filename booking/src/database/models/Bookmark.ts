import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
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
    required: true,
  },
});

export default mongoose.model("Bookmark", bookmarkSchema);
