import * as notificationService from '@/services/notification-service';
import SSEService from '@/services/server-sent-events-service';
import * as bookingService from '@/utils/booking-api-calls';
import * as mailService from '@/services/mail-service';
import * as userService from '@/utils/user-api-calls';
import { IBooking, INotification, IUser } from '@/utils/types';

interface NotificationData {
  userId: string;
  message: string;
}

export async function sendNotification(notificationData: NotificationData) {
  const user = await userService.getUserById(notificationData.userId) as IUser;

  if (!user) {
    throw new Error('User not found');
  }

  if (!user.email) {
    throw new Error('User email not found');
  }

  const notification: INotification = {
    userId: user._id,
    message: notificationData.message,
    email: user.email
  };

  await notificationService.createNotification(notification);
  mailService.sendEmailNotification(notification);
  // SSEService.sendNotification(user._id, notification);
}

export async function sendBulkNotifications(entityId: string, message: string) {
  const bookings = await bookingService.getBookings(entityId) as IBooking[];
  console.log(bookings);
  for (const booking of bookings) {
    const notificationData: NotificationData = {
      userId: booking.user,
      message,
    };
    await sendNotification(notificationData);
  }
}

export async function sendAdminAlert(message: string) {
  const admins = await userService.getAdmins() as IUser[];
  for (const admin of admins) {
    const notificationData: NotificationData = {
      userId: admin._id,
      message,
    };
    await sendNotification(notificationData);
  }
}