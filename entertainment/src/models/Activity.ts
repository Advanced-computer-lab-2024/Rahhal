import mongoose from 'mongoose';


// Define the schema for the activities collection
export interface IActivity {
    name: string;
    date: string;
    time: string;
    location: [number, number];
    price: number | { min: number; max: number };
    category: string;
    tags: string[];
    specialDiscounts: string[];
    isBookingOpen: boolean;
    preferenceTags: string[];
    ratings: number[];
    }



const activitySchema = new mongoose.Schema<IActivity>({
  name: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: [Number], required: true , validate: {
        validator: validateLocation,
        message: 'Invalid location format, must be [longitude, latitude]'
    }},
   price: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    validate: {
        validator: validatePrice,
        message: 'Invalid price format, must be a number or an object { min: number, max: number }'
    }
  },
  category: { type: String, required: true },
  tags : { type: [String], required: true },
  specialDiscounts: { type: [String], required: true },
  isBookingOpen: { type: Boolean, required: true },
  preferenceTags: { type: [String], required: true },
  ratings: { type: [Number], required: true, validate: {
        validator: validateRating,
        message: 'Invalid rating format, must be a number between 0 and 5'
    }},
    
    
});


// Validators

// Validate location format to be [longitude, latitude]
function validateLocation(v: Array<number>) {
    return Array.isArray(v) && v.length === 2 && v.every(e => typeof e === 'number');
}


// Validate price format to be a number or an object { min: number, max: number } and to be greater than or equal to 0
function validatePrice(v: number | { min: number; max: number }) {
    if (typeof v === 'number') {
        return v >= 0;
    } else if (typeof v === 'object') {
        return v.min >= 0 && v.max > v.min;
    }
    return false;
}


// Validate rating format to be a number between 0 and 5
function validateRating(v: number) {
    return v >= 0 && v <= 5;
}

const Activity = mongoose.model<IActivity>('Activity', activitySchema);

export default Activity;
