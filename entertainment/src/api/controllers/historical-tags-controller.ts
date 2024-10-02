import type { Request, Response } from 'express';
import * as historicalTagsService from '../../services/historical-tags-service';
import { STATUS_CODES } from '../../utils/constants';

export async function createHistoricalTag(req: Request, res: Response) {
  const historicalTag = req.body;
  try{
    const newHistoricalTag = await historicalTagsService.createHistoricalTag(historicalTag);
    res.status(STATUS_CODES.CREATED).send(newHistoricalTag);
  }
  catch(error: unknown){
    if(error instanceof Error){
      res.status(STATUS_CODES.SERVER_ERROR).send(error.message);
    }
  }
}

export async function getAllHistoricalTags(req: Request, res: Response) {
  try{
    const historicalTags = await historicalTagsService.getAllHistoricalTags();
    res.status(STATUS_CODES.STATUS_OK).send(historicalTags);
  }
  catch(error: unknown){
    if(error instanceof Error){
      res.status(STATUS_CODES.SERVER_ERROR).send(error.message);
    }
  }
}

export async function getHistoricalTagById(req: Request, res: Response) {
  const id = req.params.id;
  try{
    const historicalTag = await historicalTagsService.getHistoricalTagById(id);
    if(!historicalTag){
      res.status(STATUS_CODES.NOT_FOUND).send('Historical tag not found');
    }
    res.status(STATUS_CODES.STATUS_OK).send(historicalTag);
  }
  catch(error: unknown){
    if(error instanceof Error){
      res.status(STATUS_CODES.SERVER_ERROR).send(error.message);
    }
  }
}
