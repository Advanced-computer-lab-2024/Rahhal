import { Category } from "../models/Category";

export const updateCategory = async (id: string, name: string) => {
    return Category.findByIdAndUpdate(id, { name}, { new: true });
  
  }

export const deleteCategory = async (id: string) => {
    return Category.findByIdAndDelete(id);
}

export async function createCategory(category: any){
  const newCategory = new Category(category);  
  return await newCategory.save();
}

export async function getCategories(){
    return await Category.find();
}
