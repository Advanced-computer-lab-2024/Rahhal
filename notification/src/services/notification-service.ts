import type { INotification } from "@/utils/types";
import * as notificationsRepository from "@/database/repositories/notification-repository";

export async function getAllNotifications(filter: Partial<INotification>) {
  return notificationsRepository.getAllNotifications(filter);
}

export async function getNotificationById(id: string) {
  return notificationsRepository.getNotificationById(id);
}

export async function createNotification(notification: INotification) {
  return notificationsRepository.createNotification(notification);
}

export async function updateNotification(id: string, notificationData: INotification) {
  return notificationsRepository.updateNotification(id, notificationData);
}

export async function deleteNotificationById(id: string) {
  return notificationsRepository.deleteNotificationById(id);
}

export async function deleteNotifications(filter: Partial<INotification>) {
  return notificationsRepository.deleteNotifications(filter);
}

export async function markNotificationAsSeen(id: string) {
  return notificationsRepository.markNotificationAsSeen(id);
}
