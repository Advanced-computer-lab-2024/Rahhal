import Category from "../models/Category";

export async function updateCategory(id: string, name: string){
    return Category.findByIdAndUpdate(id, { name}, { new: true });
  }

export async function deleteCategory(id: string){
    return Category.findByIdAndDelete(id);
}

export async function createCategory(category: any){
  const newCategory = new Category(category);  
  return await newCategory.save();
}

export async function getCategories(){
    return await Category.find();
}
