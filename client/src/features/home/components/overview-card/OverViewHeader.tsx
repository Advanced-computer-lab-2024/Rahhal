import React from "react";
import { TbRosetteDiscount } from "react-icons/tb";
import styles from "../../styles/Overview-card-styles/OverViewHeader.module.css";

interface HeaderProps {
  currency: string;
  originalPrice: number;
  discountedPrice?: number; // Optional for cases without discount
}

const Header: React.FC<HeaderProps> = ({ currency, originalPrice, discountedPrice }) => {
  return (
    <div className={styles.header}>
      <div className={styles.priceInfo}>
        {discountedPrice ? (
          <>
            <span className={styles.originalPrice}>Total: EGP {originalPrice}</span>
            <span className={styles.discountedPrice}>
              <TbRosetteDiscount className={styles.discountIcon} /> EGP {discountedPrice}
            </span>
          </>
        ) : (
          <span className={styles.noDiscountPrice}>Total: {currency} {originalPrice}</span>
        )}
      </div>
      <hr className={styles.separator} />
    </div>
  );
};

export default Header;