import { paymentAxiosInstance } from "@/utils/axios-instances";

export async function getAllPromocodes() {
    return await paymentAxiosInstance.get("/promocode");
}

export async function createPromocode(body: string) {
    return await paymentAxiosInstance.post("/promocode", body);
}

export async function updatePromocode(id: string, body: string) {
    return await paymentAxiosInstance.patch(`/promocode/${id}`, body);
}

export async function deletePromocode(id: string) {
    return await paymentAxiosInstance.delete(`/promocode/${id}`);
}

export async function applyPromocode(id: string, body: string) {
    return await paymentAxiosInstance.post(`/promocode/${id}`, body);
}

export async function usePromocode(id: string, body: string) {
    return await paymentAxiosInstance.post(`/promocode/use/${id}`, body);
}