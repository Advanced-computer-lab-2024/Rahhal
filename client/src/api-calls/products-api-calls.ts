import { SERVICES_URLS } from "@/lib/constants";
import { TNewProduct, TProduct } from "@/table-columns/seller-columns";
import axios from "axios";

//TODO - later it should be by owner and some other type of handling
export async function fetchUserProducts(userId: string) {
  const response = await axios.get(SERVICES_URLS.USER + `/users/${userId}/products`);
  return response.data;
}

export async function createProduct(newProductData: TNewProduct, userId: string) {
  newProductData.seller = userId;
  newProductData.ratings = [{ rating: Math.floor(Math.random() * 5) + 1, userId: userId }];
  await axios.post(SERVICES_URLS.PRODUCT + "/products", newProductData);
}

export async function updateProduct(productData: TProduct) {
  await axios.patch(`${SERVICES_URLS.PRODUCT}/products/${productData!._id}`, productData);
}

export async function deleteProduct(product: TProduct) {
  await axios.delete(`${SERVICES_URLS.PRODUCT}/products/${product._id}`);
}
