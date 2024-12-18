import mongoose from "mongoose";

const promocodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        validator: {
            validate: (v: string) => {
                return v.trim().length > 0;
            },
            message: "Invalid code",
        },
    },
    type: {
        type: String,
        enum: ['percentage', 'shipping'],
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
    value: {
        type: Number,
        required: true,
        default: 0,
    },
    uses: {
        type: Number,
        default: 1,
    }
});

const promocodeUsageSchema = new mongoose.Schema({
    promocode: {
        type: String,
        ref: "Promocode",
        required: true,
    },
    usedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    usedAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    }
});

export default mongoose.model("Promocode", promocodeSchema);
export const PromocodeUsage = mongoose.model("UsedPromocode", promocodeUsageSchema);
