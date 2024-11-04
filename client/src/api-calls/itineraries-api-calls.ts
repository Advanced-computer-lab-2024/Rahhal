import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";
import { TItinerary } from "@/features/tour-guide/utils/tour-guide-columns";
import { TNewItinerary } from "@/features/tour-guide/utils/tour-guide-columns";
import { renameItineraryImage } from "@/features/tour-guide/utils/tour-guide-firebase";

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
export async function updateItinerary(itineraryData: TItinerary, itineraryImages: FileList | null) {
  const urls: string[] = [];
  if (itineraryImages) {
    itineraryImages = renameItineraryImage(itineraryImages, itineraryData.owner, itineraryData._id);
    for (let i = 0; i < itineraryImages!.length; i++) {
      const formData = new FormData();
      formData.append("image" + i, itineraryImages![i]);
      const response = await axios.post(SERVICES_URLS.FIREBASE + "/upload-multiple-files", formData);
      urls.push((response.data as string[])[0]);
    }
  }
  itineraryData.images = [...itineraryData.images, ...urls];

  await axios.patch(
    `${SERVICES_URLS.ENTERTAINMENT}/itineraries/${itineraryData!._id}`,
    itineraryData,
  );
  alert("Itinerary updated successfully");
  window.location.reload();
}

export async function createItinerary(newItineraryData: TNewItinerary, userId: string, itineraryImages: FileList | null) {
  newItineraryData.owner = userId;
  const response = await axios.post(SERVICES_URLS.ENTERTAINMENT + "/itineraries", newItineraryData);
  const itineraryId = (response.data as TItinerary)._id;
  const urls: string[] = [];

  if (itineraryImages) {
    itineraryImages = renameItineraryImage(itineraryImages, userId, itineraryId);
    for (let i = 0; i < itineraryImages!.length; i++) {
      const formData = new FormData();
      formData.append("image" + i, itineraryImages![i]);
      const response = await axios.post(SERVICES_URLS.FIREBASE + "/upload-multiple-files", formData);
      urls.push((response.data as string[])[0]);
    }
  }
  newItineraryData.images = urls;

  await axios.patch(`${SERVICES_URLS.ENTERTAINMENT}/itineraries/${itineraryId}`, newItineraryData);

  alert("Itinerary created successfully");
  window.location.reload();
}
