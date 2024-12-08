import { SERVICES_URLS } from "@/lib/constants";
import axios from "axios";
import { TCategory } from "@/features/admin/utils/columns-definitions/categories-columns";

// fetch available categories from categories endpoint
export const fetchCategories = async () => {
  const { data } = await axios.get(SERVICES_URLS.ENTERTAINMENT + "/categories");
  return data;
};

// delete category by id
export const deleteCategory = async (id: string) => {
  const response = await axios.delete(SERVICES_URLS.ENTERTAINMENT + "/categories/" + id);
  return response;
};

// submit category to categories endpoint
export const submitCategory = async (
  categoryData: TCategory | undefined,
  isNewCategory: boolean,
) => {
  if (isNewCategory) {
      const response = await axios.post(SERVICES_URLS.ENTERTAINMENT + "/categories", categoryData);
      return response;
  } else {
    if (categoryData) {
      const response = await axios.patch(
        `${SERVICES_URLS.ENTERTAINMENT}/categories/${categoryData._id}`,
        categoryData,
      );
      return response;
    }
  }
};
