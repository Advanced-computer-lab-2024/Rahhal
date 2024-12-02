import type { Request, Response } from "express";
import type { CartUpdates } from "@/utils/types";
import * as cartService from "@/services/cart-service";
import { STATUS_CODES } from "@/utils/constants";

export async function getCart(req: Request, res: Response) {
  try {
    const { userId } = req.query;
    if (!userId) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ message: "userId is required" });
      return;
    }
    const cart = await cartService.getCart(userId as string);
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
    const { userId } = req.body;
    if (!userId) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ message: "userId is required" });
      return;
    }
    const cart = await cartService.createCart(userId);
    res.status(STATUS_CODES.CREATED).json(cart);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}

export async function deleteCart(req: Request, res: Response) {
  try {
    const { userId: userId } = req.query;
    if (!userId) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ message: "userId is required" });
      return;
    }
    const cart = await cartService.deleteCart(userId as string);
    res.status(STATUS_CODES.STATUS_OK).json(cart);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}

export async function updateCart(req: Request, res: Response) {
  try {
    const { userId: userId } = req.query;
    console.log(userId);
    if (!userId) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ message: "userId is required" });
      return;
    }

    const { operation, productId } = req.body;
    // const cart = await cartService.getCart(userId as string);
    // if (!cart) {
    //     res.status(STATUS_CODES.NOT_FOUND).json({ message: "Cart not found" });
    //     return;
    // }

    // let updatedProducts = cart.products;
    // switch (operation) {
    //     case CartUpdates.EmptyCart:
    //         updatedProducts = [];
    //         break;

    //     case CartUpdates.RemoveProduct:
    //         updatedProducts = updatedProducts.filter((item: CartItem) => item.productId !== productId);
    //         break;

    //     case CartUpdates.IncrementQuantity:
    //         updatedProducts = updatedProducts.map((item: CartItem) => {
    //             if (item.productId === productId) {
    //                 return { productId: item.productId, quantity: item.quantity + MIN_QUANTITY };
    //             }
    //             return item;
    //         });

    //         if (!updatedProducts.some((item: CartItem) => item.productId === productId)) {
    //             updatedProducts.push({ productId, quantity: MIN_QUANTITY });
    //         }
    //         break;

    //     case CartUpdates.DecrementQuantity:
    //         updatedProducts = updatedProducts
    //             .map((item: CartItem) => {
    //                 if (item.productId === productId) {
    //                     const newQuantity = item.quantity - MIN_QUANTITY;
    //                     return newQuantity > EMPTYPRODUCT
    //                         ? { productId: item.productId, quantity: newQuantity }
    //                         : null;
    //                 }
    //                 return item;
    //             })
    //             .filter((item) => item !== null);
    //         break;
    // }

    // const updatedCart = await cartService.updateCart(userId as string, updatedProducts);
    const updatedCart = await cartService.updateCart(
      userId as string,
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
