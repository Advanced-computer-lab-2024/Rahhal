import { SERVICES_URLS } from "@/lib/constants";
import axios from "axios";

// fetch preference tags from preference-tags endpoint
export const fetchPreferenceTags = async () => {
  const response = await axios.get(SERVICES_URLS.ENTERTAINMENT + "/preference-tags");
  return response.data;
};
