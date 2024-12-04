import { bookingAxiosInstance } from "@/utils/axios-instances";
import type { INotifyRequest } from "@/utils/types";

export async function getNotifyRequests(filer: Partial<INotifyRequest>) {
  try {
    const notifyRequests = await bookingAxiosInstance.get("/notify-requests", { params: filer });
    return notifyRequests.data;
  }
  catch (error) {
    return new Error("Failed to fetch notify requests from booking server\n" + error);
  }
}

export async function getNotifyRequestById(id: string) {
  try {
    const notifyRequest = await bookingAxiosInstance.get(`/notify-requests/${id}`);
    return notifyRequest.data;
  }
  catch (error) {
    return new Error("Failed to fetch notify request from booking server\n" + error);
  }
}

export async function createNotifyRequest(body: string) {
  return bookingAxiosInstance.post("/notify-requests", body);
}

export async function updateNotifyRequest(id: string, body: string) {
  return bookingAxiosInstance.patch(`/notify-requests/${id}`, body);
}

export async function deleteNotifyRequestById(id: string) {
  return bookingAxiosInstance.delete(`/notify-requests/${id}`);
}

export async function deleteNotifyRequest(notifyRequestData: Partial<INotifyRequest>) {
  return bookingAxiosInstance.delete("/notify-requests", { params: notifyRequestData });
}
