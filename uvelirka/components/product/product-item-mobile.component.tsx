import Link from 'next/link';
import React from 'react';
import { c } from '../../utils/classname.utils';
import { productPath } from '../../utils/path.utils';
import { IProductItemProps } from './product-item.component';
import styles from './product-item-mobile.module.scss';

export const currency ="₽"

export const ProductItemMobile = ({
  product, children, small, className,
}: IProductItemProps) => {
  return <Link className={c(styles.productitem, { [styles.productitem_small]: small }, className)}
               href={productPath(product._id)}>
    {children}

    <div className={styles.productitem__imagewrapper}>
      <img className={styles.productitem__image}
           src={product.mediaUrls[0]}
           alt={product.name} />
      <div className={styles.productitem__imagewrapperoverlay} />
    </div>

    <div className={styles.productitem__name}>
      {product.name}
    </div>

    <div className={styles.productitem__pricecontainer}>
      <div className={styles.productitem__price}>
        {product.price}
        <span className={styles.productitem_pricecurrency}>{currency}</span>
      </div>
    </div>
  </Link>;
};
