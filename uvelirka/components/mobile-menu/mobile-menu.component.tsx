import Link from 'next/link';
import React, { useRef } from 'react';
import { IValueCallback } from '../../models/common.model';
import { CloseIcon } from '../../svg/close.icon';
import { RightArrowIcon } from '../../svg/rightArrow.icon';
import { c } from '../../utils/classname.utils';
import { useBackdropClick } from '../../utils/hooks/useBackdropClick.hook';
import styles from './mobile-menu.module.scss';

interface IMobileMenu {
  isMenuOpen: boolean,
  setIsMenuOpen: IValueCallback<boolean>;
}

export const MobileMenu = ({
  setIsMenuOpen,
  isMenuOpen,
}: IMobileMenu) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const onBackdropClick = () => {
    setIsMenuOpen(false);
  };

  useBackdropClick(containerRef, onBackdropClick, isMenuOpen);

  return (
    <div className={c(styles.mobile_menu__container, { [styles.mobile_menu__container___active]: isMenuOpen })}>
      <div ref={containerRef}
           className={c(styles.mobile_menu, { [styles.mobile_menu___active]: isMenuOpen })}>

        <div className={styles.mobile_menu__header}>
          <div className={styles.mobile_menu__header_title}>
            меню
          </div>

          <CloseIcon className={styles.mobile_menu__close_icon}
                     onClick={() => setIsMenuOpen(false)} />
        </div>

        <div className={styles.mobile_menu__content}>
          <Link href={'/'}>
            <MobileMenuItem title="Главная" />
          </Link>

          <Link href={'/contacts'}>
            <MobileMenuItem title="Контакты" />
          </Link>

          <Link href={'/user'}>
            <MobileMenuItem title="Личный кабинет" />
          </Link>
        </div>
      </div>
    </div>
  );
};

interface IMobileMenuItemProps {
  title: string,
}

export const MobileMenuItem = ({ title }: IMobileMenuItemProps) => {
  return (
    <div className={styles.mobile_menu_item__container}>
      <div className={styles.mobile_menu_item__title}>
        {title}
      </div>

      <RightArrowIcon className={styles.mobile_menu_item__arrow_icon} />
    </div>
  );
};
