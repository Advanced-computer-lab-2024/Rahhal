import { ICategory } from '../database/models/Category';
import * as categoryRepository from '../database/repositories/category-repository';

export async function updateCategory(id: string, categoryName:string){
    return await categoryRepository.updateCategory(id, categoryName.trim());
  }

export async function deleteCategory (id: string){
    return await categoryRepository.deleteCategory(id);
  }

export async function createCategory(category: ICategory){
    category.name = category.name.trim();
    return await categoryRepository.createCategory(category);
}

export async function getCategories(){
    return await categoryRepository.getCategories();
}