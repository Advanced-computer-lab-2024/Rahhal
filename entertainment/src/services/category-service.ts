import * as categoryRepository from '../repositories/category-repository';

export const updatePreferenceTag = async (id: string, name:string) => {
    return await categoryRepository.updatePreferenceTag(id, name);
  }

export const deleteCategory = async (id: string) => {
    return await categoryRepository.deleteCategory(id);
  }