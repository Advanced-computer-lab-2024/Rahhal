import { SERVICES_URLS } from "@/lib/constants";
import axios from "axios";

export const fetchPreferenceTags = async () => {
  const response = await axios.get(SERVICES_URLS.ENTERTAINMENT + "/preference-tags");
  return response.data;
};
