export interface IBooking {
  user: string;
  entity: string;
  type: bookingType;
  status?: bookingStatus;
}

export type TBookingType{
  user: string;
  entity: string;
  type: bookingType;
  status?: bookingStatus;
}


export interface IRating {
  userId: string;
  rating: number;
  review?: string;
}

export interface Itinerary {
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

export interface HistoricalPlace {
  _id: string;
  name: string;
  description: string;
  location: { longitude: number; latitude: number };
  openingHours: { open: string; close: string };
  price: { foreigner: number; native: number; student: number };
  images: string[];
  tags?: HistoricalTag[];
  ratings?: IRating[];
  preferenceTags?: PreferenceTag[];
  owner: string;
  category?: Category;
}

export interface Activity {
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

export interface Category {
  _id: string;
  name: string;
}

export interface PreferenceTag {
  _id: string;
  name: string;
}

export interface HistoricalTag {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  pictures: string[]; // changed from picture: string in the schema to pictures: string[]
  price: number;
  seller: string;
  ratings: IRating[];
}

export type SortOption =
  | "price-high-low"
  | "price-low-high"
  | "rating-high-low"
  | "rating-low-high";

export type Filter = "itinerary" | "place" | "activity";
