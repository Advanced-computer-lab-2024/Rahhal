import mongoose, { Types } from "mongoose";
import cartValidators from "@/validators/cart-validators"; 

const CartSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true,
        immutable: true,
    },
    products: [
        {
            productId: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                validate : cartValidators.validateQuantity
            }
        }
    ]

});

export default mongoose.model("Cart", CartSchema);

