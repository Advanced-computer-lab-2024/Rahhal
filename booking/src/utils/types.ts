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

export interface IBooking {
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

export enum bookmarkType {
  Activity = "activity",
  Itinerary = "itinerary",
  HistoricalPlace = "historical-place",
}

export interface IBookmark {
  user: string;
  entity: string;
  type: bookmarkType;
}

export interface INotifyRequest {
  user: string;
  entity: string;
}
