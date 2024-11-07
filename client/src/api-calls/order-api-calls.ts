import { SERVICES_URLS } from "@/lib/constants";
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
  return response.data;
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
