import axios from "axios";
import { STATUS_CODES } from "@/utils/constants";

const axiosInstance = axios.create({
  baseURL: "http://entertainment:3000",
  validateStatus: (status) => {
    return status < STATUS_CODES.GATEWAY_TIMEOUT;
  },
});

// Activites service calls
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
