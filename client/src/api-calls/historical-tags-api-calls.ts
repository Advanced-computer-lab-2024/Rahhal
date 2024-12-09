import { SERVICES_URLS } from "@/lib/constants";
import { THistoricalTag } from "@/features/tourism-governor/utils/historical-tags-columns";
import axios from "axios";

export const fetchHistoricalTags = async () => {
  const response = await axios.get(SERVICES_URLS.ENTERTAINMENT + "/historical-tags");
  return response.data;
};

export const fetchUserHistoricalTags = async () => {
  const response = await axios.get(SERVICES_URLS.ENTERTAINMENT + `/historical-tags`);
  return response.data;
};

export const submitHistoricalTags = async (
  tagData: THistoricalTag | undefined,
  isNewHistoricalTag: boolean,
) => {
  if (isNewHistoricalTag) {
    const response = await axios.post(SERVICES_URLS.ENTERTAINMENT + "/historical-tags", tagData);
    return response;
  } else {
    if (tagData) {
      const response = await axios.patch(`${SERVICES_URLS.ENTERTAINMENT}/historical-tags/${tagData._id}`, tagData);
      return response;
    }
  }
};
