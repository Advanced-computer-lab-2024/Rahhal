import type { IRating } from "@/database/rating";
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

export async function addRating(userRating: IRating, productId: string) {
  return await Product.findByIdAndUpdate(
    productId,
    { $push: { ratings: userRating } },
    { new: true },
  );
}

export async function editRating(userId: string, productId: string, rating: Partial<IRating>) {
  if (!userId) {
    throw new Error("User ID is required to edit a rating.");
  }
  return await Product.findOneAndUpdate(
    { _id: productId, "ratings.userId": userId },
    { $set: { "ratings.$.rating": rating.rating, "ratings.$.review": rating.review } },
    { new: true },
  );
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
