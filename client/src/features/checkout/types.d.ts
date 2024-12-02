type Promotion = {
  type: "percentage" | "fixed" | "shipping";
  value: number;
  description: string;
};

type ActivePromotion = {
  code: string;
  promotion: Promotion;
};
