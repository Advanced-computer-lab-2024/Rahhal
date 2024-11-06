export const getPriceValue = (
  price:
    | number
    | { min: number; max: number }
    | { type: string; price: number }[]
    | Record<string, number>,
) => {
  if (price === undefined || price === null) {
    return 0; // Return a default value (0) when price is not defined
  }
  if (typeof price === "number") return price;
  if ("min" in price && "max" in price) return price.min;
  if ("foreigner" in price && "native" in price && "student" in price)
    return Math.min(price.foreigner, price.native, price.student);
  if (Array.isArray(price)) {
    return price.length > 0 ? Math.min(...price.map((p) => p.price)) : 0;
  }

  return Object.values(price).length > 0 ? Math.min(...Object.values(price)) : 0;
};
