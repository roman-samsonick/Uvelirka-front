import { useMemo } from 'react';
import { c } from '../../utils/classname.utils';
import { addQueryParam, createTagQuery, hasQueryParam, removeQueryParam, tagQueryParam } from '../../utils/path.utils';
import styles from './filter-tag-variant.module.scss';

interface IFilterTagVariantProps {
  readonly name: string;
  readonly value: string;
  readonly currentUrl: string;
  readonly isMobile?: boolean;
}

export function FilterTagVariant({
  name,
  value,
  currentUrl,
  isMobile,
}: IFilterTagVariantProps) {
  const tagQueryValue = useMemo(
    () => createTagQuery(name, value),
    [name, value],
  );

  const activated = useMemo(
    () => hasQueryParam(currentUrl, tagQueryParam, tagQueryValue),
    [currentUrl, name, value],
  );

  const url = useMemo(
    () => activated
      ? removeQueryParam(currentUrl, tagQueryParam, tagQueryValue)
      : addQueryParam(currentUrl, tagQueryParam, tagQueryValue),
    [activated, currentUrl, tagQueryValue],
  );

  return <a href={url}
            className={c(styles.filter__variant, { [styles.filter__variant__mobile]: isMobile })}>
    <div className={
      c(styles.filter__checkbox,
        { [styles.filter__checkbox_active]: activated },
        { [styles.filter__checkbox__mobile]: isMobile },
        { [styles.filter__checkbox_active__mobile +" "+ styles.filter__checkbox__mobile]: isMobile && activated },
      )}
    />
    {value}
  </a>;
}
