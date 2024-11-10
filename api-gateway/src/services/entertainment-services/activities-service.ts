import type { TRating } from "@/utils/types";
import { entertainmentAxiosInstance } from "@/utils/axios-instances";

export async function getAllActivities() {
  return await entertainmentAxiosInstance.get("/activities");
}

export async function getAppropriateActivities() {
  return entertainmentAxiosInstance.get("/activities/appropriate");
}
export async function getActivityById(id: string) {
  return await entertainmentAxiosInstance.get(`/activities/${id}`);
}

export async function createActivity(body: string) {
  return await entertainmentAxiosInstance.post("/activities", body);
}

export async function addActivityRating(activityId: string, rating: TRating) {
  return await entertainmentAxiosInstance.post(`/activities/${activityId}/ratings`, rating);
}

export async function updateActivity(id: string, body: string) {
  return await entertainmentAxiosInstance.patch(`/activities/${id}`, body);
}

export async function deleteActivity(id: string) {
  return await entertainmentAxiosInstance.delete(`/activities/${id}`);
}
