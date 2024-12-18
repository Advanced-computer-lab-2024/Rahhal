export enum UserRoleEnum {
  admin = "admin",
  tourist = "tourist",
  tourGuide = "tourGuide",
  advertiser = "advertiser",
  seller = "seller",
  tourismGovernor = "tourismGovernor",
}

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

export enum RateableEntityType {
  ACTIVITY = "activity",
  ITINERARY = "itinerary",
  PRODUCT = "product",
  USER = "user",
}

export enum OrderStatus {
  received = "received",
  processing = "processing",
  shipped = "shipped",
  delivered = "delivered",
  cancelled = "cancelled",
}

export enum PaymentMethod {
  wallet = "wallet",
  creditCard = "creditCard",
  cash = "cash",
}

export enum bookmarkType {
  Activity = "activity",
  Itinerary = "itinerary",
  HistoricalPlace = "historicalPlace",
}
