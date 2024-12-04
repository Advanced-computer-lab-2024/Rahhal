export interface INotification {
  userId: string;
  email: string;
  message: string;
  seen?: boolean;
  createdAt?: Date;
};

export interface IUser {
  _id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string
  dob?: Date;
  nationality?: string;
  phoneNumber?: string;
};

export interface IBooking {
  user: string;
  entity: string;
  type: bookingType;
  status?: bookingStatus;
  selectedPrice?: number;
  selectedDate?: Date;
  rating?: number;
  itineraryTourGuideRating?: number;
};

export enum bookingType {
  Activity = "activity",
  Itinerary = "itinerary",
  Flight = "flight",
  Hotel = "hotel",
  Transportation = "transportation",
};

export enum bookingStatus {
  Upcoming = "upcoming",
  Completed = "completed",
  Cancelled = "cancelled",
};

export interface IActivity {
  _id: string;
  name: string; 
}

export interface IItinerary {
  _id: string;
  name: string;
}
export interface INotifyRequest {
  user: string;
  entity: string;
};
