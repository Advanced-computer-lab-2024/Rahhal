import { SERVICES_URLS } from "@/lib/constants";
import { TNewProduct, TProduct } from "@/features/seller/utils/seller-columns";
import axios from "axios";
import { renameProductImage } from "@/features/seller/utils/seller-firebase";

//TODO - later it should be by owner and some other type of handling
export async function fetchUserProducts(userId: string) {
  const response = await axios.get(SERVICES_URLS.USER + `/users/${userId}/products`);
  return response.data;
}

export async function fetchProducts() {
  const response = await axios.get(SERVICES_URLS.PRODUCT + "/products");
  return response.data;
}

export async function createProduct(
  newProductData: TNewProduct,
  userId: string,
  productImages: FileList | null,
) {
  const urls: string[] = [];

  newProductData.picture = "";
  newProductData.seller = userId;
  newProductData.ratings = [{ rating: Math.floor(Math.random() * 5) + 1, userId: userId }];
  const response = await axios.post(SERVICES_URLS.PRODUCT + "/products", newProductData);
  const productId = (response.data as TProduct)._id;

 
  // adjust name of uploaded pictures
  if (productImages && productId) {
    productImages = renameProductImage(productImages, userId, productId);
  }

  for (let i = 0; i < productImages!.length; i++) {
    const formData = new FormData();
    formData.append("image" + i, productImages![i]);
    const response = await axios.post(SERVICES_URLS.FIREBASE + "/upload-multiple-files", formData);
    urls.push((response.data as string[])[0]);
  }

  newProductData.picture = urls[0];

  await axios.patch(`${SERVICES_URLS.PRODUCT}/products/${productId}`, newProductData);

  alert("Product created successfully");
  window.location.reload();
}

export async function updateProduct(productData: TProduct, productImages: FileList | null) {
  const urls: string[] = [];
  
  // adjust name of uploaded pictures
  if (productImages) {
    productImages = renameProductImage(productImages, productData.seller, productData._id);
  }

  for (let i = 0; i < productImages!.length; i++) {
    const formData = new FormData();
    formData.append("image" + i, productImages![i]);
    const response = await axios.post(SERVICES_URLS.FIREBASE + "/upload-multiple-files", formData);
    urls.push((response.data as string[])[0]);
  }

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
