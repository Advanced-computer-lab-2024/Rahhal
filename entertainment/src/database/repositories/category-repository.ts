import Category from "../models/Category";
import { ICategory } from "../models/Category";
export async function getAllCategories() {
  return await Category.find();
}

export async function getCategoryById(id: string) {
  return await Category.findById(id);
}

export async function createCategory(category: ICategory) {
  const newCategory = new Category(category);
  return await newCategory.save();
}

export async function updateCategory(id: string, category: ICategory) {
  return await Category.findByIdAndUpdate(
    id,
    category,
    { new: true, runValidators: true },
  );
}

export async function deleteCategory(id: string) {
  return await Category.findByIdAndDelete(id);
}
