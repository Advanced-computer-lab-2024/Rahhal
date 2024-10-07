import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";
import { TProduct } from "@/table-columns/seller-columns";

// fetch data from the server
export const fetchProducts = async () => {
  const response = await axios.get(SERVICES_URLS.PRODUCT + "/products");
  return response.data;
};

// delete product from products endpoint
export const deleteproduct = async (product: TProduct) => {
  console.log(product);
  await axios.delete(`${SERVICES_URLS.PRODUCT}/products/${product._id}`);
};

// submit product to the products endpoint
export const submitproduct = async (
  productData: TProduct | undefined,
  isNewproduct: boolean,
) => {
  if (isNewproduct) {
    await axios.post(SERVICES_URLS.PRODUCT + "/products", productData).then((response) => {
      console.log(response.data);
    });
  } else {
    if (productData) {
      await axios.patch(
        `${SERVICES_URLS.PRODUCT}/products/${productData._id}`,
        productData,
      );
    }
  }
};
