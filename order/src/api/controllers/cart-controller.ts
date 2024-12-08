import type { Request, Response } from "express";
import type { CartUpdates } from "@/utils/types";
import * as cartService from "@/services/cart-service";
import { STATUS_CODES } from "@/utils/constants";

export async function getCart(req: Request, res: Response) {
  try {
    const { user } = req.query;
    if (!user) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ message: "userId is required" });
      return;
    }
    const cart = await cartService.getCart(user as string);
    if (!cart) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "Cart not found" });
      return;
    }
    res.status(STATUS_CODES.STATUS_OK).json(cart);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}

export async function createCart(req: Request, res: Response) {
  try {
    const { user } = req.body;
    if (!user) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ message: "userId is required" });
      return;
    }
    const cart = await cartService.createCart(user as string);
    res.status(STATUS_CODES.CREATED).json(cart);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}

export async function deleteCart(req: Request, res: Response) {
  try {
    const { user } = req.query;
    if (!user) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ message: "userId is required" });
      return;
    }
    const cart = await cartService.deleteCart(user as string);
    res.status(STATUS_CODES.STATUS_OK).json(cart);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}

export async function updateCart(req: Request, res: Response) {
  try {
    const { user, operation, productId } = req.query;
    if (!user) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ message: "userId is required" });
      return;
    }
    const updatedCart = await cartService.updateCart(
      user as string,
      operation as CartUpdates,
      productId as string,
    );
    res.status(STATUS_CODES.STATUS_OK).json(updatedCart);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}

export async function addItemToCart(req: Request, res: Response) {
  try {
    const { user, productId } = req.body;
    if (!user) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ message: "userId is required" });
      return;
    }
    const cart = await cartService.addItemToCart(user, productId);
    res.status(STATUS_CODES.STATUS_OK).json(cart);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}

export async function removeItemFromCart(req: Request, res: Response) {
  try {
    const { user, productId } = req.query;
    if (!user) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ message: "userId is required" });
      return;
    }
    const cart = await cartService.removeItemFromCart(user as string, productId as string);
    res.status(STATUS_CODES.STATUS_OK).json(cart);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}
