import { OrderStatus } from "@/database/models/Order";

export interface OrderQueryParams {
    userId?: string;
    orderStatus?: OrderStatus;
    seller?: string;
    productId?: string;
  }
