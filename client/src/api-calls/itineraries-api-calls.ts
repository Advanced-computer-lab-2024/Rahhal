import { SERVICES_URLS } from "@/lib/constants";
import axios from "axios";

export const fetchItineraries = async () => {
  const response = await axios.get(SERVICES_URLS.ENTERTAINMENT + "/itineraries");
  return response.data;
};