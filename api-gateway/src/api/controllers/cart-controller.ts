import type { Request, Response } from "express";
import * as cartService from "@/services/cart-service";
import { STATUS_CODES } from "@/utils/constants";

export async function getCart(req: Request, res: Response) {
  const userId = req.query.userId;
  try {
    const cart = await cartService.getCart(userId as string);
    res.status(STATUS_CODES.STATUS_OK).json(cart);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function createCart(req: Request, res: Response) {
  const cart = req.body;
  try {
    const newCart = await cartService.createCart(cart);
    res.status(STATUS_CODES.CREATED).json(newCart.data);
  } catch (error) {
    res.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}

export async function updateCart(req: Request, res: Response) {
  const userId = req.query.userId;
  const updatedCart = req.body;

  try {
    const populatedCart = await cartService.updateCart(userId as string, updatedCart);
    res.status(STATUS_CODES.STATUS_OK).json(populatedCart);
  } catch (error) {
    if (error instanceof Error) res.status(STATUS_CODES.SERVER_ERROR).json(error.message);
  }
}

export async function deleteCart(req: Request, res: Response) {
  const userId = req.query.userId;
  try {
    const deletedCart = await cartService.deleteCart(userId as string);
    res.status(STATUS_CODES.STATUS_OK).json(deletedCart.data);
  } catch (error) {
    res.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}