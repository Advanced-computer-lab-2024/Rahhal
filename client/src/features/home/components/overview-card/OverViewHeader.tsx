import React from "react";
import styles from "../../styles/Overview-card-styles/OverViewHeader.module.css";
import { TbRosetteDiscount } from "react-icons/tb";
import currencyExchange from "@/utils/currency-exchange";

interface HeaderProps {
  currency: string;
  originalPrice?: number;
  discount?: number; // Optional for cases without discount
  promocodeDiscount?: number; // Optional for cases with a promo code discount
}

const Header: React.FC<HeaderProps> = ({
  currency,
  originalPrice,
  discount,
  promocodeDiscount,
}) => {
  const convertedPrice = originalPrice ? currencyExchange("EGP", originalPrice) : undefined;

  const discountedPrice =
    discount && discount != 0 && convertedPrice
      ? convertedPrice - (convertedPrice * discount) / 100
      : undefined;

  const promocodeDiscountedPrice = promocodeDiscount
    ? discountedPrice
      ? discountedPrice - discountedPrice * (promocodeDiscount / 100)
      : convertedPrice
        ? convertedPrice - convertedPrice * (promocodeDiscount / 100)
        : undefined
    : discountedPrice;

  const displayDiscountedPrice = promocodeDiscountedPrice
    ? promocodeDiscountedPrice.toFixed(0)
    : undefined;

  const displayOriginalConvertedPrice = convertedPrice ? convertedPrice.toFixed(0) : "N/A";

  return (
    <div className={styles.header}>
      <div className={styles.priceInfo}>
        {promocodeDiscountedPrice ? (
          <>
            <span className={styles.originalPrice}>
              Total: {currency} {displayOriginalConvertedPrice}
            </span>
            <span className={styles.promocodeDiscountedPrice}>
              <TbRosetteDiscount className={styles.discountIcon} /> {currency}{" "}
              {displayDiscountedPrice}
            </span>
          </>
        ) : (
          <span className={styles.noDiscountPrice}>
            Total: {currency} {displayOriginalConvertedPrice}
          </span>
        )}
      </div>
      <hr className={styles.separator} />
    </div>
  );
};

export default Header;
