import React, { useMemo } from 'react';
import { ICatalogPageProps, splitInto } from '../../pages/catalog/[id]';
import { UserScope } from '../../utils/hooks/user.hook';
import { FiltersMobile } from '../catalog/filters-mobile/filters-mobile.component';
import { Paginator } from '../common/paginator/paginator.component';
import { CatalogHeaderMobile } from '../home/header/catalog-header/catalog-header-mobile.component';
import { AddToCart } from '../product/add-to-cart/add-to-cart.component';
import { LikeProduct } from '../product/like-product/like-product.component';
import { ProductItemMobile } from '../product/product-item-mobile.component';
import styles from './catalog-page-mobile.module.scss';


export const CatalogPageMobile = ({
  page: {
    page,
    limit,
    total,
    items,
    tags,
  },
  catalog,
  currentUrl,
}: ICatalogPageProps) => {

  const rows = useMemo(() => splitInto(items, 2), [items]);

  return (
    <div>
      <CatalogHeaderMobile catalog={catalog} />

      <div className={styles.content}>
        <FiltersMobile tags={tags}
                       currentUrl={currentUrl} />

        <div className={styles.catalogpage__productssection}>
          {rows.map((row, index) =>
            <div className={styles.productrow}
                 key={index}>
              {row.map(product =>
                <ProductItemMobile key={product._id}
                                   product={product}>
                  <UserScope>
                    <LikeProduct productId={product._id}
                                 isMobile />
                    <AddToCart productId={product._id}
                               isMobile />
                  </UserScope>
                </ProductItemMobile>,
              )}
            </div>)}

          <div className={styles.catalogpage__paginatorsection}>
            <Paginator
                       total={total}
                       paginatorSize={4}
                       page={page}
                       limit={limit}
                       catalogId={catalog._id} />
          </div>
        </div>
      </div>
    </div>
  );
};
