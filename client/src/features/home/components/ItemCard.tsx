import React from 'react';
import styles from '@/features/home/styles/ItemCard.module.css';
import imagePlaceHolder from "@/assets/imageNotavail.png";
import { getPriceValue } from "./GeneralGridView";
import { useCurrencyStore } from "@/stores/currency-exchange-store";
import currencyExchange from '@/utils/currency-exchange';
interface ItemCardProps {
  image: string;
  title: string;
  price: number;
  onRate?: () => void;
}


const ItemCard: React.FC<ItemCardProps> = ({ image, title, price, onRate }) => {
  
  const { currency } = useCurrencyStore();
  const convertedPrice = currencyExchange("EGP", price);
  const displayPrice = convertedPrice ? convertedPrice.toFixed(0) : "N/A";

  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} onError={(e) => e.currentTarget.src = imagePlaceHolder} />
      <div className={styles.details}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.price}>{currency} {displayPrice}</p>
        <a className={styles.rate} onClick={onRate}>Rate</a>
      </div>
    </div>
  );
};

export default ItemCard;
