import mongoose from "mongoose";
import * as productValidator from "../validators/products-validator";

export interface IProduct {
    product_name: string;
    picture: string;
    price: number | { min: number; max: number };
    description: string;
    seller: string;
    rating: number;
    reviews: { user: string; rating: number; comment: string; }[];
}

const productSchema = new mongoose.Schema<IProduct>({
    product_name: { type: String, required: true },
    picture: { type: String, required: true },
    price: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: productValidator.validatePrice,
            message: "Invalid price format, must be a number or an object { min: number, max: number }",
        },
    },
    description: { type: String, required: true },
    seller: { type: String, required: true },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        validate: {
            validator: productValidator.validateRating,
            message: "Invalid rating, must be a number between 0 and 5",
        }
    },
    reviews: {
        type: [{
            user: { type: String, required: true },
            rating: { type: Number, required: true, min: 0, max: 5 },
            comment: { type: String }
        }],
    },
});

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;