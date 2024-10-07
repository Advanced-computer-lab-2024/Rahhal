import { SERVICES_URLS } from "@/lib/constants";
import axios from "axios";

export const fetchHistoricalTags = async () => {
  const response = await axios.get(SERVICES_URLS.ENTERTAINMENT + "/historical-tags");
  return response.data;
};
