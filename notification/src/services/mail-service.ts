import type { INotification } from "@/utils/types";
import transporter from "@/config/mail-config";
import dotenv from "dotenv";

dotenv.config();

export async function sendEmailNotification(notification: INotification) {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_VERIFIED_SENDER,
      to: notification.email,
      subject: "New Notification",
      text: notification.message+"\n\nRegards, \nRahhal Team",
    });
    console.log("Email sent: ", info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}
