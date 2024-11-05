import type { IItinerary } from "../database/models/Itinerary";
import type { IRating } from "@/database/shared";
import * as itinerariesRepository from "../database/repositories/itineraries-repository";
import { hasBookings } from "@/utils/booking-axios-instance";

// Get all itineraries
export async function getAllItineraries() {
  return itinerariesRepository.getAllItineraries();
}

//Get all active & appropriate itineraries
export async function getActiveAppropriateItineraries() {
  return itinerariesRepository.getActiveAppropriateItineraries();
}

// Get an itinerary by id
export async function getItineraryById(id: string) {
  return itinerariesRepository.getItineraryById(id);
}

// Create a new itinerary
export async function createItinerary(itineraryData: IItinerary) {
  return itinerariesRepository.createItinerary(itineraryData);
}

// Update an existing itinerary
export async function updateItinerary(id: string, itineraryData: IItinerary) {
  return itinerariesRepository.updateItinerary(id, itineraryData);
}

// Delete an itinerary
export async function deleteItinerary(id: string) {
  const isBooked = await hasBookings(id);
  if(isBooked) {
    throw new Error("Cannot delete itinerary with bookings");
  }
  else{
    return itinerariesRepository.deleteItinerary(id);
  }
}

export async function addRating(userRating: IRating, itineraryId: string) {
  return itinerariesRepository.addRating(userRating, itineraryId);
}
