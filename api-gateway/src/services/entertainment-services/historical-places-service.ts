import axios from "axios";
import { STATUS_CODES } from "@/utils/constants";

const axiosInstance = axios.create({
  baseURL: "http://entertainment:3000",
  validateStatus: (status) => {
    return status < STATUS_CODES.GATEWAY_TIMEOUT;
  },
});

// HistoricalPlaces service calls
export async function getAllHistoricalPlaces() {
  return await axiosInstance.get("/historical-places");
}

export async function getHistoricalPlaceById(id: string) {
  return await axiosInstance.get(`/historical-places/${id}`);
}

export async function getHistoricalPlacesByOwner(ownerId: string) {
  return await axiosInstance.get(`/historical-places`, { params: { ownerId } });
}

export async function createHistoricalPlace(body: string) {
  return await axiosInstance.post("/historical-places", body);
}

export async function updateHistoricalPlace(id: string, body: string) {
  return await axiosInstance.patch(`/historical-places/${id}`, body);
}

export async function deleteHistoricalPlace(id: string) {
  return await axiosInstance.delete(`/historical-places/${id}`);
}
