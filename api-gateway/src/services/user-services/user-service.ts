import {
  userAxiosInstance,
  entertainmentAxiosInstance,
  productAxiosInstance,
} from "@/utils/axios-instances";
import type { TRating } from "@/utils/types";

// users service calls
export async function getApprovedUsers() {
  return await userAxiosInstance.get("/users?approved=true");
}

export async function getUsersPendingRequests() {
  return await userAxiosInstance.get("/users?approved=false");
}

export async function getUserById(id: string) {
  return await userAxiosInstance.get(`/users/${id}`);
}

export async function getUserActivities(userId: string) {
  return await entertainmentAxiosInstance.get(`/activities?ownerId=${userId}`);
}

export async function getUserHistoricalPlaces(userId: string) {
  return await entertainmentAxiosInstance.get(`/historical-places?ownerId=${userId}`);
}

export async function getUserProducts(userId: string) {
  return await productAxiosInstance.get(`/products?sellerId=${userId}`);
}

export async function createUser(body: string) {
  return await userAxiosInstance.post("/users", body);
}

export async function updateUser(
  id: string,
  body: string,
  amountPaid: string | undefined,
  amountRetrieved: string | undefined,
) {
  const queryParams = amountPaid
    ? `?amountPaid=${amountPaid}`
    : amountRetrieved
      ? `?amountRetrieved=${amountRetrieved}`
      : "";
  return await userAxiosInstance.patch(`/users/${id}` + queryParams, body);
}

export async function deleteUser(id: string) {
  return await userAxiosInstance.delete(`/users/${id}`);
}

export async function loginUser(body: string) {
  return await userAxiosInstance.post("/users/login", body);
}

export async function addUserRating(ratedUserId: string, rating: TRating) {
  return await userAxiosInstance.post(`/users/${ratedUserId}/ratings`, rating);
}

export async function redeemPoints(userId: string) {
  return await userAxiosInstance.patch(`/users/${userId}/redeem`);
}

export async function getNumberOfUsers(startDate?: string, endDate?: string) {
  return await userAxiosInstance.get(`/users/number-of-users`, { params: { startDate, endDate } });
}
