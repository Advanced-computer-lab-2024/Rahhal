import * as categoryRepository from '../database/repositories/category-repository';

export async function getAllCategories(){
    return await categoryRepository.getAllCategories();
}

export async function getCategoryById(id: string){
    return await categoryRepository.getCategoryById(id);
}

export async function createCategory(category: string){
    return await categoryRepository.createCategory(category.trim());
}

export async function updateCategory(id: string, categoryName: string){
  return await categoryRepository.updateCategory(id, categoryName.trim());
}

export async function deleteCategory (id: string){
  return await categoryRepository.deleteCategory(id);
}