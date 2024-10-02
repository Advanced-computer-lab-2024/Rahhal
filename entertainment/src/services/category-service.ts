import * as categoryRepository from '../repositories/category-repository';

export const updateCategory = async (id: string, name:string) => {
    return await categoryRepository.updateCategory(id, name);
  }

export const deleteCategory = async (id: string) => {
    return await categoryRepository.deleteCategory(id);
  }

export async function createCategory(category: any){
    return await categoryRepository.createCategory(category);
}

export async function getCategories(){
    return await categoryRepository.getCategories();
}