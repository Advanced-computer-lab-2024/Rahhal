import { Category } from "../models/Category";

export const updatePreferenceTag = async (id: string, name: string) => {
    return Category.findByIdAndUpdate(id, { name}, { new: true });
  
  }

export const deleteCategory = async (id: string) => {
    return Category.findByIdAndDelete(id);
}
