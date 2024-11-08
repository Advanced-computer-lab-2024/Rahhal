import { entertainmentAxiosInstance } from "@/utils/axios-instances";
import type { TRating } from "@/utils/types";

export async function getAllItineraries() {
  return await entertainmentAxiosInstance.get("/itineraries");
}

export async function getActiveAppropriateItineraries() {
  return entertainmentAxiosInstance.get("/itineraries/active-appropriate");
}

export async function getItineraryById(id: string) {
  return await entertainmentAxiosInstance.get(`/itineraries/${id}`);
}

export async function getItineraryByOwnerId(ownerId: string) {
  return await entertainmentAxiosInstance.get(`/itineraries`, {
    params: {
      ownerId: ownerId,
    },
  });
}

export async function createItinerary(body: string) {
  return await entertainmentAxiosInstance.post("/itineraries", body);
}

export async function addItineraryRating(itineraryId: string, rating: TRating) {
  return await entertainmentAxiosInstance.post(`/itineraries/${itineraryId}/ratings`, rating);
}

export async function updateItinerary(id: string, body: string) {
  return await entertainmentAxiosInstance.patch(`/itineraries/${id}`, body);
}

export async function deleteItinerary(id: string) {
  return await entertainmentAxiosInstance.delete(`/itineraries/${id}`);
}
