import Category from "../models/Category";

export async function getAllCategories() {
  return await Category.find();
}

export async function getCategoryById(id: string) {
  return await Category.findById(id);
}

export async function createCategory(category: string) {
  const newCategory = new Category(category);
  return await newCategory.save();
}

export async function updateCategory(id: string, name: string) {
  return await Category.findByIdAndUpdate(
    id,
    { name },
    { new: true, runValidators: true },
  );
}

export async function deleteCategory(id: string) {
  return await Category.findByIdAndDelete(id);
}