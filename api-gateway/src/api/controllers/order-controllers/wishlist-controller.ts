import type { Request, Response } from "express";
import * as wishlistService from "@/services/order-services/wishlist-service";
import { STATUS_CODES } from "@/utils/constants";

export async function getWishlist(req: Request, res: Response) {
  const filter = req.query;
  try {
    const wishlist = await wishlistService.getWishlist(filter);
    res.status(STATUS_CODES.STATUS_OK).json(wishlist);
  } catch (error) {
    res.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}

export async function getWishlistById(req: Request, res: Response) {
  const wishlistId = req.params.id;
  try {
    const wishlist = await wishlistService.getWishlistById(wishlistId);
    if (wishlist) {
      res.status(STATUS_CODES.STATUS_OK).json(wishlist);
    } else {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "Wishlist not found" });
    }
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function createWishlist(req: Request, res: Response) {
  const wishlist = req.body;
  try {
    const newWishlist = await wishlistService.createWishlist(wishlist);
    res.status(newWishlist.status).json(newWishlist.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function updateWishlist(req: Request, res: Response) {
  const wishlistId = req.params.id;
  const wishlist = req.body;
  try {
    const updatedWishlist = await wishlistService.updateWishlist(wishlistId, wishlist);
    res.status(updatedWishlist.status).json(updatedWishlist.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function deleteWishlist(req: Request, res: Response) {
  const wishlistId = req.params.id;
  try {
    const deletedWishlist = await wishlistService.deleteWishlist(wishlistId);
    res.status(deletedWishlist.status).json(deletedWishlist.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}
