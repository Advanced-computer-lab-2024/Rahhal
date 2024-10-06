import { ENTERTAINMENT_SERVICE_URL } from "@/components/non-tourist/ActivitiesTable";
import { TActivity } from "@/table-columns/advertiser-columns";
import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// fetch available categories from categories endpoint
export const fetchCategories = async () => {
  const response = await axios.get(ENTERTAINMENT_SERVICE_URL + "/categories");
  return response.data;
};

// fetch preference tags from preference-tags endpoint
export const fetchPreferenceTags = async () => {
  const response = await axios.get(ENTERTAINMENT_SERVICE_URL + "/preference-tags");
  return response.data;
};

// delete activity from activities endpoint
export const deleteActivity = async (activity: TActivity) => {
  console.log(activity);
  await axios.delete(`${ENTERTAINMENT_SERVICE_URL}/activities/${activity._id}`);
};

// submit activity to the activities endpoint
export const submitActivity = async (
  activityData: TActivity | undefined,
  isNewActivity: boolean,
) => {
  if (isNewActivity) {
    await axios.post(ENTERTAINMENT_SERVICE_URL + "/activities", activityData).then((response) => {
      console.log(response.data);
    });
  } else {
    if (activityData) {
      await axios.put(`${ENTERTAINMENT_SERVICE_URL}/activities/${activityData._id}`, activityData);
    }
  }
};

// sample images for the picture card
export const IMAGES = [
  "src/assets/farmhouse-main.jpeg",
  "src/assets/farmhouse-zoom.jpeg",
  "src/assets/farmhouse-room.jpeg",
];

// sample reviews for the review display
export const sampleReviews = [
  { user: "John Doe", rating: 4, review: "Great product, highly recommend!" },
  { user: "Jane Smith", rating: 5, review: "Exceeded my expectations." },
  { user: "Bob Johnson", rating: 3 },
];
