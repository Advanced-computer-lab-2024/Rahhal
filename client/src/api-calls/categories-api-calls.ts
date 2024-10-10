import { SERVICES_URLS } from "@/lib/constants";
import axios from "axios";
import { TCategory } from "@/table-columns/categories-columns";

// fetch available categories from categories endpoint
export const fetchCategories = async () => {
  const { data } = await axios.get(SERVICES_URLS.ENTERTAINMENT + "/categories");
  return data;
};

// delete category by id
export const deleteCategory = async (id: string) => {
  const response = await axios.delete(SERVICES_URLS.ENTERTAINMENT + "/categories/" + id);
  alert("Category deleted successfully");
  window.location.reload();
  return response.data;
};

// submit category to categories endpoint
export const submitCategory = async (
  categoryData: TCategory | undefined,
  isNewCategory: boolean,
) => {
  if (isNewCategory) {
    try {
      await axios.post(SERVICES_URLS.ENTERTAINMENT + "/categories", categoryData);
      console.log(categoryData);
    } catch (error) {
      console.log(categoryData);
    }
    alert("Category created successfully");
    window.location.reload();
  } else {
    if (categoryData) {
      await axios.patch(
        `${SERVICES_URLS.ENTERTAINMENT}/categories/${categoryData._id}`,
        categoryData,
      );
      alert("Category updated successfully");
      window.location.reload();
    }
  }
};
