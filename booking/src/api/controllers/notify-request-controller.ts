import type { Request, Response } from "express";
import type { INotifyRequest } from "@/utils/types";
import { STATUS_CODES, ERROR_MESSAGES } from "@/utils/constants";
import * as notifyRequestService from "@/services/notify-request-service";

export async function getNotifyRequests(req: Request, res: Response) {
  try {
    const filters: Partial<INotifyRequest> = {
      user: req.query.userId as string,
      entity: req.query.entity as string,
    };
    const definedFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined),
    );

    const notifyRequests = await notifyRequestService.getNotifyRequests(definedFilters);
    res.status(STATUS_CODES.STATUS_OK).json(notifyRequests);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR,
    });
  }
}

export async function getNotifyRequestById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const notifyRequest = await notifyRequestService.getNotifyRequestById(id);
    if (notifyRequest) {
      res.status(STATUS_CODES.STATUS_OK).json(notifyRequest);
    } else {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: ERROR_MESSAGES.NOT_FOUND });
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR,
    });
  }
}

export async function createNotifyRequest(req: Request, res: Response) {
  try {
    const notifyRequestData: Partial<INotifyRequest>  = req.body;
    if(notifyRequestData.user === undefined) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ message: ERROR_MESSAGES.BAD_REQUEST });
      return
    }
    const notifyRequest = await notifyRequestService.createNotifyRequest(
      notifyRequestData as INotifyRequest
    );
    if(notifyRequest) {
      res.status(STATUS_CODES.CREATED).json(notifyRequest);
    } else {
      res.status(STATUS_CODES.BAD_REQUEST).json({ message: ERROR_MESSAGES.BAD_REQUEST });
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR,
    });
  }
}

export async function updateNotifyRequest(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const notifyRequestData: Partial<INotifyRequest> = req.body;
    const notifyRequest = await notifyRequestService.updateNotifyRequest(
      id,
      notifyRequestData
    );
    if(notifyRequest) {
      res.status(STATUS_CODES.STATUS_OK).json(notifyRequest);
    } else {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: ERROR_MESSAGES.NOT_FOUND });
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR,
    });
  }
}

export async function deleteNotifyRequestById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const notifyRequest = await notifyRequestService.deleteNotifyRequestById(id);
    if(notifyRequest) {
      res.status(STATUS_CODES.STATUS_OK).json(notifyRequest);
    } else {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: ERROR_MESSAGES.NOT_FOUND });
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR,
    });
  }
}

export async function deleteNotifyRequest(req: Request, res: Response) {
  try {
    const notifyRequestData: Partial<INotifyRequest> = req.body;
    const notifyRequest = await notifyRequestService.deleteNotifyRequest(notifyRequestData);
    if(notifyRequest) {
      res.status(STATUS_CODES.STATUS_OK).json(notifyRequest);
    } else {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: ERROR_MESSAGES.NOT_FOUND });
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR,
    });
  }
}
