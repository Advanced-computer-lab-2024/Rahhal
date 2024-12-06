import type { Request, Response } from "express";
import * as cartService from "@/services/cart-service";
import { STATUS_CODES } from "@/utils/constants";
import { CartUpdates } from "@/utils/types";

export async function getCart(req: Request, res: Response) {
  const { user } = req.query;
  try {
    const cart = await cartService.getCart(user as string);
    res.status(STATUS_CODES.STATUS_OK).json(cart);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function createCart(req: Request, res: Response) {
  const userId = req.body;
  try {
    const newCart = await cartService.createCart(userId);
    res.status(STATUS_CODES.CREATED).json(newCart.data);
  } catch (error) {
    res.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}

export async function updateCart(req: Request, res: Response) {
  const { user, operation, productId } = req.query;
  try {
    const populatedCart = await cartService.updateCart({
      user: user as string,
      operation: operation as CartUpdates,
      productId: productId as string,
    });
    res.status(STATUS_CODES.STATUS_OK).json(populatedCart);
  } catch (error) {
    if (error instanceof Error) res.status(STATUS_CODES.SERVER_ERROR).json(error.message);
  }
}

export async function addItemToCart(req: Request, res: Response) {
  try {
    const populatedCart = await cartService.addItemToCart(req.body);
    res.status(STATUS_CODES.STATUS_OK).json(populatedCart);
  } catch (error) {
    if (error instanceof Error) res.status(STATUS_CODES.SERVER_ERROR).json(error.message);
  }
}

export async function removeItemFromCart(req: Request, res: Response) {
  const user = req.query.user;
  const productId = req.query.productId;

  try {
    const populatedCart = await cartService.removeItemFromCart(user as string, productId as string);
    res.status(STATUS_CODES.STATUS_OK).json(populatedCart);
  } catch (error) {
    if (error instanceof Error) res.status(STATUS_CODES.SERVER_ERROR).json(error.message);
  }
}

export async function deleteCart(req: Request, res: Response) {
  const user = req.query.user;
  try {
    const deletedCart = await cartService.deleteCart(user as string);
    res.status(STATUS_CODES.STATUS_OK).json(deletedCart.data);
  } catch (error) {
    res.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}
