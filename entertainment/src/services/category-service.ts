import * as categoryRepository from '../database/repositories/category-repository';

export async function getAllCategories() {
  return await categoryRepository.getAllCategories();
}

export async function getCategoryById(id: string) {
  return await categoryRepository.getCategoryById(id);
}

export async function createCategory(categoryName: string) {
  const newCategory = { name: categoryName.trim() };
  return await categoryRepository.createCategory(newCategory);
}

export async function updateCategory(id: string, categoryName: string) {
  const newCategory = { name: categoryName.trim() };
  return await categoryRepository.updateCategory(id, newCategory);
}

export async function deleteCategory(id: string) {
  return await categoryRepository.deleteCategory(id);
}