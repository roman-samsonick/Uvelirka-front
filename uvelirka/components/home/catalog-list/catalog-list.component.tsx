import React, { MouseEvent, ReactElement } from 'react';
import { ICatalog } from '../../../models/catalog.models';
import { IMapFunction, IPropsWithClassname, IValueCallback } from '../../../models/common.model';
import { c, PossibleClassnameValues } from '../../../utils/classname.utils';
import { catalogPath } from '../../../utils/path.utils';
import desktopStyles from './catalog-list.module.scss';
import mobileStyles from './catalog-list-mobile.module.scss';

export interface ICatalogList extends IPropsWithClassname {
  catalogs: ICatalog[];
  onCatalogClick?: IValueCallback<ICatalog>;
  onCatalogDoubleClick?: IValueCallback<ICatalog>;
  getCatalogClass?: IMapFunction<ICatalog, PossibleClassnameValues>;
  inCatalog?: (catalog: ICatalog, index: number) => ReactElement;
  isMobile?: boolean;
}

export const CatalogList = ({
  catalogs,
  className,
  onCatalogClick,
  onCatalogDoubleClick,
  getCatalogClass,
  inCatalog,
  isMobile,
}: ICatalogList) => {
  const handleCatalogClick = (catalog: ICatalog) => (event: MouseEvent) => {
    if (onCatalogClick) {
      event.preventDefault();
      event.stopPropagation();
      onCatalogClick(catalog);
    }
  };

  const handleCatalogDoubleClick = (catalog: ICatalog) => (event: MouseEvent) => {
    if (onCatalogDoubleClick) {
      event.preventDefault();
      event.stopPropagation();
      onCatalogDoubleClick(catalog);
    }
  };

  const catalogImage = (
    imageUrl: string,
  ) => `linear-gradient(180deg, rgba(180, 180, 180, 0) 20.31%, #333333 100%), url(${imageUrl})`;

  return <div className={c(className,
    { [desktopStyles.cataloglist]: !isMobile },
    { [mobileStyles.cataloglist]: isMobile })}>
    {catalogs.map((catalog, index) =>
      <a style={{ backgroundImage: catalogImage(catalog.imageUrl) }}
         className={c({ [desktopStyles.catalog]: !isMobile },
           { [mobileStyles.catalog]: isMobile },
           getCatalogClass?.(catalog))}
         onClick={handleCatalogClick(catalog)}
         onDoubleClick={handleCatalogDoubleClick(catalog)}
         key={`${catalog._id}_${index}`}
         href={catalogPath(catalog._id)}>
        {catalog.name}
        {inCatalog?.(catalog, index)}
      </a>,
    )}
  </div>;
};
