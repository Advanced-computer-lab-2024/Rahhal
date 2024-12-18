import axios from "axios";
import { STATUS_CODES } from "@/utils/constants";

const axiosInstance = axios.create({
  baseURL: "http://entertainment:3000",
  validateStatus: (status) => {
    return status < STATUS_CODES.GATEWAY_TIMEOUT;
  },
});

// HistoricalTags service calls
export async function getAllHistoricalTags() {
  return await axiosInstance.get("/historical-tags");
}

export async function getHistoricalTagById(id: string) {
  return await axiosInstance.get(`/historical-tags/${id}`);
}

export async function createHistoricalTag(body: string) {
  return await axiosInstance.post("/historical-tags", body);
}
