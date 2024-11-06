import React from 'react';
import styles from '@/features/home/styles/ItemCard.module.css';

interface ItemCardProps {
  imageSrc: string;
  title: string;
  price: string;
  onRate?: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ imageSrc, title, price,onRate }) => (
  <div className={styles.card}>
    <img src={imageSrc} alt={title} className={styles.image} />
    <div className={styles.details}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.price}>{price}</p>
      <a className={styles.rate} onClick={onRate}>Rate</a>
    </div>
  </div>
);

export default ItemCard;