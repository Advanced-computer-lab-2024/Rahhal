import type { Request, Response } from "express";
import * as historicalTagsService from "@/services/entertainment-services/historical-tags-service";
import { STATUS_CODES } from "@/utils/constants";

// HistoricalTags controllers
export async function getAllHistoricalTags(req: Request, res: Response) {
  try {
    const historicalTags = await historicalTagsService.getAllHistoricalTags();
    res.status(historicalTags.status).json(historicalTags.data);
  }
  catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function getHistoricalTagById(req: Request, res: Response) {
  const historicalTagId = req.params.id;
  try {
    const historicalTag = await historicalTagsService.getHistoricalTagById(historicalTagId);
    res.status(historicalTag.status).json(historicalTag.data);
  }
  catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function createHistoricalTag(req: Request, res: Response) {
  const historicalTagData = req.body;
  try {
    const historicalTag = await historicalTagsService.createHistoricalTag(historicalTagData);
    res.status(historicalTag.status).json(historicalTag.data);
  }
  catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}
