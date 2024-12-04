import NotifyRequest from "@/database/models/NotifyRequest";
import type { INotifyRequest } from "@/utils/types";

export async function getNotifyRequests(filter: Partial<INotifyRequest>) {
  return await NotifyRequest.find(filter);
}

export async function getNotifyRequestById(id: string) {
  return await NotifyRequest.findById(id);
}

export async function createNotifyRequest(notifyRequestData: Partial<INotifyRequest>) {
  const newNotifyRequest = new NotifyRequest(notifyRequestData);
  return await newNotifyRequest.save();
}

export async function updateNotifyRequest(id: string, notifyRequestData: Partial<INotifyRequest>) {
  return await NotifyRequest.findByIdAndUpdate(id, notifyRequestData, { new: true, runValidators: true });
}

export async function deleteNotifyRequestById(id: string) {
  return await NotifyRequest.findByIdAndDelete(id);
}

export async function deleteNotifyRequest(notifyRequestData: Partial<INotifyRequest>){
  return NotifyRequest.deleteOne(notifyRequestData);
}
