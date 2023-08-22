import React from 'react';
import { CURRENCY } from '../../../../constants/currency.constants';
import { CatalogHeaderMobile } from '../../../home/header/catalog-header/catalog-header-mobile.component';
import { MediaView } from '../../media/media-preview.component';
import { ProductTagsTableMobile } from '../../tags/mobile/product-tags-mobile.component';
import { IProductPageProps } from '../product-page.component';
import styles from './product-page-mobile.module.scss';

export const ProductPageMobile = ({ product, media }: IProductPageProps) => {
  return (
    <>
    <CatalogHeaderMobile catalog={product.catalog} hideCatalogList/>

    <div className={styles.productpage__mobile}>
      <div className={styles.productpage__name}>
        {product.name}
      </div>

      <MediaView className={styles.productpage__mobile__media}
                 items={media} />
      <div className={styles.productpage__mobile__separator} />
      <div className={styles.productpage__catalog}>
        Каталог: {product.catalog.name}
      </div>
      <div className={styles.productpage__mobile__separator} />

      <ProductTagsTableMobile tags={product.tags} />

      <div className={styles.productpage__mobile__separator} />

      <div className={styles.productpage__mobile__cart}>
        <div className={styles.productpage__mobile__price}>
          {product.price} {CURRENCY}
        </div>

        <button className={styles.productpage__mobile__cart_button}>Добавить в корзину</button>
      </div>

      <div className={styles.productpage__mobile__separator} />

      <div className={styles.productpage__mobile__description}>
        {product.description}
      </div>
    </div>
   </>
  );
};

