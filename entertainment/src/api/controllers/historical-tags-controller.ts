import type { Request, Response } from "express";
import * as historicalTagsService from "../../services/historical-tags-service";
import { STATUS_CODES } from "../../utils/constants";

export async function createHistoricalTag(req: Request, res: Response) {
  const HistoricalTagData = req.body;
  try {
    const oldHistoricalTag = await historicalTagsService.getHistoricalTagsByName(
      HistoricalTagData.name,
    );
    if (oldHistoricalTag) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ error: "Historical Tag already exists" });
    } else {
      console.log(HistoricalTagData.name);
      const HistoricalTag = await historicalTagsService.createHistoricalTag(HistoricalTagData.name);
      res.status(STATUS_CODES.CREATED).json(HistoricalTag);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(STATUS_CODES.SERVER_ERROR).json(error.message);
    }
  }
}

export async function getAllHistoricalTags(req: Request, res: Response) {
  try {
    const historicalTags = await historicalTagsService.getAllHistoricalTags();
    res.status(STATUS_CODES.STATUS_OK).json(historicalTags);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(STATUS_CODES.SERVER_ERROR).json(error.message);
    }
  }
}

export async function getHistoricalTagById(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const historicalTag = await historicalTagsService.getHistoricalTagById(id);
    if (!historicalTag) {
      res.status(STATUS_CODES.NOT_FOUND).json("Historical tag not found");
    }
    res.status(STATUS_CODES.STATUS_OK).json(historicalTag);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(STATUS_CODES.SERVER_ERROR).json(error.message);
    }
  }
}
