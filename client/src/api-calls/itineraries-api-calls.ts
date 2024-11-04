import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";
import { TItinerary } from "@/features/tour-guide/utils/tour-guide-columns";
import { TNewItinerary } from "@/features/tour-guide/utils/tour-guide-columns";

// fetch data from the server
export const fetchItineraries = async () => {
  const response = await axios.get(SERVICES_URLS.ENTERTAINMENT + "/itineraries");
  return response.data;
};

// fetch only active-appropriate itineraries
export const fetchActiveAppropriateItineraries = async () => {
  const response = await axios.get(SERVICES_URLS.ENTERTAINMENT + "/itineraries/active-appropriate");
  return response.data;
};

// delete itinerary from itineraries endpoint
export const deleteItinerary = async (itinerary: TItinerary) => {
  console.log(itinerary);
  await axios.delete(`${SERVICES_URLS.ENTERTAINMENT}/itineraries/${itinerary._id}`);
  alert("Itinerary deleted successfully");
  window.location.reload();
};

// submit itinerary to the itineraries endpoint
export async function updateItinerary(itineraryData: TItinerary) {
  await axios.patch(
    `${SERVICES_URLS.ENTERTAINMENT}/itineraries/${itineraryData!._id}`,
    itineraryData,
  );
  alert("Itinerary updated successfully");
  window.location.reload();
}

export async function createItinerary(newItineraryData: TNewItinerary, userId: string) {
  newItineraryData.owner = userId;
  await axios.post(SERVICES_URLS.ENTERTAINMENT + "/itineraries", newItineraryData);
  alert("Itinerary created successfully");
  window.location.reload();
}
