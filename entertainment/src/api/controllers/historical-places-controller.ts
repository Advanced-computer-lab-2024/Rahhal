import type { Request, Response } from 'express';
import * as historicalPlacesService from '../../services/historical-places-service';
import { STATUS_CODES } from '../../utils/constants';

export async function getAllHistoricalPlaces(
  req: Request,
  res: Response,
) {
  try {
    const historicalPlaces = await historicalPlacesService.getAllHistoricalPlaces();
    res.status(STATUS_CODES.STATUS_OK).json(historicalPlaces);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
}

export async function getHistoricalPlaceById(
  req: Request,
  res: Response,
) {
  try {
    const historicalPlace = await historicalPlacesService.getHistoricalPlaceById(req.params.id);
    if (!historicalPlace) {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: 'Historical place not found' });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(historicalPlace);
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
}

export async function createHistoricalPlace(
  req: Request,
  res: Response,
) {
  try {
    const historicalPlace = await historicalPlacesService.createHistoricalPlace(req.body);
    res.status(STATUS_CODES.CREATED).json(historicalPlace);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
}

export async function updateHistoricalPlace(
  req: Request,
  res: Response,
) {
  try {
    const historicalPlace = await historicalPlacesService.updateHistoricalPlace(
      req.params.id,
       req.body
      );
    if (!historicalPlace) {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: 'Historical place not found' });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(historicalPlace);
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
}

export async function deleteHistoricalPlace(
  req: Request,
  res: Response,
) {
  try {
    const historicalPlace = await historicalPlacesService.deleteHistoricalPlace(req.params.id);
    if (!historicalPlace) {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: 'Historical place not found' });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json({ message: 'Historical place deleted' });
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
}
