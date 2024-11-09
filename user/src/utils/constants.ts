export const STATUS_CODES = {
  NOT_FOUND: 404,
  CONFLICT: 409,
  BAD_REQUEST: 400,
  CREATED: 201,
  STATUS_OK: 200,
  SERVER_ERROR: 500,
  UNPROCESSABLE_ENTITY: 422,
};

export const POINTS = {
  LEVEL1MAXPOINTS: 100000,
  LEVEL1POINTRATE: 0.5,
  LEVEL2MAXPOINTS: 500000,
  LEVEL2POINTRATE: 1,
  LEVEL3POINTRATE: 1.5,
  MINPOINTS: 10000,
  AMOUNTFORMINPOINTS: 100,
};

export const LEVELS = {
  LEVEL1: 1,
  LEVEL2: 2,
  LEVEL3: 3,
};

export const MIN_LENGTH = 0;

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
