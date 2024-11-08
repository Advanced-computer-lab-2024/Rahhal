import currencyExchange from "@/utils/currency-exchange";
import CardStyles from "../styles/ProductCard.module.css";
import { IoMdStar } from "react-icons/io";
import { useCurrencyStore } from "@/stores/currency-exchange-store";
import { getPriceValue } from "../utils/price-calculator";

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
  userName: string;
  rating: number;
  review?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  picture,
  price,
  seller,
  rating,
  onClick,
}) => {
  const basePrice = getPriceValue(price);
  const { currency } = useCurrencyStore();
  const convertedPrice = currencyExchange("EGP", basePrice);
  const displayPrice = convertedPrice ? convertedPrice.toFixed(0) : "N/A";
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

            <p>{rating?.toFixed(2)}</p>
          </div>
          <div className={CardStyles["product-card-container__language-time"]}>
            {/* language and opening time and availability goes here */}

            {price !== undefined && (
              <p>
                {displayPrice}
                <strong>{currency}</strong>
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
