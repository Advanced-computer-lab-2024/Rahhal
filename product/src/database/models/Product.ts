import mongoose from "mongoose";
import * as productValidator from "../validators/products-validator";
import type { IRating } from "../rating";
import { ratingSchema, validateRatings } from "../rating";
import { validateStringNotEmpty } from "../validators/products-validator";
export interface IProduct {
  name: string;
  picture: string;
  price: number;
  description: string;
  seller: string;
  sellerName: string;
  ratings: IRating[];
  quantity: number;
  archived: boolean;
  deleted: boolean;
  reviews: { user: string; rating: number; comment: string }[];
}

const productSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true, 
    validate: {
      validator: validateStringNotEmpty,
      message: "Name must not be empty",
    },
  },
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
  description: { type: String, required: true ,
    validate: {
      validator: validateStringNotEmpty,
      message: "Description must not be empty",
    },
  },
  seller: { type: String, required: true ,
    validate: {
      validator: validateStringNotEmpty,
      message: "Seller must not be empty",
    },
  },
  sellerName: { type: String, required: true ,
    validate: {
      validator: validateStringNotEmpty,
      message: "Seller name must not be empty",
    },
  },
  archived: { type: Boolean, required: true, default: false },
  ratings: {
    type: [ratingSchema],
    validate: {
      validator: validateRatings,
      message: "Invalid rating format, must be a number between 0 and 5",
    },
  },
  deleted: { type: Boolean, default: false },
});

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;
