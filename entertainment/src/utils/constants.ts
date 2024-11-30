export const STATUS_CODES = {
  NOT_FOUND: 404,
  CREATED: 201,
  STATUS_OK: 200,
  BAD_REQUEST: 400,
  SERVER_ERROR: 500,
};

export const CONSTANTS = {
  MIN_RATING: 0,
  MAX_RATING: 5,
  ZERO: 0,
  MIN_LONGITUDE: -180,
  MAX_LONGITUDE: 180,
  MIN_LATITUDE: -90,
  MAX_LATITUDE: 90,
};

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

export const RABBITMQ = {
  QUEUE: {
    NOTIFICATION: "notification_queue",
    EVENT_REMINDER: "event_reminder_queue",
  },
};
