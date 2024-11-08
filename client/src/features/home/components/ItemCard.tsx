import React, { useState, useEffect } from "react";
import styles from "@/features/home/styles/ItemCard.module.css";
import imagePlaceHolder from "@/assets/imageNotavail.png";
import { useCurrencyStore } from "@/stores/currency-exchange-store";
import currencyExchange from "@/utils/currency-exchange";
import { FaStar } from "react-icons/fa";
import { IItem } from "@/features/home/types/home-page-types";

interface ItemCardProps {
  item: IItem;
  onRate?: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onRate }) => {
  const [isRated, setIsRated] = useState(item.rating?.rating !== undefined);


  useEffect(() => {
    setIsRated(item.rating?.rating !== undefined);
  }, [item.rating]);

  const { currency } = useCurrencyStore();
  const convertedPrice = currencyExchange("EGP", Number(item.price));
  const displayPrice = convertedPrice ? convertedPrice.toFixed(0) : "N/A";

  return (
    <div className={styles.card}>
      <img
        src={item.picture}
        alt={item.name}
        className={styles.image}
        onError={(e) => (e.currentTarget.src = imagePlaceHolder)}
      />
      <div className={styles.details}>
        <h3 className={styles.title}>{item.name}</h3>
        <p className={styles.price}>
          {currency} {displayPrice}
        </p>
        <div className={styles.rating}>
          {isRated ? (
            <div style={{ display: "flex", flexDirection: "row" }}>
              {Array.from({ length: item.rating?.rating ?? 0 }, (_, i) => (
                <FaStar key={i} className={styles.star} />
              ))}
            </div>
          ) : (
            <a className={styles.rate} onClick={onRate}>
              Rate
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;