type Promotion = {
  type: "percentage" | "fixed" | "shipping";
  value: number;
  description: string;
};

type ActivePromotion = {
  code: string;
  promotion: Promotion;
};

type Product = {
  _id: string;
  name: string;
  seller: string;
  picture: string;
  price: number;
};

interface CartItem {
  product: Product;
  quantity: number;
}

type Cart = {
  _id: string;
  user: string;
  products: IPopulatedCartItem[];
};
