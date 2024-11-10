import { TActivity } from "@/features/advertiser/utils/advertiser-columns";
import { TItinerary } from "@/features/tour-guide/utils/tour-guide-columns";


export interface IOrder {
  _id: Types.ObjectId;
  userId: string;
  orderDate: Date;
  orderStatus: OrderStatus;
  paymentMethod: PaymentMethod;
  items: IItem[];
  totalPrice: number;
  totalQuantity: number;
  promoCode?: string;
  discountAmount?: number;
  billingAddress?: string;
  shippingAddress: string;
}
export interface IItem {
  name: string,
  price: number,
  quantity: number,
  seller: string,
  picture: string,
  productId: string,
  rating?:Partial<TRating>
}

export type TOrder = {
  _id: string;
  userId: string;
  createdAt: Date;
  orderStatus: OrderStatus;
  paymentMethod: PaymentMethod;
  items: IItem[];
  totalPrice: number;
  totalQuantity: number;
  promoCode?: string;
  discountAmount?: number;
  billingAddress?: string;
  shippingAddress: string;
}

export type TPopulatedBooking = {
  _id?: string;
  user: IUser;
  entity: TActivity | TItinerary;
  type: bookingType;
  status: TBookingStatus;
  selectedPrice: number;
  selectedDate: Date;
};

export type TBookingType = {
  user: string;
  entity: string;
  type: bookingType;
  status?: TBookingStatus;
  selectedPrice?: number;
  selectedDate?: Date;
};

interface CancellationRule {
  ruleDescription: string;
}
interface Vehicle {
  code: string;
  category: string;
  description: string;
  imageURL?: string;
  baggages?: { count: number }[];
  seats?: { count: number }[];
}

interface ServiceProvider {
  code: string;
  name: string;
  logoUrl?: string;
}

interface Quotation {
  monetaryAmount: string;
  currencyCode: string;
}
export interface TransportationData {
  data: {
    id: string;
    vehicle: Vehicle;
    serviceProvider: ServiceProvider;
    quotation: Quotation;
    cancellationRules: CancellationRule[];
  }[];
}

export interface TransferRequest {
  startLocationCode?: string;
  startGeoCode?: string;
  startAddressLine?: string;
  startCountryCode?: string;
  endLocationCode?: string;
  endGeoCode?: string;
  endAddressLine?: string;
  endCountryCode?: string;
  transferType: string;
  startDateTime: string;
  passengers: number;
}

interface IAutocompletePrediction {
  description: string;
  place_id: string;
  reference: string;
}

export interface IRating {
  userId: string;
  userName: string;
  rating: number;
  review?: string;
}

export type TRating={
  userId: string;
  userName: string;
  rating: number;
  review?: string;
}

export interface Itinerary {
  _id: string;
  name: string;
  description: string;
  activities: string[];
  locations: [{ longitude: number; latitude: number }];
  timeline: string;
  duarationOfActivities: string[];
  images: string[];
  languages: string[];
  price: number | { min: number; max: number };
  availableDatesTime: { Date: Date; Time: Date }[];
  accessibility: string;
  pickUpLocation: { longitude: number; latitude: number };
  dropOffLocation: { longitude: number; latitude: number };
  ratings?: IRating[];
  preferenceTags?: PreferenceTag[];
  category?: Category;
  owner: string;
}

export interface HistoricalPlace {
  _id: string;
  name: string;
  description: string;
  location: { longitude: number; latitude: number };
  openingHours: { open: string; close: string };
  price: { foreigner: number; native: number; student: number };
  images: string[];
  tags?: HistoricalTag[];
  ratings?: IRating[];
  preferenceTags?: PreferenceTag[];
  owner: string;
  category?: Category;
}

export interface Activity {
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
  ratings?: IRating[];
  owner: string;
}

export interface Category {
  _id: string;
  name: string;
}

export interface PreferenceTag {
  _id: string;
  name: string;
}

export interface HistoricalTag {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  picture: string; // changed from picture: string in the schema to pictures: string[]
  price: number;
  seller: string;
  ratings: IRating[];
}

export type SortOption =
  | "price-high-low"
  | "price-low-high"
  | "rating-high-low"
  | "rating-low-high";

export type Filter = "itinerary" | "place" | "activity";

export type TBookingStatus = "cancelled" | "completed" | "upcoming";

// Define interfaces for response structure
interface AirportData {
  type: string;
  subType: string;
  name: string;
  detailedName: string;
  timeZoneOffset: string;
  iataCode: string;
  geoCode: {
    latitude: number;
    longitude: number;
  };
  address: {
    cityName: string;
    cityCode: string;
    countryName: string;
    countryCode: string;
    regionCode: string;
  };
  distance: {
    value: number;
    unit: string;
  };
  analytics: {
    flights: {
      score: number;
    };
    travelers: {
      score: number;
    };
  };
  relevance: number;
}

export interface AirportResponse {
  meta: {
    count: number;
    links: {
      self: string;
    };
  };
  data: AirportData[];
}

export interface IPlaceDetails {
  location: {
    lat: number;
    lng: number;
  };
  description: string[];
  countryCode: string;
  name: string;
}

export interface FlightRequest {
  originDestinations: {
    originLocationCode: string;
    destinationLocationCode: string;
    departureDateTimeRange: {
      date: string;
      time?: string;
    };
  }[];
  travelers: {
    id: string;
    travelerType: string;
  }[];
  sources: string[];
  searchCriteria: {
    maxFlightOffers: number;
  };
}

export interface FlightData {
  meta: {
    count: number;
  };
  data: FlightOffer[];
  dictionaries: Dictionaries;
}

export interface Dictionaries {
  carriers: { [key: string]: string };
}

export interface FlightOffer {
  id: string;
  source: string;
  instantTicketingRequired: boolean;
  nonHomogeneous: boolean;
  oneWay: boolean;
  lastTicketingDate: string;
  numberOfBookableSeats: number;
  itineraries: {
    segments: {
      departure: {
        iataCode: string;
        at: string;
      };
      arrival: {
        iataCode: string;
        at: string;
      };
      carrierCode: string;
      number: string;
      aircraft: {
        code: string;
      };
      operating: {
        carrierCode: string;
      };
      duration: string;
    }[];
  }[];
  price: {
    currency: string;
    total: string;
  };
}

interface FlightOfferDisplay {
  id: string;
  airline: string;
  oneway: boolean;
  departure: {
    time: string;
    code: string;
    date: string;
  };
  arrival: {
    time: string;
    date: string;
    code: string;
  };
  price: {
    amount: number;
    currency: string;
  };
  duration: string;
  stops: Array<{
    code: string;
    time: string;
    duration: string;
  }>;
}

export interface IHotelDetails {
  name: string;
  address: {
    "@type": string;
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: {
      "@type": string;
      name: string;
    };
  };
  rating: {
    "@type": string;
    ratingValue: string;
    reviewCount: number;
  };
  mainImage: string;
  description: string;
  features: {
    propertyAmenities: { text: string; svg: string }[];
    roomFeatures: { text: string; svg: string }[];
    roomTypes: { text: string; svg: string }[];
  };
  averagePrice: string;
  images: string[];
  bubbleRating: string;
  ratings: { name: string; rate: number }[];
}

export interface HotelDetailsProps {
  hotels: IHotelDetails[];
}
