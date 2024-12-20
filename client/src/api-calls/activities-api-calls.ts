import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";
import { TActivity, TNewActivity } from "@/features/advertiser/utils/advertiser-columns";

import { renameActivityImage } from "@/features/advertiser/utils/advertiser-firebase";
import { uploadToFirebase } from "@/utils/firebase";

export const fetchActivities = async () => {
  const response = await axios.get(SERVICES_URLS.ENTERTAINMENT + `/activities`);
  return response.data;
};

// fetch activity by id
export const fetchActivityById = async (activityId: string) => {
  const response = await axios.get(SERVICES_URLS.ENTERTAINMENT + `/activities/${activityId}`);
  return response.data;
};

// TODO - later it should be by owner and some other type of handling
export const fetchUserActivities = async (userId: string) => {
  const response = await axios.get(SERVICES_URLS.ENTERTAINMENT + `/activities/`, {
    params: {
      owner: userId,
    },
  });
  return response.data;
};

export const fetchAppropriateActivities = async () => {
  const response = await axios.get(SERVICES_URLS.ENTERTAINMENT + `/activities/appropriate`);
  return response.data;
};

export const deleteActivity = async (id: string) => {
  const response = await axios.delete(`${SERVICES_URLS.ENTERTAINMENT}/activities/${id}`);
  return response;
};

export async function updateActivity(activityData: TActivity, activityImages: FileList | null) {
  const urls: string[] = await uploadToFirebase(
    activityImages,
    activityData.owner,
    activityData._id,
    renameActivityImage,
  );

  activityData.images = [...activityData.images, ...urls];

  const response = await axios.patch(`${SERVICES_URLS.ENTERTAINMENT}/activities/${activityData!._id}`, activityData);
  return response;
  
}

export async function createActivity(
  newActivityData: TActivity,
  userId: string,
  username: string,
  activityImages: FileList | null,
) {
  newActivityData.owner = userId;
  newActivityData.ownerName = username;
  newActivityData.images = [];

  const { _id: newActivityId, ...newActivityDataWithoutId } = newActivityData;
  const response = await axios.post(SERVICES_URLS.ENTERTAINMENT + "/activities", newActivityDataWithoutId);

  
  const activityId = (response.data as TActivity)._id;
  const urls: string[] = await uploadToFirebase(
    activityImages,
    userId,
    activityId,
    renameActivityImage,
  );

  newActivityData.images = urls;

  console.log(urls);

  const { _id: updatedActivityId, ...rest } = newActivityData;
  await axios.patch(`${SERVICES_URLS.ENTERTAINMENT}/activities/${activityId}`, rest);

  return response; 
}
