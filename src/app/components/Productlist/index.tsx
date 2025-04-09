'use client';

import React, { useEffect, useState } from 'react';
import styles from './Productlist.module.css';
import FilterSidebar from '../FilterSidebar';
import ProductCard from '../ProductCard';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import useIsMobile from '../../hooks/useIsMobile';

export interface Product {
  id: number;
  label?: string;
  image: string;
  title: string;
  description: string;
  price: number;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function ProductList() {
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<string>('recommended');
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [showOverlayFilter, setShowOverlayFilter] = useState<boolean>(false);
  const isMobile = useIsMobile();

  // Fetch data from Fakestore API
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        // Map the data to our local interface
        const mappedData: Product[] = data.map((item: Product) => ({
          id: item.id,
          title: item.title,
          image: item.image,
          description: item.description,
          price: item.price,
          category: item.category,
          rating: {
            rate: item.rating.rate,
            count: item.rating.count,
          },
        }));
        setProducts(mappedData);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const toggleOverlayFilter = () => {
    setShowOverlayFilter((prev) => !prev);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSortOption(selectedValue);
    const sortedProducts = [...products].sort((a, b) => {
      if (selectedValue === 'priceLowToHigh') {
        return a.price - b.price;
      } else if (selectedValue === 'priceHighToLow') {
        return b.price - a.price;
      } else if (selectedValue === 'ratingHighToLow') {
        return (b.rating?.rate || 0) - (a.rating?.rate || 0);
      } else if (selectedValue === 'newestFirst') {
        return b.id - a.id; // Assuming newer products have higher IDs
      } else if (selectedValue === 'popular') {
        return (b.rating?.rate || 0) - (a.rating?.rate || 0);
      }
      return 0;
    });
    setProducts(sortedProducts);
  };

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategory(categories);
  };

  const filteredProducts = products.filter((product) =>
    selectedCategory.length === 0 || selectedCategory.includes('All') || selectedCategory.includes(product.category)
  );

  console.log('Selected Categories:', selectedCategory);
  console.log('Filtered Products:', filteredProducts);

  return (
    <div className={styles.productListingPage}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.itemsCount}>
          {filteredProducts.length} items
        </div>
        <div className={styles.hideFilterBtn} onClick={toggleFilter}>
     {isMobile === false ? (
          showFilter ? (
            <span className={styles.filterBtnContent}>
              <BiChevronLeft size={30} />
              <span>Hide Filter</span>
            </span>
          ) : (
            <span className={styles.filterBtnContent}>
              <BiChevronRight size={30} />
              <span>Show Filter</span>
            </span>
          )
        ) : (
          <div className={styles.filterBtn} onClick={toggleOverlayFilter}>FILTERS</div>
        )}
      </div>

        {/* Recommended Dropdown */}
        <div className={styles.recommended}>
          <select
            className={styles.sortSelect}
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="recommended">Recommended</option>
            <option value="newestFirst">Newest First</option>
            <option value="popular">Popular</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Main Content: Sidebar + Products Grid */}
      <div className={styles.contentWrapper}>
        {showFilter && (
          <aside className={styles.sidebar}>
            {
                isMobile=== false &&
                    <FilterSidebar onCategoryChange={handleCategoryChange} />
            }
          </aside>
        )}

        <section className={styles.productsSection}>
          <div className={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          {isMobile && showOverlayFilter && (
            <div className={styles.overlayFilter}>
              <FilterSidebar onCategoryChange={handleCategoryChange} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
