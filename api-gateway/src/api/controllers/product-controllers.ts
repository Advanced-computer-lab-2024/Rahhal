import type { Request, Response } from "express";
import { STATUS_CODES } from "@/utils/constants";
import * as productService from "@/services/product-service";
import { IProductQueryParamsFilter } from "@/utils/types";

export async function getAllProducts(req: Request, res: Response) {
  try {
    const filter = req.query as IProductQueryParamsFilter;
    const products = await productService.getAllProducts(filter);
    res.status(products.status).json(products.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function getAvailableProducts(req: Request, res: Response) {
  try {
    const products = await productService.getAvailableProducts();
    res.status(products.status).json(products.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function getProductById(req: Request, res: Response) {
  const productId = req.params.id;
  try {
    const product = await productService.getProductById(productId);
    res.status(product.status).json(product.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function createProduct(req: Request, res: Response) {
  const productData = req.body;
  try {
    const product = await productService.createProduct(productData);
    res.status(product.status).json(product.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function updateProduct(req: Request, res: Response) {
  const productId = req.params.id;
  const productData = req.body;
  try {
    const product = await productService.updateProduct(productId, productData);
    res.status(product.status).json(product.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function deleteProduct(req: Request, res: Response) {
  const productId = req.params.id;
  try {
    const product = await productService.deleteProduct(productId);
    res.status(product.status).json(product.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}
