import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";
import { TActivity, TNewActivity } from "@/features/advertiser/utils/advertiser-columns";

import { renameActivityImage } from "@/features/advertiser/utils/advertiser-firebase";

export const fetchActivities = async () => {
  const response = await axios.get(SERVICES_URLS.ENTERTAINMENT + `/activities`);
  return response.data;
};

// TODO - later it should be by owner and some other type of handling
export const fetchUserActivities = async (userId: string) => {
  const response = await axios.get(SERVICES_URLS.USER + `/users/${userId}/activities`);
  return response.data;
};

export const fetchAppropriateActivities = async (userId: string) => {
  const response = await axios.get(SERVICES_URLS.ENTERTAINMENT + `/activities/appropriate`);
  return response.data;
};

export const deleteActivity = async (activity: TActivity) => {
  await axios.delete(`${SERVICES_URLS.ENTERTAINMENT}/activities/${activity._id}`);
  alert("Activity deleted successfully");
  window.location.reload();
};

export async function updateActivity(activityData: TActivity, activityImages: FileList | null) {
  
  const urls: string[] = [];
  if (activityImages) {
    activityImages = renameActivityImage(activityImages, activityData.owner, activityData._id);
    for (let i = 0; i < activityImages!.length; i++) {
      const formData = new FormData();
      formData.append("image" + i, activityImages![i]);
      const response = await axios.post(SERVICES_URLS.FIREBASE + "/upload-multiple-files", formData);
      urls.push((response.data as string[])[0]);
    }
  }
  activityData.images = [...activityData.images, ...urls];

  await axios.patch(`${SERVICES_URLS.ENTERTAINMENT}/activities/${activityData!._id}`, activityData);
  alert("Activity updated successfully");
  window.location.reload();
}

export async function createActivity(newActivityData: TNewActivity, userId: string, activityImages: FileList | null) {
  newActivityData.owner = userId;
  const urls: string[] = [];
  

  newActivityData.images = urls;

  const response =  await axios.post(SERVICES_URLS.ENTERTAINMENT + "/activities", newActivityData);
  const activityId = (response.data as TActivity)._id;
  if (activityImages) {
    activityImages = renameActivityImage(activityImages, userId, activityId);
    for (let i = 0; i < activityImages!.length; i++) {
      const formData = new FormData();
      formData.append("image" + i, activityImages![i]);
      const response = await axios.post(SERVICES_URLS.FIREBASE + "/upload-multiple-files", formData);
      urls.push((response.data as string[])[0]);
    }
  }
  newActivityData.images = urls;

  alert("Activity created successfully");
  window.location.reload();
}
