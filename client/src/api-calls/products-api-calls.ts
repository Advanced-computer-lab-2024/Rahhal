import { SERVICES_URLS } from "@/lib/constants";
import { TNewProduct, TProduct } from "@/features/seller/utils/seller-columns";
import axios from "axios";
import { renameProductImage } from "@/features/seller/utils/seller-firebase";
import { uploadToFirebase } from "@/utils/firebase";

export async function fetchUserProducts(userId: string) {
  const response = await axios.get(SERVICES_URLS.PRODUCT + "/products", {
    params: {
      seller: userId,
    },
  });
  return response.data;
}

export async function fetchProductById(productId: string) {
  const response = await axios.get(
    `${SERVICES_URLS.PRODUCT}/products/${productId}`
  );
  return response.data;
}

export async function fetchProducts() {
  const response = await axios.get(SERVICES_URLS.PRODUCT + "/products");
  return response.data;
}

export async function fetchAvailableProducts() {
  const response = await axios.get(
    SERVICES_URLS.PRODUCT + "/products/available"
  );
  return response.data;
}

export async function createProduct(
  newProductData: TNewProduct,
  userId: string,
  userName: string,
  productImages: FileList | null
) {
  newProductData.picture = "placeholder"; // TODO: Change this to Rahhal logo
  newProductData.sellerName = userName;
  newProductData.seller = userId;
  const response = await axios.post(
    SERVICES_URLS.PRODUCT + "/products",
    newProductData
  );
  const productId = (response.data as TProduct)._id;

  const urls: string[] = await uploadToFirebase(
    productImages,
    userId,
    productId,
    renameProductImage
  );

  newProductData.picture = urls[0];

  return await axios.patch(
    `${SERVICES_URLS.PRODUCT}/products/${productId}`,
    newProductData
  );
}

export async function updateProduct(
  productData: TProduct,
  productImages: FileList | null
) {
  const urls: string[] = await uploadToFirebase(
    productImages,
    productData.seller,
    productData._id,
    renameProductImage
  );

  productData.picture = urls[0];

  const response = await axios.patch(
    `${SERVICES_URLS.PRODUCT}/products/${productData!._id}`,
    productData
  );
  return response;
}

export async function updateProductStock(productId: string, quantity: number) {
  await axios.patch(`${SERVICES_URLS.PRODUCT}/products/${productId}`, {
    quantity,
  });
}

export async function deleteProduct(id: string) {
  const response = await axios.delete(
    `${SERVICES_URLS.PRODUCT}/products/${id}`
  );
  return response;
}
