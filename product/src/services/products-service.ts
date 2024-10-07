import type { IProduct } from "../database/models/Product";
import * as productsRepository from "../database/repositories/products-repository";

// Get all products
export async function getAllProducts(): Promise<IProduct[]> {
  return await productsRepository.getAllProducts();
}

// Get product by id
export async function getProductById(id: string) {
  return await productsRepository.getProductById(id);
}

export async function getProductsBySeller(sellerId: string) {
  return await productsRepository.getActivitiesBySeller(sellerId);
}
// Create a new product
export async function createProduct(product: IProduct) {
  return await productsRepository.createProduct(product);
}

// Update an existing product
export async function updateProduct(id: string, product: IProduct) {
  return await productsRepository.updateProduct(id, product);
}

// Delete a product
export async function deleteProduct(id: string) {
  return await productsRepository.deleteProduct(id);
}
