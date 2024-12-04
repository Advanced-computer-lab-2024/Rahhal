import type { INotifyRequest } from "@/utils/types";
import * as notifyRequestRepository from "@/database/repositories/notify-request-repository";

export async function getNotifyRequests(filter: Partial<INotifyRequest>) {
  return await notifyRequestRepository.getNotifyRequests(filter);
}

export async function getNotifyRequestById(id: string) {
  return await notifyRequestRepository.getNotifyRequestById(id);
}

export async function createNotifyRequest(notifyRequestData: Partial<INotifyRequest>) {
  return await notifyRequestRepository.createNotifyRequest(notifyRequestData);
}

export async function updateNotifyRequest(id: string, notifyRequestData: Partial<INotifyRequest>) {
  return await notifyRequestRepository.updateNotifyRequest(id, notifyRequestData);
}

export async function deleteNotifyRequestById(id: string) {
  return await notifyRequestRepository.deleteNotifyRequestById(id);
}

export async function deleteNotifyRequest(notifyRequestData: Partial<INotifyRequest>){
  return await notifyRequestRepository.deleteNotifyRequest(notifyRequestData);
}
