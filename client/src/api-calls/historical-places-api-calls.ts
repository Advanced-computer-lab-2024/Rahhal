import { SERVICES_URLS } from "@/lib/constants";
import axios from "axios";

export const fetchHistoricalPlaces = async () => {
  const response = await axios.get(SERVICES_URLS.ENTERTAINMENT + "/historical-places");
  return response.data;
};
