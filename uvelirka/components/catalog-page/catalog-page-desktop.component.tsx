import React, { useMemo } from 'react';
import { ICatalogPageProps, splitInto } from '../../pages/catalog/[id]';
import { UserScope } from '../../utils/hooks/user.hook';
import { CatalogToolbar } from '../catalog/edit/toolbar/catalog-toolbar.component';
import { Filters } from '../catalog/filters';
import { Paginator } from '../common/paginator/paginator.component';
import { CatalogHeader } from '../home/header/catalog-header/catalog-header.component';
import { AddToCart } from '../product/add-to-cart/add-to-cart.component';
import { LikeProduct } from '../product/like-product/like-product.component';
import { ProductItem } from '../product/product-item.component';
import styles from './catalog-page-desktop.module.scss';

export const CatalogPageDesktop = ({ page: { page, limit, total, items, tags }, catalog, currentUrl }:ICatalogPageProps) => {
  const rows = useMemo(() => splitInto(items, 3), [items]);

  return <div>
    <CatalogToolbar catalog={catalog} />

    <CatalogHeader catalog={catalog} />

    <div className={styles.content}>
      <Filters tags={tags}
               currentUrl={currentUrl} />

      <div className={styles.catalogpage__productssection}>
        {rows.map((row, index) =>
          <div className={styles.productrow}
               key={index}>
            {row.map(product =>
              <ProductItem key={product._id}
                           product={product}>
                <UserScope>
                  <LikeProduct productId={product._id} />
                  <AddToCart productId={product._id} />
                </UserScope>
              </ProductItem>,
            )}
          </div>)}

        <div className={styles.catalogpage__paginatorsection}>
          <Paginator total={total}
                     paginatorSize={9}
                     page={page}
                     limit={limit}
                     catalogId={catalog._id} />
        </div>
      </div>
    </div>
  </div>;
};
