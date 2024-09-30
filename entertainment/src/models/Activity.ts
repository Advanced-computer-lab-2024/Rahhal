import mongoose from 'mongoose';
import { CONSTANTS } from '../utils/constants';


// Define the schema for the activities collection
export interface IActivity {
    name: string;
    date: Date;
    time: Date;
    location: {longitude: number, latitude: number};    
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
  date: { type: Date, required: true },
  time: { type: Date, required: true },
  location: {
    type: {
        longitude: { type: Number, required: true },
        latitude: { type: Number, required: true }
    },
    required: true,
   
  },
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


// Validate price format to be a number or an object { min: number, max: number } and to be greater than or equal to 0
function validatePrice(price: number | { min: number; max: number }) {
    if (typeof price === 'number') {
        return price >= 0;
    } else if (typeof price === 'object') {
        return price.min >= 0 && price.max > price.min;
    }
    return false;
}


// Validate rating format to be a number between 0 and 5
function validateRating(rating: number) {
    return rating >= CONSTANTS.MIN_RATING && rating <= CONSTANTS.MAX_RATING;
}

const Activity = mongoose.model<IActivity>('Activity', activitySchema);

export default Activity;
