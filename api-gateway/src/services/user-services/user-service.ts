import {
  userAxiosInstance,
  entertainmentAxiosInstance,
  productAxiosInstance,
} from "@/utils/axios-instances";

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

export async function updateUser(id: string, body: string) {
  return await userAxiosInstance.patch(`/users/${id}`, body);
}

export async function deleteUser(id: string) {
  return await userAxiosInstance.delete(`/users/${id}`);
}

export async function loginUser(body: string) {
  return await userAxiosInstance.post("/users/login", body);
}
