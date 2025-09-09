import axios from "axios";
import { STATUS_CODES } from "@/utils/constants";
import dotenv from "dotenv";

dotenv.config();

const axiosInstance = axios.create({
  baseURL: process.env.ENTERTAINMENT_SERVICE_URL || "http://entertainment:3000",
  validateStatus: (status) => {
    return status < STATUS_CODES.GATEWAY_TIMEOUT;
  },
});

// PreferenceTags service calls
export async function getAllPreferenceTags() {
  return await axiosInstance.get("/preference-tags");
}

export async function getPreferenceTagById(id: string) {
  return await axiosInstance.get(`/preference-tags/${id}`);
}

export async function createPreferenceTag(body: string) {
  return await axiosInstance.post("/preference-tags", body);
}

export async function updatePreferenceTag(id: string, body: string) {
  return await axiosInstance.patch(`/preference-tags/${id}`, body);
}

export async function deletePreferenceTag(id: string) {
  return await axiosInstance.delete(`/preference-tags/${id}`);
}
