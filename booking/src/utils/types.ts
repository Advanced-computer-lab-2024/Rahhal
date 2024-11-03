export enum bookingType {
  Activity = "activity",
  Itinerary = "itinerary",
  Flight = "flight",
  Hotel = "hotel",
  Transfer = "transfer",
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
  date?: Date;
  status?: string;
}
