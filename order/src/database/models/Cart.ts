import mongoose, { Types } from "mongoose";

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
            }
        }
    ]

});

export default mongoose.model("Cart", CartSchema);

