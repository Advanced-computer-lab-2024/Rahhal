import Product from "../models/Product";
import type { IProduct } from "../models/Product";

// Get all products
export async function getAllProducts() {
  return Product.find();
}

// Get all available products 
export async function getAvailableProducts() {
  return Product.find({ archived: false });
}

// Get product by id
export async function getProductById(id: string) {
  return Product.findById(id);
}

export async function getActivitiesBySeller(sellerId: string) {
  return await Product.find({ seller: sellerId }).exec();
}

// Create a new product
export async function createProduct(product: IProduct) {
  const newProduct = new Product(product);
  return await newProduct.save();
}

// Update an existing product
export async function updateProduct(id: string, productData: IProduct) {
  return await Product.findByIdAndUpdate(id, productData, {
    new: true,
    runValidators: true,
  });
}

// Delete a product
export async function deleteProduct(id: string) {
  return await Product.findByIdAndDelete(id);
}
