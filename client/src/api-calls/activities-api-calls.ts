import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";
import { TActivity, TNewActivity } from "@/features/advertiser/utils/advertiser-columns";

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

export async function updateActivity(activityData: TActivity) {
  await axios.patch(`${SERVICES_URLS.ENTERTAINMENT}/activities/${activityData!._id}`, activityData);
  alert("Activity updated successfully");
  window.location.reload();
}

export async function createActivity(newActivityData: TNewActivity, userId: string) {
  newActivityData.owner = userId;
  await axios.post(SERVICES_URLS.ENTERTAINMENT + "/activities", newActivityData);
  alert("Activity created successfully");
  window.location.reload();
}
