import axios from "axios";
import { STATUS_CODES } from "@/utils/constants";

const axiosInstance = axios.create({
  baseURL: "http://entertainment:3000",
  validateStatus: (status) => {
    return status < STATUS_CODES.GATEWAY_TIMEOUT;
  },
});

// Itineraries service calls
export async function getAllItineraries() {
  return await axiosInstance.get("/itineraries");
}

export async function getItineraryById(id: string) {
  return await axiosInstance.get(`/itineraries/${id}`);
}

export async function createItinerary(body: string) {
  return await axiosInstance.post("/itineraries", body);
}

export async function updateItinerary(id: string, body: string) {
  return await axiosInstance.patch(`/itineraries/${id}`, body);
}

export async function deleteItinerary(id: string) {
  return await axiosInstance.delete(`/itineraries/${id}`);
}
