export type TRating = {
  userId: string;
  userName: string;
  rating: number;
  review?: string;
};

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
  ratings?: TRating[];
  preferenceTags?: PreferenceTag[];
  category?: Category;
  owner: string;
  deleted: boolean;
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
  deleted: boolean;
}

export interface IProduct {
  _id: string
  name: string;
  picture: string;
  price: number;
  description: string;
  seller: string;
  sellerName: string;
  ratings: IRating[];
  quantity: number;
  archived: boolean;
  reviews: { user: string; rating: number; comment: string }[];
  deleted:boolean;
}