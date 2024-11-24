import type { Request, Response } from "express";
import type { IBookmark, bookmarkType } from "@/utils/types";
import { STATUS_CODES, ERROR_MESSAGES } from "@/utils/constants";
import * as bookmarkService from "@/services/bookmark-service";

export async function getBookmarks(req: Request, res: Response) {
  try {
    const filters: Partial<IBookmark> = {
      user: req.query.userId as string,
      entity: req.query.entity as string,
      type: req.query.type as bookmarkType,
    };
    const definedFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined),
    );

    const bookmarks = await bookmarkService.getBookmarks(definedFilters);
    res.status(STATUS_CODES.STATUS_OK).json(bookmarks);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR,
    });
  }
}

export async function getBookmarkById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const bookmark = await bookmarkService.getBookmarkById(id);
    if (bookmark) {
      res.status(STATUS_CODES.STATUS_OK).json(bookmark);
    } else {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: ERROR_MESSAGES.NOT_FOUND });
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR,
    });
  }
}

export async function createBookmark(req: Request, res: Response) {
  try {
    const bookmarkData: Partial<IBookmark> = req.body;
    const bookmark = await bookmarkService.createBookmark(
      bookmarkData
    );
    if(bookmark) {
      res.status(STATUS_CODES.CREATED).json(bookmark);
    } else {
      res.status(STATUS_CODES.BAD_REQUEST).json({ message: ERROR_MESSAGES.BAD_REQUEST });
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR,
    });
  }
}

export async function updateBookmark(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const bookmarkData: Partial<IBookmark> = req.body;
    const bookmark = await bookmarkService.updateBookmark(id, bookmarkData);
    if(bookmark) {
      res.status(STATUS_CODES.STATUS_OK).json(bookmark);
    }
    else {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: ERROR_MESSAGES.NOT_FOUND });
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR,
    });
  }
}

export async function deleteBookmark(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const bookmark = await bookmarkService.deleteBookmark(id);
    if (bookmark) {
      res.status(STATUS_CODES.STATUS_OK).send(bookmark);
    } else {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: ERROR_MESSAGES.NOT_FOUND });
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR,
    });
  }
}
