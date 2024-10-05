import mongoose from "mongoose";
import * as productValidator from "../validators/products-validator";
import { CONSTANTS } from "../../utils/constants";

export interface IProduct {
  product_name: string;
  picture: string;
  price: number;
  description: string;
  seller: string;
  rating: number;
  reviews: { user: string; rating: number; comment: string }[];
}

const productSchema = new mongoose.Schema<IProduct>({
  product_name: { type: String, required: true },
  picture: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: productValidator.validatePrice,
      message: "Invalid price format, must be a number greater than 0",
    },
  },
  description: { type: String, required: true },
  seller: { type: String, required: true },
  rating: {
    type: Number,
    required: true,
    min: CONSTANTS.MIN_RATING,
    max: CONSTANTS.MAX_RATING,
    validate: {
      validator: productValidator.validateRating,
      message: "Invalid rating, must be a number between 0 and 5",
    },
  },
  reviews: {
    type: [
      {
        user: { type: String, required: true },
        rating: { type: Number, required: true, min: CONSTANTS.MIN_RATING, max: CONSTANTS.MAX_RATING },
        comment: { type: String },
      },
    ],
  },
});

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;
