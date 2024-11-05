import type { z } from "zod";
import type { RatingSchema } from "@/utils/zod-schemas";

export enum RateableEntityType {
  ACTIVITY = "activity",
  ITINERARY = "itinerary",
  PRODUCT = "product",
  USER = "user",
}

export enum bookingType {
  Activity = "activity",
  Itinerary = "itinerary",
  Flight = "flight",
  Hotel = "hotel",
  Transportation = "transportation",
}

export enum bookingStatus {
  Upcoming = "upcoming",
  Completed = "completed",
  Cancelled = "cancelled",
}

// ---------------- ZOD RELATED -----------------
// TODO: To be moved later in a sperate types file
export type TRating = z.infer<typeof RatingSchema>;
// ----------------------------------------------

export interface Category {
  _id: string;
  name: string;
}

export interface PreferenceTag {
  _id: string;
  name: string;
}

export interface IBooking {
  user: string;
  entity: string;
  type: bookingType;
  status?: bookingStatus;
}

export interface PopulatedBooking {
  user: IUser;
  entity: IActivity | IItinerary;
  type: bookingType;
  status: bookingStatus;
}

export interface IItinerary {
  _id: string;
  name: string;
  description: string;
  activities: string[];
  locations: [{ longitude: number; latitude: number }];
  timeline: string;
  duarationOfActivities: string[];
  images: string[];
  languages: string[];
  price: number | { min: number; max: number };
  availableDatesTime: { Date: Date; Time: Date }[];
  accessibility: string;
  pickUpLocation: { longitude: number; latitude: number };
  dropOffLocation: { longitude: number; latitude: number };
  ratings?: TRating[];
  preferenceTags?: PreferenceTag[];
  category?: Category;
  owner: string;
}

export interface IActivity {
  _id: string;
  name: string;
  description: string;
  date: Date;
  time: Date;
  images: string[];
  location: { longitude: number; latitude: number };
  price: number | { type: string; price: number }[];
  category?: Category;
  tags?: string[];
  specialDiscounts?: number;
  isBookingOpen: boolean;
  preferenceTags?: PreferenceTag[];
  ratings?: TRating[];
  owner: string;
}

export interface IUser {
  _id?: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  dob?: Date;
  nationality?: string;
  phoneNumber?: string;
}
