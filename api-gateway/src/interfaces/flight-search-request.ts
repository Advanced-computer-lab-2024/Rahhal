// export interface FlightSearchRequest {
//   originLocationCode: string;  // IATA code for departure airport
//   destinationLocationCode: string;  // IATA code for arrival airport
//   departureDate: string;  // Format: 'YYYY-MM-DD'
//   adults: number;  // Number of adult travelers

//   // Optional fields
//   returnDate?: string;  // Return date if it’s a round-trip
//   children?: number;  // Number of children travelers
//   infants?: number;  // Number of infants (below 2 years old)
//   travelClass?: "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST";  // Class of travel
//   currencyCode?: string;  // Currency for the price display (e.g., 'USD')
//   nonStop?: boolean;  // Set to true for direct flights only
//   max?: number;  // Max number of flight options to return
//   includedAirlineCodes?: string[];  // List of airline codes to include
//   excludedAirlineCodes?: string[];  // List of airline codes to exclude
//   oneWay?: boolean;  // Set to true for one-way flights
// }

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
