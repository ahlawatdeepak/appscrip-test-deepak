import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ProductCard.module.css';
import { Product } from '../Productlist';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Link from 'next/link';

const ProductCard: React.FC<Product> = ({ image, title, description }) => {
  const [isWishlist, setIsWishlist] = useState<boolean>(false);
  return (
    <div className={styles.productCard}>
      <div className={styles.productImageWrap}>
        <Image 
          src={image} 
          alt={title} 
          className={styles.productImage} 
          width={300} 
          height={300}
          priority={true}
        />
      </div>
      <div className={styles.productInfo}>
        <div className={styles.productHeader}>
          <span className={styles.productName}>{title}</span>
          <button className={styles.wishlistButton} aria-label="Add to wishlist" onClick={() => setIsWishlist(!isWishlist)}>
            {isWishlist ? <AiFillHeart size={20} color= "red" /> : <AiOutlineHeart size={20} />}
          </button>
        </div>
        {description && <p className={styles.productDescription}>{description}</p>}

        <p className={styles.signInPrompt}>
          <Link href="/login">Sign in</Link> or <Link href="/register">Create an account</Link> to see pricing
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
