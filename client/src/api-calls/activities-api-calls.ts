import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";
import { TActivity, TNewActivity } from "@/table-columns/advertiser-columns";

export const fetchActivities = async () => {
  const response = await axios.get(SERVICES_URLS.ENTERTAINMENT + "/activities");
  return response.data;
};

export const deleteActivity = async (activity: TActivity) => {
  await axios.delete(`${SERVICES_URLS.ENTERTAINMENT}/activities/${activity._id}`);
};

export async function updateActivity(activityData: TActivity) {
  await axios.patch(`${SERVICES_URLS.ENTERTAINMENT}/activities/${activityData!._id}`, activityData);
}

export async function createActivity(newActivityData: TNewActivity, userId: string) {
  newActivityData.owner = userId;
  await axios.post(SERVICES_URLS.ENTERTAINMENT + "/activities", newActivityData);
}
