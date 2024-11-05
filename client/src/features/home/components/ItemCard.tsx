import React from 'react';
import styles from '@/features/home/styles/ItemCard.module.css';

interface ItemCardProps {
  imageSrc: string;
  title: string;
  price: string;
}

const ItemCard: React.FC<ItemCardProps> = ({ imageSrc, title, price }) => (
  <div className={styles.card}>
    <img src={imageSrc} alt={title} className={styles.image} />
    <div className={styles.details}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.price}>{price}</p>
      <a href="#" className={styles.rate}>Rate</a>
    </div>
  </div>
);

export default ItemCard;