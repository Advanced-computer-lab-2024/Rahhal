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

export type TPromocode = {
  _id: string;
  code: string;
  type: string;
  isActive: boolean;
  expiresAt: Date;
  value: number;
  uses: number;
};

export interface INotification {
  _id: string;
  userId: string;
  message: string;
  seen: boolean;
}
export interface IPayload{
  id: string;
  username: string;
  role: string;
  dob?: Date;
}

export enum Roles {
  ADMIN = "admin",
  TOURIST = "tourist",
  TOURGUIDE = "tourGuide",
  ADVERTISER = "advertiser",
  SELLER = "seller",
  TOURISMGOVERNOR = "tourismGovernor",
  GUEST = "guest"
}