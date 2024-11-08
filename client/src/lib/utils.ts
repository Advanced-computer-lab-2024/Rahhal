import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Dictionaries, FlightOffer, FlightOfferDisplay } from "@/features/home/types/home-page-types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// sample images for the picture card
export const IMAGES = [
  "src/assets/farmhouse-main.jpeg",
  "src/assets/farmhouse-zoom.jpeg",
  "src/assets/farmhouse-room.jpeg",
];

// sample reviews for the review display
export const sampleReviews = [
  { userId: "44", userName: "John Doe", rating: 4, review: "Great product, highly recommend!" },
  { userId: "44", userName: "Jane Smith", rating: 5, review: "Exceeded my expectations." },
  { userId: "44", userName: "Bob Johnson", rating: 3 },
];

export const calculateAge = (dob: Date) => {
  const dobDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - dobDate.getFullYear();
  const monthDiff = today.getMonth() - dobDate.getMonth();

  return monthDiff < 0 ? --age : age;
};

export function parseDateTime(dateTimeString: string): { date: string; time: string } {
  const date = new Date(dateTimeString);

  // Format date as YYYY-MM-DD
  const formattedDate = date.toISOString().split('T')[0];

  // Format time as HH:MM
  const formattedTime = date.toTimeString().slice(0, 5);

  return {
    date: formattedDate,
    time: formattedTime,
  };
}

export function formatDuration(durationString: string): string {
  const match = durationString.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);

  const hours = match?.[1] ? `${match[1]}H` : "";
  const minutes = match?.[2] ? `${match[2]}M` : "";

  return [hours, minutes].filter(Boolean).join(" ");
}

export function parseFlightOfferData(rawOffer: FlightOffer, dictionaries: Dictionaries):FlightOfferDisplay {
  const { id, oneWay, price, itineraries } = rawOffer;

  const firstItinerary = itineraries[0];
  const segments = firstItinerary.segments;

  const airline = dictionaries.carriers[segments[0].carrierCode];

  const departureSegment = segments[0];
  const arrivalSegment = segments[segments.length - 1];

  let parsedDateTime = parseDateTime(departureSegment.departure.at);
  const departure = {
    time: parsedDateTime.time,
    code: departureSegment.departure.iataCode,
    date: parsedDateTime.date,
  };

  parsedDateTime = parseDateTime(arrivalSegment.arrival.at);
  const arrival = {
    time: parsedDateTime.time,
    code: arrivalSegment.arrival.iataCode,
    date: parsedDateTime.date,
  };

  // Calculate the duration and stops
  const duration = segments.reduce((totalDuration) => {
    return formatDuration(totalDuration);
  }, formatDuration(arrivalSegment.duration));

  const stops = segments.slice(0, -1).map(segment => ({
    code: segment.arrival.iataCode,
    time: segment.arrival.at,
    duration: formatDuration(segment.duration),
  }));

  return {
    id,
    airline,
    oneway: oneWay,
    departure,
    arrival,
    price: {
      amount: parseFloat(price.total),
      currency: price.currency,
    },
    duration,
    stops,
  };
}
