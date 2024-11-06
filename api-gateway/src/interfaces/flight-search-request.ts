export interface FlightSearchRequest {
  currencyCode: string;
  originDestinations: OriginDestination[];
  travelers: Traveler[];
  sources?: string[];  // e.g., "GDS"
  searchCriteria?: SearchCriteria;
}

interface OriginDestination {
  id: string;
  originLocationCode: string;  // IATA code for origin, e.g., "NYC"
  destinationLocationCode: string;  // IATA code for destination, e.g., "MAD"
  departureDateTimeRange: DateTimeRange;
}

interface DateTimeRange {
  date: string;  // Format: YYYY-MM-DD
  time?: string;  // Format: HH:MM:SS, optional
}

interface Traveler {
  id: string;
  travelerType: "ADULT" | "CHILD" | "SENIOR";  // Define different traveler types if needed
}

interface SearchCriteria {
  maxFlightOffers?: number;
  flightFilters?: FlightFilters;
}

interface FlightFilters {
  cabinRestrictions?: CabinRestriction[];
}

interface CabinRestriction {
  cabin: "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST";
  coverage: "ALL_SEGMENTS" | "MOST_SEGMENTS";
  originDestinationIds: string[];  // Array of IDs corresponding to `originDestinations`
}
