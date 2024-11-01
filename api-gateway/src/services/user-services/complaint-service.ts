import { userAxiosInstance } from "@/utils/axios-instances";

export async function getAllComplaints() {
  return await userAxiosInstance.get("/complaints");
}

export async function getComplaintByOwner(ownerId: string) {
  return await userAxiosInstance.get(`/complaints/${ownerId}`);
}

export async function createComplaint(body: string) {
  return await userAxiosInstance.post("/complaints", body);
}

export async function updateComplaint(id: string, body: string) {
  return await userAxiosInstance.patch(`/complaints/${id}`, body);
}

export async function addReply(id: string, body: string) {
  return await userAxiosInstance.post(`/complaints/${id}`, body);
}
