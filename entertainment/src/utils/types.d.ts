export interface PopulatedBooking {
  _id: string;
  user: IUser;
  entity: IActivity | IItinerary;
  type: bookingType;
  status: bookingStatus;
  selectedPrice: number;
  selectedDate?: Date;
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
