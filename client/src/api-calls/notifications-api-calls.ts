import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";
import type { INotification } from "@/features/home/types/home-page-types";

export async function fetchUserNotifications(userId: string){
  const response = await axios.get(SERVICES_URLS.NOTIFICATION + `/notifications`, {
    params: {
      userId: userId,
    }
  });
  return response.data as INotification[];
}

export async function markNotificationAsSeen(notificationId: string){
  const response = await axios.patch(SERVICES_URLS.NOTIFICATION + `/notifications/` + notificationId + `/seen`);
  return response.data as INotification[];
}

export async function markUserNotificationsAsSeen(userId: string){
  const response = await axios.patch(SERVICES_URLS.NOTIFICATION + `/notifications/seen`, {
    params: {
      userId: userId,
    }
  });
  return response.data as INotification[];
}
