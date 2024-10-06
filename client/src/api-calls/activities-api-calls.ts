import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";
import { TActivity } from "@/table-columns/advertiser-columns";

// fetch data from the server
export const fetchActivities = async () => {
  const response = await axios.get(SERVICES_URLS.ENTERTAINMENT + "/activities");
  return response.data;
};

// delete activity from activities endpoint
export const deleteActivity = async (activity: TActivity) => {
  console.log(activity);
  await axios.delete(`${SERVICES_URLS.ENTERTAINMENT}/activities/${activity._id}`);
};

// submit activity to the activities endpoint
export const submitActivity = async (
  activityData: TActivity | undefined,
  isNewActivity: boolean,
) => {
  if (isNewActivity) {
    await axios.post(SERVICES_URLS.ENTERTAINMENT + "/activities", activityData).then((response) => {
      console.log(response.data);
    });
  } else {
    if (activityData) {
      await axios.put(
        `${SERVICES_URLS.ENTERTAINMENT}/activities/${activityData._id}`,
        activityData,
      );
    }
  }
};
