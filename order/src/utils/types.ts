import type { OrderStatus } from "@/database/models/Order";

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
}

export interface ICart {
  userId: string;
  products: CartItem[];
}

export enum CartUpdates {
  EmptyCart = "emptyCart",
  RemoveProduct = "removeProduct",
  IncrementQuantity = "incrementQuantity",
  DecrementQuantity = "decrementQuantity",
}
