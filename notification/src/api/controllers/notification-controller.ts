import type { Request, Response } from "express";
import * as notificationService from "@/services/notification-service";
import SSEService from "@/services/server-sent-events-service";
import { STATUS_CODES, MESSAGES } from "@/utils/constants";

export async function getAllNotifications(req: Request, res: Response) {
  try {
    const filter = req.query;
    const notifications = await notificationService.getAllNotifications(filter);
    res.status(STATUS_CODES.STATUS_OK).json(notifications);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : MESSAGES.UNKNOWN_ERROR,
    });
  }
}

export async function getNotificationById(req: Request, res: Response) {
  try {
    const notification = await notificationService.getNotificationById(req.params.id);
    if (!notification) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: MESSAGES.NOTIFICATION_NOT_FOUND });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(notification);
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : MESSAGES.UNKNOWN_ERROR,
    });
  }
}

export async function createNotification(req: Request, res: Response) {
  try {
    const notification = await notificationService.createNotification(req.body);
    res.status(STATUS_CODES.CREATED).json(notification);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : MESSAGES.UNKNOWN_ERROR,
    });
  }
}

export async function updateNotification(req: Request, res: Response) {
  try {
    const notificationData = req.body;
    const notification = await notificationService.updateNotification(req.params.id, notificationData);
    if (!notification) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: MESSAGES.NOTIFICATION_NOT_FOUND });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(notification);
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : MESSAGES.UNKNOWN_ERROR,
    });
  }
}

export async function deleteNotificationById(req: Request, res: Response) {
  try {
    const notification = await notificationService.deleteNotificationById(req.params.id);
    if (!notification) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: MESSAGES.NOTIFICATION_NOT_FOUND });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(notification);
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : MESSAGES.UNKNOWN_ERROR,
    });
  }
}

export async function deleteNotifications(req: Request, res: Response) {
  try {
    const filter = req.query;
    const result = await notificationService.deleteNotifications(filter);
    res.status(STATUS_CODES.STATUS_OK).json(result);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : MESSAGES.UNKNOWN_ERROR,
    });
  }
}

export async function markNotificationAsSeen(req: Request, res: Response) {
  try {
    const notification = await notificationService.markNotificationAsSeen(req.params.id);
    if (!notification) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: MESSAGES.NOTIFICATION_NOT_FOUND });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(notification);
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : MESSAGES.UNKNOWN_ERROR,
    });
  }
}

export async function sseStream(req: Request, res: Response) {
  try {
    const userId = req.query.userId as string;
    if (!userId) {
      res.status(STATUS_CODES.BAD_REQUEST).send('User ID is required');
      return;
    }
    SSEService.registerClient(userId, res);

    req.on('close', () => {
      SSEService.removeClient(userId);
    });
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : MESSAGES.UNKNOWN_ERROR,
    });
  }
}
