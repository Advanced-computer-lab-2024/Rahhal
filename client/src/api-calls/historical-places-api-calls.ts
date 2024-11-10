import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";
import {
  THistoricalPlace,
  TNewHistoricalPlace,
} from "@/features/tourism-governor/utils/tourism-governor-columns";
import { uploadToFirebase } from "@/utils/firebase";
import { rename } from "fs";
import { renameHistoricalPlaceImage } from "@/features/tourism-governor/utils/tourism-governer-firebase";

export async function fetchHistoricalPlaces() {
  const response = await axios.get(SERVICES_URLS.ENTERTAINMENT + "/historical-places");
  return response.data;
}

//TODO - later it should be by owner and some other type of handling
export const fetchUserHistoricalPlaces = async (userId: string) => {
  const response = await axios.get(SERVICES_URLS.ENTERTAINMENT + `/historical-places`, {
    params: { ownerId: userId },
  });
  return response.data;
};

export async function deleteHistoricalPlace(historicalPlace: THistoricalPlace) {
  console.log(historicalPlace);
  await axios.delete(`${SERVICES_URLS.ENTERTAINMENT}/historical-places/${historicalPlace._id}`);
  alert("Historical Place deleted successfully");
  window.location.reload();
}

export async function updateHistoricalPlace(historicalPlaceData: THistoricalPlace, historicalPlaceImages: FileList | null) {

  const urls: string[] = await uploadToFirebase(
    historicalPlaceImages,
    historicalPlaceData.owner,
    historicalPlaceData._id,
    renameHistoricalPlaceImage,
  );

  historicalPlaceData.images = [...historicalPlaceData.images, ...urls];

  

  await axios.patch(
    `${SERVICES_URLS.ENTERTAINMENT}/historical-places/${historicalPlaceData!._id}`,
    historicalPlaceData,
  );
  alert("Historical Place updated successfully");
  window.location.reload();
}

export async function createHistoricalPlace(
  newHistoricalPlaceData: TNewHistoricalPlace,
  userId: string,
  historicalPlaceImages: FileList | null,
) {

  newHistoricalPlaceData.owner = userId;

  

  
  const response = await axios.post<THistoricalPlace>(SERVICES_URLS.ENTERTAINMENT + "/historical-places", newHistoricalPlaceData);

  if (historicalPlaceImages) {
    const urls: string[] = await uploadToFirebase(
      historicalPlaceImages,
      userId,
      response.data._id,
      renameHistoricalPlaceImage,
    );

    await axios.patch(`${SERVICES_URLS.ENTERTAINMENT}/historical-places/${response.data._id}`, {
      images: urls,
    });
  }

  alert("Historical Place created successfully");
  window.location.reload();
}
