
import { publishNotification } from "@/publishers/notification-publisher";


// Update an existing product
export async function sendReceipt(userId: string, receipt: string) {
    publishNotification({
      userId: userId,
      message: receipt
    }); 
}