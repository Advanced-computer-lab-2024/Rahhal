import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Wishlist", wishlistSchema);
