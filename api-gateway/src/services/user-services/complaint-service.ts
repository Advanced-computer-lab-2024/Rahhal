import axios from "axios";
import { STATUS_CODES } from "@/utils/constants";

const complaintAxiosInstance = axios.create({
  baseURL: "http://user:3000",
  validateStatus: (status) => {
    return status < STATUS_CODES.GATEWAY_TIMEOUT;
  },
});

export async function getAllComplaints() {
  return await complaintAxiosInstance.get("/complaints");
}

export async function getComplaintByOwner(ownerId: string) {
  return await complaintAxiosInstance.get(`/complaints/${ownerId}`);
}

export async function createComplaint(body: string) {
  return await complaintAxiosInstance.post("/complaints", body);
}

export async function updateComplaint(id: string, body: string) {
  return await complaintAxiosInstance.patch(`/complaints/${id}`, body);
}

export async function addReply(id: string, body: string) {
  return await complaintAxiosInstance.post(`/complaints/${id}`, body);
}
