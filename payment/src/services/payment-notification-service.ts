
import { publishNotification } from "@/publishers/notification-publisher";


// Update an existing product
export async function sendNotificationReceipt(userId: string, receipt: string) {
    publishNotification({
      userId: userId,
      message: receipt
    }); 
}