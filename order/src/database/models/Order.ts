import { Schema, model } from "mongoose";
import type { Types } from "mongoose";

export enum PaymentMethod {
  wallet = "wallet",
  creditCard = "creditCard",
  cash = "cash",
}

export enum OrderStatus {
  received = "received",
  processing = "processing",
  shipped = "shipped",
  delivered = "delivered",
  cancelled = "cancelled",
}

export interface IItem {
  name: string;
  price: number;
  quantity: number;
  seller: string;
  picture: string; // this will be needed if we want to display the item picture in the order history
  productId: string;
}

export interface IOrder {
  _id: Types.ObjectId;
  userId: string;
  orderDate: Date;
  orderStatus: OrderStatus;
  paymentMethod: PaymentMethod;
  items: IItem[];
  totalPrice: number;
  totalQuantity: number;
  promoCode?: string;
  discountAmount?: number;
  billingAddress?: string;
  shippingAddress: string;
}

const orderSchema = new Schema<IOrder>({
  userId: { type: String, required: true },
  orderDate: { type: Date, required: true },
  orderStatus: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.processing },
  paymentMethod: { type: String, required: true, enum: Object.values(PaymentMethod) },
  items: {
    type: [
      {
        name: String,
        price: Number,
        quantity: Number,
        seller: String,
        picture: String,
        productId: String,
      },
    ],
    required: true,
  },
  totalPrice: { type: Number, required: true },
  totalQuantity: { type: Number, required: true },
  promoCode: { type: String },
  discountAmount: { type: Number },
  billingAddress: { type: String },
  shippingAddress: { type: String, required: true },
});

const Order = model<IOrder>("Order", orderSchema);

export default Order;
