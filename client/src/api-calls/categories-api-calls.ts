import { SERVICES_URLS } from "@/lib/constants";
import axios from "axios";
import { TCategory } from "@/table-columns/categories-columns";

// fetch available categories from categories endpoint
export const fetchCategories = async () => {
  const response = await axios.get(SERVICES_URLS.ENTERTAINMENT + "/categories");
  return response.data;
};

// delete category by id
export const deleteCategory = async (id: string) => {
  const response = await axios.delete(SERVICES_URLS.ENTERTAINMENT + "/categories/" + id);
  return response.data;
};

// submit category to categories endpoint
export const submitCategory = async (categoryData: TCategory | undefined, isNewCategory: boolean) => {
  if (isNewCategory) {
    await axios.post(SERVICES_URLS.ENTERTAINMENT + "/categories", categoryData).then((response) => {
      console.log(response.data);
    });
  } else {
    if (categoryData) {
      await axios.patch(
        `${SERVICES_URLS.ENTERTAINMENT}/categories/${categoryData._id}`,
        categoryData,
      );
    }
  }
}
