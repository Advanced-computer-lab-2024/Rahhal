import { SERVICES_URLS } from "@/lib/constants";
import { THistoricalTag } from "@/table-columns/historical-tags-columns";
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
    try {
      const response = await axios.post(SERVICES_URLS.ENTERTAINMENT + "/historical-tags", tagData);
      console.log(response.data);
      alert("Historical Tag created successfully");
      window.location.reload();
    } catch (error) {
      console.log(tagData);
    }
  } else {
    if (tagData) {
      await axios.patch(`${SERVICES_URLS.ENTERTAINMENT}/historical-tags/${tagData._id}`, tagData);
      alert("Historical Tag updated successfully");
      window.location.reload();
    }
  }
};
