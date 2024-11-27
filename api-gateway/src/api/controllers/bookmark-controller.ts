import type { Request, Response } from "express";
import { STATUS_CODES } from "@/utils/constants";
import * as bookmarkService from "@/services/bookmark-service";

export async function getBookmarks(req: Request, res: Response) {
  const filter = req.query;
  try {
    const bookmarks = await bookmarkService.getBookmarks(filter);
    res.status(STATUS_CODES.STATUS_OK).json(bookmarks);
  } catch (error) {
    res.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}

export async function getBookmarkById(req: Request, res: Response) {
  const bookmarkId = req.params.id;
  try {
    const bookmark = await bookmarkService.getBookmarkById(bookmarkId);
    if (bookmark) {
      res.status(STATUS_CODES.STATUS_OK).json(bookmark);
    } else {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "Bookmark not found" });
    }
  } catch (error) {
    res.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}

export async function createBookmark(req: Request, res: Response) {
  const bookmark = req.body;
  try {
    const newBookmark = await bookmarkService.createBookmark(bookmark);
    res.status(newBookmark.status).json(newBookmark.data);
  } catch (error) {
    res.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}

export async function updateBookmark(req: Request, res: Response) {
  const bookmarkId = req.params.id;
  const bookmark = req.body;
  try {
    const updatedBookmark = await bookmarkService.updateBookmark(bookmarkId, bookmark);
    res.status(updatedBookmark.status).json(updatedBookmark.data);
  } catch (error) {
    res.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}

export async function deleteBookmark(req: Request, res: Response) {
  const bookmarkId = req.params.id;
  try {
    const deletedBookmark = await bookmarkService.deleteBookmark(bookmarkId);
    res.status(deletedBookmark.status).json(deletedBookmark.data);
  } catch (error) {
    res.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}
