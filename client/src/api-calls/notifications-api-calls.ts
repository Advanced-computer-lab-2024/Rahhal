import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";
import type { INotification } from "@/types/shared.d.ts";

export async function fetchUserNotifications(userId: string){
  const response = await axios.get(SERVICES_URLS.NOTIFICATION + `/notifications`, {
    params: {
      userId: userId,
    },
      withCredentials: false,
  },);
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
    },
    withCredentials: false,
  });
  return response.data as INotification[];
}
