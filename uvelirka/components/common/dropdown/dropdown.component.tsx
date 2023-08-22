import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ICallback,
  IChild,
  IClickHandler,
  IPropsWithChildren,
  IPropsWithClassname,
} from '../../../models/common.model';
import { c } from '../../../utils/classname.utils';
import styles from './dropdown.module.scss';

function useClickOutSide<T extends HTMLElement>(handler: ICallback) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const clickHandler = (event: Event) => {
      if (!event.composedPath().includes(ref.current!)) {
        handler();
      }
    };

    document.addEventListener('click', clickHandler);

    return () => document.removeEventListener('click', clickHandler);
  }, [handler]);

  return ref;
}

export const DropdownItem = (
  {
    children,
    onClick,
  }: IPropsWithChildren & IClickHandler,
) => {
  return <div onClick={onClick}
              className={styles.dropdown__item}>
    {children}
  </div>;
};

export const Dropdown = (
  {
    title,
    children,
    className,
  }: { title: IChild } & IPropsWithChildren & IPropsWithClassname,
) => {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  return <div ref={useClickOutSide(close)}
              className={c(styles.dropdown, className)}>
    <div className={c(styles.dropdown__title, styles.dropdown__title_border)}
         onClick={() => setOpen(!open)}>
      {title}
    </div>
    {open &&
      <div className={styles.dropdown__list}>
        <div className={styles.dropdown__title}
             onClick={() => setOpen(!open)}>
          {title}
        </div>
        {children}
      </div>
    }
  </div>;
};
