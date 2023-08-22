import React from 'react';
import { CatalogList } from './catalog-list/catalog-list.component';
import styles from './header/home-page-mobile.module.scss';
import { HeaderMobile } from './header/mobile/header-mobile.component';
import { IHomePageProps } from './home-page-desktop.component';
import { SecondaryCatalog } from './secondary-catalog.component';

export default function HomePageMobileComponent({ primaryCatalogs }: IHomePageProps) {
  const primary = primaryCatalogs.slice(6, 12);
  const primaryAsCatalogs = primary.map(catalog => catalog.catalog);
  return (
    <div style={{height:"100vh"}}>
      <HeaderMobile />

      <div className={styles.mobile_secondary_catalogs__container}>
        <div className={styles.mobile_secondary_catalogs}>
          {primaryCatalogs.slice(0, 6).map(catalog =>
            <SecondaryCatalog
              key={catalog._id}
              secondaryCatalogId={catalog._id}
              catalog={catalog.catalog} />,
          )}
        </div>
      </div>

      <div className={styles.mobile_primary_catalogs}>
        <CatalogList
          isMobile
          catalogs={primaryAsCatalogs} />
      </div>
    </div>
  );
};
