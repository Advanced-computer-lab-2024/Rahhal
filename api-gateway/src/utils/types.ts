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

export interface IRating {
  userId: string;
  rating: number;
  review?: string;
}

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
  selectedDate?: Date;
}

export interface PopulatedBooking {
  _id: string;
  user: IUser;
  entity: IActivity | IItinerary;
  type: bookingType;
  status: bookingStatus;
  selectedPrice: number;
  selectedDate?: Date;
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
  ratings?: IRating[];
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
  ratings?: IRating[];
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
