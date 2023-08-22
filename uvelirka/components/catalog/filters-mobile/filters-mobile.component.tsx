import React, { useRef, useState } from 'react';
import { IProductTagVariant } from '../../../models/product-tag-variant.model';
import { CloseIcon } from '../../../svg/close.icon';
import { FilerIcon } from '../../../svg/filer.icon';
import { c } from '../../../utils/classname.utils';
import { useBackdropClick } from '../../../utils/hooks/useBackdropClick.hook';
import { FilterTagVariant } from '../filter-tag-variant.component';
import styles from './filters-mobile.module.scss';

export interface IMobileFiltersProps {
  readonly tags: IProductTagVariant[];
  readonly currentUrl: string;
}

export function FiltersMobile(
  {
    tags,
    currentUrl,
  }: IMobileFiltersProps,
) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const onBackdropClick = () => {
    if (!isFiltersOpen) {
      return;
    }
    setIsFiltersOpen(false);
  };

  useBackdropClick(containerRef, onBackdropClick, isFiltersOpen);

  return (
    <>
      <div className={styles.filters_mobile__open_button}
           onClick={() => {
             setIsFiltersOpen(true);
           }}>
        Фильтры
        <FilerIcon className={styles.filters_mobile__filter_icon} />
      </div>

      <div className={c(styles.filters_mobile__container, { [styles.filters_mobile__container___active]: isFiltersOpen })}>
        <div ref={containerRef}
             className={c(styles.filters_mobile, { [styles.filters_mobile___active]: isFiltersOpen })}>
          <div className={styles.filters_mobile__title}>
            Фильтры
            <CloseIcon className={styles.filters_mobile__close_icon}
                       onClick={onBackdropClick} />
          </div>

          {tags.map(tag =>
            <div key={tag.name}
                 className={styles.filter_mobile}>
              <div className={styles.filter_mobile__header}>
                {tag.name}
              </div>

              {tag.values.map(tagVariant =>
                <FilterTagVariant key={tagVariant}
                                  name={tag.name}
                                  isMobile
                                  value={tagVariant}
                                  currentUrl={currentUrl} />,
              )}
            </div>,
          )}
        </div>
      </div>
    </>
  );
}
