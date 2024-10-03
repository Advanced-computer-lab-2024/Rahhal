import type { IItinerary } from "../database/models/Itinerary";
import * as itinerariesRepository from "../database/repositories/itineraries-repository";

// Get all itineraries
export async function getAllItineraries() {
  return itinerariesRepository.getAllItineraries();
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
  return itinerariesRepository.deleteItinerary(id);
}
