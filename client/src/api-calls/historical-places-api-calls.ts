import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";
import { THistoricalPlace, TNewHistoricalPlace } from "@/table-columns/tourism-governor-columns";

export async function fetchHistoricalPlaces() {
  const response = await axios.get(SERVICES_URLS.ENTERTAINMENT + "/historical-places");
  return response.data;
}

//TODO - later it should be by owner and some other type of handling
export const fetchUserHistoricalPlaces = async (userId: string) => {
  const response = await axios.get(SERVICES_URLS.USER + `/users/${userId}/historical-places`);
  return response.data;
};

export async function deleteHistoricalPlace(historicalPlace: THistoricalPlace) {
  console.log(historicalPlace);
  await axios.delete(`${SERVICES_URLS.ENTERTAINMENT}/historical-places/${historicalPlace._id}`);
}

export async function updateHistoricalPlace(historicalPlaceData: THistoricalPlace) {
  await axios.patch(
    `${SERVICES_URLS.ENTERTAINMENT}/historical-places/${historicalPlaceData!._id}`,
    historicalPlaceData,
  );
}

export async function createHistoricalPlace(
  newHistoricalPlaceData: TNewHistoricalPlace,
  userId: string,
) {
  newHistoricalPlaceData.owner = userId;
  await axios.post(SERVICES_URLS.ENTERTAINMENT + "/historical-places", newHistoricalPlaceData);
}
