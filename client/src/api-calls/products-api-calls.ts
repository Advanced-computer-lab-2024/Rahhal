import { SERVICES_URLS } from "@/lib/constants";
import { TNewProduct, TProduct } from "@/features/seller/utils/seller-columns";
import axios from "axios";
import { renameProductImage } from "@/features/seller/utils/seller-firebase";
import { uploadToFirebase } from "@/utils/firebase";

//TODO - later it should be by owner and some other type of handling
export async function fetchUserProducts(userId: string) {
  const response = await axios.get(SERVICES_URLS.USER + `/users/${userId}/products`);
  return response.data;
}

export async function fetchProductById(productId: string) {
  const response = await axios.get(`${SERVICES_URLS.PRODUCT}/products/${productId}`);
  return response.data;
}

export async function fetchProducts() {
  const response = await axios.get(SERVICES_URLS.PRODUCT + "/products");
  return response.data;
}

export async function fetchAvailableProducts() {
  const response = await axios.get(SERVICES_URLS.PRODUCT + "/products/available");
  return response.data;
}

export async function createProduct(
  newProductData: TNewProduct,
  userId: string,
  userName: string,
  productImages: FileList | null,
) {
  newProductData.picture = "placeholder"; // TODO: Change this to Rahhal logo
  newProductData.sellerName = userName;
  newProductData.seller = userId;
  const response = await axios.post(SERVICES_URLS.PRODUCT + "/products", newProductData);
  const productId = (response.data as TProduct)._id;

  const urls: string[] = await uploadToFirebase(
    productImages,
    userId,
    productId,
    renameProductImage,
  );

  newProductData.picture = urls[0];

  await axios.patch(`${SERVICES_URLS.PRODUCT}/products/${productId}`, newProductData);

  alert("Product created successfully");
  window.location.reload();
}

export async function updateProduct(productData: TProduct, productImages: FileList | null) {
  const urls: string[] = await uploadToFirebase(
    productImages,
    productData.seller,
    productData._id,
    renameProductImage,
  );

  productData.picture = urls[0];

  await axios.patch(`${SERVICES_URLS.PRODUCT}/products/${productData!._id}`, productData);
  alert("Product updated successfully");
  window.location.reload();
}

export async function deleteProduct(product: TProduct) {
  await axios.delete(`${SERVICES_URLS.PRODUCT}/products/${product._id}`);
  alert("Product deleted successfully");
  window.location.reload();
}
