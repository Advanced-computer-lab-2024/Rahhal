import type { Request, Response } from "express";
import { STATUS_CODES } from "@/utils/constants";
import * as paymentNotificationService from "@/services/payment-services/payment-notification-service";

export async function sendReceipt(req: Request, res: Response) {
  try {
    const result = await paymentNotificationService.sendReceipt(req.body);
    res.send(result.status)
  } catch (error) {
    res.send(STATUS_CODES.BAD_GATEWAY)
  }
}
