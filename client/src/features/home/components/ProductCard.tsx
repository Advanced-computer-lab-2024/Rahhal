import CardStyles from "../styles/ProductCard.module.css";
import { IoMdStar } from "react-icons/io";

interface ProductCardProps {
  title: string;
  picture: string;
  price: number;
  seller: string;
  rating: number;
  onClick?: () => void;
}

export interface IRating {
  userId: string;
  rating: number;
  review?: string;
}

export const getPriceValue = (
  price:
    | number
    | { min: number; max: number }
    | { foreigner: number; native: number; student: number }
    | { type: string; price: number }[],
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

  return 0;
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  picture,
  price,
  seller,
  rating,
  onClick,
}) => {
  return (
    <>
      <div className={CardStyles["product-card-container"]} onClick={onClick}>
        <div className={CardStyles["product-card-container__image"]}>
          {/* image and bookmark goes here */}
          <img src={picture} alt="product" />
        </div>

        <div className={CardStyles["product-card-container__details"]}>
          <div className={CardStyles["product-card-container__title-location"]}>
            {/* title and location goes here */}
            <h3>{title}</h3>
          </div>
          <div className={CardStyles["product-card-container__rating"]}>
            {/* rating goes here */}
            <IoMdStar style={{ fontSize: "0.8rem" }} />

            <p>{rating?.toPrecision(2)}</p>
          </div>
          <div className={CardStyles["product-card-container__language-time"]}>
            {/* language and opening time and availability goes here */}

            {price !== undefined && (
              <p>
                {price}
                <strong>{"  EGP"}</strong>
              </p>
            )}
          </div>

          <div className={CardStyles["product-card-container__price"]}>
            {seller === undefined && <h5>From {getPriceValue(price)} EGP</h5>}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
