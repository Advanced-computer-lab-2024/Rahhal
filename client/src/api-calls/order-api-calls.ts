import { SERVICES_URLS } from "@/lib/constants";
import { TOrder } from "@/features/home/types/home-page-types";
import axios from "axios";

// fetch all orders from orders endpoint
export async function fetchAllOrders() {
  const response = await axios.get(SERVICES_URLS.ORDER + `/orders`);
  return response.data;
}

// fetch orders by user id
export async function fetchUserOrders(userId: string) {
  const response = await axios.get(SERVICES_URLS.ORDER + `/orders`, {
    params: {
      userId: userId,
    },
  });
  return response.data as TOrder[];
}

// fetch orders by product id
export async function fetchProductOrders(productId: string) {
  const response = await axios.get(SERVICES_URLS.ORDER + `/orders`, {
    params: {
      productId: productId,
    },
  });
  return response.data;
}


export async function rateProduct(
  productId: string,
  orderId: string,
  rating: number,
  review: string
) {
  const response = await axios.patch(
    `${SERVICES_URLS.ORDER}/orders/rate-product/${orderId}`,
    {
      productId,
      rating,
      review,
    }
  );
  return response.data;
}