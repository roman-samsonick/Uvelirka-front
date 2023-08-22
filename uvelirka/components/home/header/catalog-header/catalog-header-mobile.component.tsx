import React from 'react';
import { CatalogPath } from '../../catalog-list/catalog-path/catalog-path.component';
import { SecondaryCatalog } from '../../secondary-catalog.component';
import Link from 'next/link';
import { catalogPath } from '../../../../utils/path.utils';
import { HeaderMobile } from '../mobile/header-mobile.component';
import styles from './catalog-header-mobile.module.scss';
import { ICatalogHeaderProps } from './catalog-header.component';

export const CatalogHeaderMobile = ({
  catalog,
  hideCatalogList,
}: ICatalogHeaderProps) => {
  return (
    <div>
      <HeaderMobile />
      <CatalogPath className={styles.catalogpage__path}
                   catalog={catalog} />

      <div className={styles.catalogpage__catalogs}>
        {catalog.children.map(cat => {
          return (
            <Link
              href={catalogPath(cat._id)}
              key={cat._id}
              className={styles.catalogpage__catalog}>

              <img src={cat.imageUrl}
                   className={styles.catalogpage__catalog__image}
                   alt="" />

              <div className={styles.catalogpage__catalog__title}>
                {cat.name}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
