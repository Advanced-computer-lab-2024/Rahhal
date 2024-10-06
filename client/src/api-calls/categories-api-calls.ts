import { SERVICES_URLS } from "@/lib/constants";
import axios from "axios";

// fetch available categories from categories endpoint
export const fetchCategories = async () => {
  const response = await axios.get(SERVICES_URLS.ENTERTAINMENT + "/categories");
  return response.data;
};
