import type { Request, Response } from "express";
import { STATUS_CODES } from "@/utils/constants";
import * as notifyRequestService from "@/services/booking-services/notify-request-service";

export async function getNotifyRequests(req: Request, res: Response) {
  const filter = req.query;
  try {
    const notifyRequests = await notifyRequestService.getNotifyRequests(filter);
    res.status(STATUS_CODES.STATUS_OK).json(notifyRequests);
  } catch (error) {
    res.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}

export async function getNotifyRequestById(req: Request, res: Response) {
  const notifyRequestId = req.params.id;
  try {
    const notifyRequest = await notifyRequestService.getNotifyRequestById(notifyRequestId);
    if (notifyRequest) {
      res.status(STATUS_CODES.STATUS_OK).json(notifyRequest);
    } else {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "Notify request not found" });
    }
  } catch (error) {
    res.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}

export async function createNotifyRequest(req: Request, res: Response) {
  const notifyRequest = req.body;
  try {
    const newNotifyRequest = await notifyRequestService.createNotifyRequest(notifyRequest);
    res.status(newNotifyRequest.status).json(newNotifyRequest.data);
  } catch (error) {
    res.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}

export async function updateNotifyRequest(req: Request, res: Response) {
  const notifyRequestId = req.params.id;
  const notifyRequest = req.body;
  try {
    const updatedNotifyRequest = await notifyRequestService.updateNotifyRequest(notifyRequestId, notifyRequest);
    res.status(updatedNotifyRequest.status).json(updatedNotifyRequest.data);
  } catch (error) {
    res.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}

export async function deleteNotifyRequestById(req: Request, res: Response) {
  const notifyRequestId = req.params.id;
  try {
    const deletedNotifyRequest = await notifyRequestService.deleteNotifyRequestById(notifyRequestId);
    res.status(deletedNotifyRequest.status).json(deletedNotifyRequest.data);
  } catch (error) {
    res.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}

export async function deleteNotifyRequest(req: Request, res: Response) {
  const notifyRequest = req.query;
  try {
    const deletedNotifyRequest = await notifyRequestService.deleteNotifyRequest(notifyRequest);
    res.status(deletedNotifyRequest.status).json(deletedNotifyRequest.data);
  } catch (error) {
    res.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}
