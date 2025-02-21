import type { IRating } from "@/database/rating";
import type { IProduct } from "../database/models/Product";
import * as productsRepository from "../database/repositories/products-repository";
import { publishNotification } from "@/publishers/notification-publisher";
import { publishAdminAlert } from "@/publishers/admin-alert-publisher";
import { CONSTANTS } from "@/utils/constants";

// Get all products
export async function getAllProducts(filter: Partial<IProduct>): Promise<IProduct[]> {
  return await productsRepository.getAllProducts(filter);
}

// Get all available products
export async function getAvailableProducts(): Promise<IProduct[]> {
  return await productsRepository.getAvailableProducts();
}

// Get product by id
export async function getProductById(id: string) {
  return await productsRepository.getProductById(id);
}

// Create a new product
export async function createProduct(product: IProduct) {
  return await productsRepository.createProduct(product);
}

export async function addRating(userRating: IRating, productId: string) {
  return await productsRepository.addRating(userRating, productId);
}

// Update an existing product
export async function updateProduct(id: string, product: IProduct) {
  const newProduct = await productsRepository.getProductById(id);
  if (product.quantity === CONSTANTS.ZERO) {
    const outOfStockmessage = `Product ${newProduct?.name} is out of stock`;

    publishNotification({
      userId: newProduct!.seller,
      message: outOfStockmessage,
    });

    publishAdminAlert({
      message: outOfStockmessage,
    });
  }
  return await productsRepository.updateProduct(id, product);
}

// Delete a product
export async function deleteProduct(id: string) {
  return await productsRepository.deleteProduct(id);
}
