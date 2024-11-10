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
  selectedDate?: Date;
  isRated?: number;
}
