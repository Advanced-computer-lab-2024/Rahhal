import type { Request, Response } from "express";
import { STATUS_CODES, ERROR_MESSAGES } from "@/utils/constants";
import * as wishlistService from "@/services/wishlist-service";

export async function getWishlist(req: Request, res: Response) {
  try {
    const wishlist = await wishlistService.getWishlist(req.query);
    res.status(STATUS_CODES.STATUS_OK).json(wishlist);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR,
    });
  }
}

export async function getWishlistById(req: Request, res: Response) {
  try {
    const wishlist = await wishlistService.getWishlistById(req.params.id);
    if (wishlist) {
      res.status(STATUS_CODES.STATUS_OK).json(wishlist);
    } else {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: ERROR_MESSAGES.NOT_FOUND });
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR,
    });
  }
}

export async function createWishlist(req: Request, res: Response) {
  try {
    const wishlist = await wishlistService.createWishlist(req.body);
    res.status(STATUS_CODES.CREATED).json(wishlist);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR,
    });
  }
}

export async function updateWishlist(req: Request, res: Response) {
  try {
    const wishlist = await wishlistService.updateWishlist(req.params.id, req.body);
    if (wishlist) {
      res.status(STATUS_CODES.STATUS_OK).json(wishlist);
    } else {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: ERROR_MESSAGES.NOT_FOUND });
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR,
    });
  }
}

export async function deleteWishlist(req: Request, res: Response) {
  try {
    const wishlist = await wishlistService.deleteWishlist(req.params.id);
    if (wishlist) {
      res.status(STATUS_CODES.STATUS_OK).json(wishlist);
    } else {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: ERROR_MESSAGES.NOT_FOUND });
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR,
    });
  }
}

export async function deleteWishlistItem(req: Request, res: Response) {
  try {
    const wishlist = await wishlistService.deleteWishlistItem(req.body);
    if (wishlist) {
      res.status(STATUS_CODES.STATUS_OK).json(wishlist);
    } else {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: ERROR_MESSAGES.NOT_FOUND });
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR,
    });
  }
}
