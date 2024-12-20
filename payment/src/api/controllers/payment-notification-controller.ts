import * as notificationService from "@/services/payment-notification-service";
import type { Request, Response } from "express";
import { STATUS_CODES, ERROR_MESSAGES } from "@/utils/constants";

export async function sendReceipt(req: Request, res: Response) {
  try {
    const { userId, receipt } = req.body;
    await notificationService.sendReceipt(userId, receipt);
    res.send(STATUS_CODES.CREATED);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR,
    });
  }
}
