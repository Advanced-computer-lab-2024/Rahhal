import type { z } from "zod";
import type { RatingSchema } from "@/utils/zod-schemas";
import type { ObjectId } from "mongoose";

export interface IPayload{
  id:ObjectId,
  username:string,
  password:string,
  otp?:string,
  role:string,
  dob?:Date
}


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

export enum bookmarkType {
  Activity = "activity",
  Itinerary = "itinerary",
  HistoricalPlace = "historicalPlace",
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
  _id: string;
  user: string;
  entity: string;
  type: bookingType;
  status?: bookingStatus;
  selectedPrice?: number;
  discount?: number;
  selectedDate?: Date;
  rating?: number;
  itineraryTourGuideRating?: number;
}

export interface IBookingQueryParamsFilter {
  _id: string;
  user: string;
  entity: string;
  type: bookingType;
  status?: bookingStatus;
  selectedPrice?: number;
  selectedDate?: Date;
  owner: string;
}

export interface IBookmarkQueryParamsFilter {
  _id: string;
  user: string;
  entity: string;
  type?: bookmarkType;
}

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
export interface PopulatedBooking {
  _id: string;
  user: IUser;
  entity: IActivity | IItinerary | string;
  type: bookingType;
  status: bookingStatus;
  selectedPrice: number;
  discount?: number;
  selectedDate?: Date;
  rating?: number;
  itineraryTourGuideRating?: number;
}

export interface PopulatedBookmark {
  _id: string;
  user: string;
  entity: IActivity | IItinerary | string;
  type: bookmarkType;
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

export interface TransferRequest {
  startLocationCode?: string;
  startGeoCode?: string;
  startAddressLine?: string;
  startCountryCode?: string;
  endLocationCode?: string;
  endGeoCode?: string;
  endAddressLine?: string;
  endCountryCode?: string;
  transferType: string;
  startDateTime: string;
  passengers: number;
}

export interface OrderQueryParams {
  userId?: string;
  orderStatus?: OrderStatus;
  seller?: string;
  productId?: string;
}

export interface OrderDateRangeFilter {
  startDate: Date;
  endDate: Date;
  productId?: string;
}

export interface BookingDateRangeFilter {
  startDate: Date;
  endDate: Date;
  entity?: string;
  owner?: string;
  type?: string;
  status?: string;
}

export enum OrderStatus {
  received = "received",
  processing = "processing",
  shipped = "shipped",
  delivered = "delivered",
  cancelled = "cancelled",
}

export interface IRating {
  userId: string;
  userName: string;
  rating: number;
  review?: string;
}

export interface IBookmark {
  _id: string;
  user: string;
  entity: string;
  type: bookmarkType;
}

export interface INotifyRequest {
  _id: string;
  user: string;
  entity: string;
}

export interface IWishlist {
  _id: string;
  user: string;
  product: string;
}

export interface PopulatedWishlist {
  _id: string;
  user: string;
  product: IProduct;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface ICart {
  _id: string;
  user: string;
  products: CartItem[];
}

export interface PopulatedCart {
  _id: string;
  user: string;
  products: IPopulatedCartItem[];
}

interface IPopulatedCartItem {
  product: IProduct;
  quantity: number;
}

export enum CartUpdates {
  EmptyCart = "emptyCart",
  IncrementQuantity = "incrementQuantity",
  DecrementQuantity = "decrementQuantity",
}
