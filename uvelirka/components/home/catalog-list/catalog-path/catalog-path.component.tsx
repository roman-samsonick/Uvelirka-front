import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, MouseEvent } from 'react';
import { ICatalog } from '../../../../models/catalog.models';
import { IPropsWithClassname, IValueCallback } from '../../../../models/common.model';
import { RightArrowIcon } from '../../../../svg/rightArrow.icon';
import { c } from '../../../../utils/classname.utils';
import { catalogPath, ROOT_CATALOG_ID, rootCatalog, rootCatalogItem } from '../../../../utils/path.utils';
import styles from './catalog-path.module.scss';

interface ICatalogPathComponentProps extends IPropsWithClassname {
  readonly catalog: ICatalog;
  readonly onItemClick?: IValueCallback<ICatalog>;
}

export const CatalogPath = (
  {
    catalog: {
      path,
      name,
      _id,
    },
    className,
    onItemClick,
  }: ICatalogPathComponentProps,
) => {
  const handleItemClick = (event: MouseEvent, item: ICatalog) => {
    if (onItemClick) {
      event.stopPropagation();
      event.preventDefault();
      onItemClick(item);
    }
  };

  const { back } = useRouter();
  const isRoot = _id === ROOT_CATALOG_ID;

  return <div className={c(styles.path, className)}>
    <RightArrowIcon className={styles.path__back_icon}
                    onClick={() => back()} />

    <Link className={c({ [styles.path__item]: !isRoot })}
          onClick={event => handleItemClick(event, rootCatalogItem)}
          href={rootCatalog}>
      Каталог
    </Link>
    {path.map(item =>
      <Fragment key={item._id}>
        <div className={styles.path__separator}>/</div>
        <Link onClick={event => handleItemClick(event, item)}
              className={styles.path__item}
              href={catalogPath(item._id)}>
          {item.name}
        </Link>
      </Fragment>,
    )}
    {!isRoot && <>
      <div className={styles.path__separator}>/</div>
      <div className={styles.path__item_last}>{name}</div>
    </>}
  </div>;
};
