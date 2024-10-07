import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";
import { TItinerary } from "@/table-columns/tour-guide-columns";

// fetch data from the server
export const fetchItineraries = async () => {
  const response = await axios.get(SERVICES_URLS.ENTERTAINMENT + "/itineraries");
  return response.data;
};

// delete itinerary from itineraries endpoint
export const deleteItinerary = async (itinerary: TItinerary) => {
  console.log(itinerary);
  await axios.delete(`${SERVICES_URLS.ENTERTAINMENT}/itineraries/${itinerary._id}`);
};

// submit itinerary to the itineraries endpoint
export const submitItinerary = async (
  itineraryData: TItinerary | undefined,
  isNewItinerary: boolean,
) => {
  if (isNewItinerary) {
    await axios.post(SERVICES_URLS.ENTERTAINMENT + "/itineraries", itineraryData).then((response) => {
      console.log(response.data);
    });
  } else {
    if (itineraryData) {
      await axios.patch(
        `${SERVICES_URLS.ENTERTAINMENT}/itineraries/${itineraryData._id}`,
        itineraryData,
      );
    }
  }
};