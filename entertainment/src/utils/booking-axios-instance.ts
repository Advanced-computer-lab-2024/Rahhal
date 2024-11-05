import axios from "axios";
import { CONSTANTS } from "./constants";

export const bookingAxiosInstance = axios.create({
  baseURL: "http://booking:3000",
});

export async function hasBookings(id: string) {
  try {
    const response = await bookingAxiosInstance.get(`/bookings`, {
      params: { entity: id, type: "itinerary", status: "upcoming" },
    });
    if (response.data.length > CONSTANTS.ZERO) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}
