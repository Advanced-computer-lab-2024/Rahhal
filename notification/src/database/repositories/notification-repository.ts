import Notification from "@/database/models/Notification";
import type { INotification } from "@/utils/types";

export async function getAllNotifications(filter: Partial<INotification>) {
  return Notification.find(filter);
}

export async function getNotificationById(id: string) {
  return Notification.findById(id);
}

export async function createNotification(notification: INotification) {
  const newNotification = new Notification(notification);
  return await newNotification.save();
}

export async function updateNotification(id: string, notificationData: INotification) {
  return await Notification.findByIdAndUpdate(id);
}

export async function deleteNotificationById(id: string) {
  return await Notification.findByIdAndDelete(id);
}

export async function deleteNotifications(filter: Partial<INotification>) {
  return await Notification.deleteMany(filter);
}

export async function markNotificationAsSeen(id: string) {
  return await Notification.findByIdAndUpdate(id, { seen: true });
}
