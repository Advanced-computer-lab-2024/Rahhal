import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";
import { TItinerary } from "@/features/tour-guide/utils/tour-guide-columns";
import { TNewItinerary } from "@/features/tour-guide/utils/tour-guide-columns";
import { renameItineraryImage } from "@/features/tour-guide/utils/tour-guide-firebase";
import { uploadToFirebase } from "@/utils/firebase";

// fetch data from the server
export const fetchItineraries = async () => {
  const response = await axios.get(SERVICES_URLS.ENTERTAINMENT + "/itineraries" , {
    withCredentials: true, 
  });
  return response.data;
};

// fetch itinerary by id
export const fetchItineraryById = async (itineraryId: string) => {
  const response = await axios.get(SERVICES_URLS.ENTERTAINMENT + `/itineraries/${itineraryId}`);
  return response.data;
};

// fetch only active-appropriate itineraries
export const fetchActiveAppropriateItineraries = async () => {
  const response = await axios.get(SERVICES_URLS.ENTERTAINMENT + "/itineraries/active-appropriate" , {
    withCredentials: true, 
  });
  return response.data;
};

export const fetchUserItineraries = async (userId: string) => {
  const response = await axios.get(SERVICES_URLS.USER + `/users/${userId}/itineraries` , {
    withCredentials: true, 
  });
  return response.data;
};

export const fetchItinerariesByOwner = async (ownerId: string) => {
  const response = await axios.get(SERVICES_URLS.ENTERTAINMENT + `/itineraries/`, {
    params: {
      ownerId: ownerId,
    },
  });
  return response.data;
};

// delete itinerary from itineraries endpoint
export const deleteItinerary = async (itinerary: TItinerary) => {
  console.log(itinerary);
  const response = await axios.delete(
    `${SERVICES_URLS.ENTERTAINMENT}/itineraries/${itinerary._id}`,
  );
  return response;
};

// submit itinerary to the itineraries endpoint
export async function updateItinerary(itineraryData: TItinerary, itineraryImages: FileList | null) {
  const urls: string[] = await uploadToFirebase(
    itineraryImages,
    itineraryData.owner,
    itineraryData._id,
    renameItineraryImage,
  );

  itineraryData.images = [...itineraryData.images, ...urls];

  const response = await axios.patch(
    `${SERVICES_URLS.ENTERTAINMENT}/itineraries/${itineraryData!._id}`,
    itineraryData,
  );
  return response;
}

export async function createItinerary(
  newItineraryData: TNewItinerary,
  userId: string,
  username: string,
  itineraryImages: FileList | null,
) {
  newItineraryData.owner = userId;
  newItineraryData.ownerName = username;
  const response = await axios.post(SERVICES_URLS.ENTERTAINMENT + "/itineraries", newItineraryData);
  const itineraryId = (response.data as TItinerary)._id;
  const urls: string[] = await uploadToFirebase(
    itineraryImages,
    userId,
    itineraryId,
    renameItineraryImage,
  );

  newItineraryData.images = urls;

  await axios.patch(`${SERVICES_URLS.ENTERTAINMENT}/itineraries/${itineraryId}`, newItineraryData);
}
