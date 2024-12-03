import type { IItinerary } from "../database/models/Itinerary";
import type { IRating } from "@/database/shared";
import * as itinerariesRepository from "../database/repositories/itineraries-repository";
import { hasBookings } from "@/utils/booking-axios-instance";
import { bookingType } from "@/utils/constants";
import { publishNotification } from "@/publishers/notification-publisher";

// Get all itineraries
export async function getAllItineraries(filter: Partial<IItinerary> = {}) {
  return itinerariesRepository.getAllItineraries(filter);
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
  if (itineraryData.appropriate === false) {
    await sendMarkedInappropriateNotification(id);
  }
  return itinerariesRepository.updateItinerary(id, itineraryData);
}

// Delete an itinerary
export async function deleteItinerary(id: string) {
  const isBooked = await hasBookings(id, bookingType.Itinerary);
  if (isBooked) {
    throw new Error("Cannot delete itinerary with bookings");
  } else {
    return itinerariesRepository.deleteItinerary(id);
  }
}

export async function addRating(userRating: IRating, itineraryId: string) {
  return itinerariesRepository.addRating(userRating, itineraryId);
}

export async function sendMarkedInappropriateNotification(itineraryId: string) {
  const Itinerary = await itinerariesRepository.getItineraryById(itineraryId);
  if (Itinerary) {
    const data = {
      userId: Itinerary.owner,
      message: `Your Itinerary : \n Name: ${Itinerary.name} \nhas been marked inappropriate \nPlease review and take necessary action.`,
    };

    await publishNotification(data);
  } else {
    throw new Error("Itinerary not found");
  }
}
