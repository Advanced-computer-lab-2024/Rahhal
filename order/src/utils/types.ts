import type { OrderStatus } from "@/database/models/Order";
import { ObjectIdSchemaDefinition, Types } from "mongoose";

export interface OrderQueryParams {
  userId?: string;
  orderStatus?: OrderStatus;
  seller?: string;
  productId?: string;
}

export interface IWishlist {
  user: string;
  product: string;
};

export interface CartItem {
  productId: string;
  quantity: number;
};

export interface ICart{
  _id: Types.ObjectId;
  userId: string;
  products: CartItem[];
}
