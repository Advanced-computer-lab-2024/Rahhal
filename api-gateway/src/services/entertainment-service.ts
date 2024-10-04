import axios from "axios";
import { STATUS_CODES } from "@/utils/constants";

const axiosInstance = axios.create({
  baseURL: "http://entertainment:3000",
  validateStatus: (status) => {
    return status < STATUS_CODES.GATEWAY_TIMEOUT;
  },
});

export async function getAllActivities() {
  return await axiosInstance.get("/activities");
}
export async function getActivityById(id: string) {
  return await axiosInstance.get(`/activities/${id}`);
}
export async function createActivity(body: string) {
  return await axiosInstance.post("/activities", body);
}
export async function updateActivity(id: string, body: string) {
  return await axiosInstance.patch(`/activities/${id}`, body);
}
export async function deleteActivity(id: string) {
  return await axiosInstance.delete(`/activities/${id}`);
}
export async function getAllItineraries() {
  return await axiosInstance.get("/itinerary");
}
export async function getItineraryById(id: string) {
  return await axiosInstance.get(`/itinerary/${id}`);
}
export async function createItinerary(body: string) {
  return await axiosInstance.post("/itinerary", body);
}
export async function updateItinerary(id: string, body: string) {
  return await axiosInstance.patch(`/itinerary/${id}`, body);
}
export async function deleteItinerary(id: string) {
  return await axiosInstance.delete(`/itinerary/${id}`);
}
export async function getAllPreferenceTags() {
  return await axiosInstance.get("/preference-tags");
}
export async function getPreferenceTagById(id: string) {
  return await axiosInstance.get(`/preference-tags/${id}`);
}
export async function createPreferenceTag(body: string) {
  return await axiosInstance.post("p/reference-tags", body);
}
export async function updatePreferenceTag(id: string, body: string) {
  return await axiosInstance.patch(`/preference-tags/${id}`, body);
}
export async function deletePreferenceTag(id: string) {
  return await axiosInstance.delete(`/preference-tags/${id}`);
}
