import mongoose from "mongoose";
import * as productValidator from "../validators/products-validator";
import type { IRating } from "../rating";
import { ratingSchema, validateRatings } from "../rating";
export interface IProduct {
  name: string;
  picture: string;
  price: number;
  description: string;
  seller: string;
  ratings: IRating[];
  quantity: number;
  reviews: { user: string; rating: number; comment: string }[];
}

const productSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  picture: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: productValidator.validatePrice,
      message: "Invalid price format, must be a number greater than 0",
    },
  },
  quantity: {
    type: Number,
    required: true,
    validate: {
      validator: productValidator.validateQuantity,
      message: "Invalid quantity format, must be a number greater than 0",
    },
  },
  description: { type: String, required: true },
  seller: { type: String, required: true },
  ratings: {
    type: [ratingSchema],
    validate: {
      validator: validateRatings,
      message: "Invalid rating format, must be a number between 0 and 5",
    },
  },
});

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;
