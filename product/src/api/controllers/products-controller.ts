import type express from "express";
import * as productsService from "@/services/products-service";
import { STATUS_CODES } from "@/utils/constants";
import type { IRating } from "@/database/rating";

export async function getAllProducts(req: express.Request, res: express.Response) {
  try {
    const sellerId = req.query.sellerId as string;
    let products;
    if (sellerId) {
      products = await productsService.getProductsBySeller(sellerId);
    } else {
      products = await productsService.getAllProducts();
    }
    res.status(STATUS_CODES.STATUS_OK).json(products);
  } catch (error) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
  }
}

export async function getAvailableProducts(req: express.Request, res: express.Response) {
  try {
    const products = await productsService.getAvailableProducts();
    res.status(STATUS_CODES.STATUS_OK).json(products);
  } catch (error) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
  }
}

export async function getProductById(req: express.Request, res: express.Response) {
  try {
    const product = await productsService.getProductById(req.params.id);
    if (!product) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "Product not found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(product);
    }
  } catch (error) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
  }
}

export async function createProduct(req: express.Request, res: express.Response) {
  try {
    const product = await productsService.createProduct(req.body);
    res.status(STATUS_CODES.CREATED).json(product);
  } catch (error) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
  }
}

export async function addRating(req: express.Request, res: express.Response) {
  try {
    const productId = req.params.id;
    const userRating = req.body as IRating;
    const rating = await productsService.addRating(userRating, productId);
    if (!rating) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "Product not found" });
    } else {
      res.status(STATUS_CODES.CREATED).json(rating);
    }
  } catch (error) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
  }
}

export async function editRating(req: express.Request, res: express.Response) {
  try {
    const productId = req.params.id;
    const userId = req.body.userId;
    const rating = req.body.rating as Partial<IRating>;
    const updatedRating = await productsService.editRating(userId, productId, rating);
    if (!updatedRating) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "Rating not found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(updatedRating);
    }
  } catch (error) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
  }
}

export async function updateProduct(req: express.Request, res: express.Response) {
  try {
    const product = await productsService.updateProduct(req.params.id, req.body);
    if (!product) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "Product not found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(product);
    }
  } catch (error) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
  }
}

export async function deleteProduct(req: express.Request, res: express.Response) {
  try {
    const product = await productsService.deleteProduct(req.params.id);
    if (!product) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "Product not found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(product);
    }
  } catch (error) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
  }
}
