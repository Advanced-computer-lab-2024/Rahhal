export type TRating = {
  userId: string;
  userName: string;
  rating: number;
  review?: string;
};

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

export type TOrderProduct = {
  name: string;
  price: number;
  quantity: number;
  seller: string;
  picture: string;
  productId: string;
};


export type TOrder = {
  _id: Types.ObjectId;
  userId: string;
  orderStatus: OrderStatus;
  paymentMethod: PaymentMethod;
  items: TOrderProduct[];
  totalPrice: number;
  totalQuantity: number;
  promoCode?: string;
  discountAmount?: number;
  billingAddress?: string;
  shippingAddress: string;
  createdAt: Date;
};
