import cookie from 'cookiejs';
import Link from 'next/link';
import React, { MouseEvent, useState } from 'react';
import { BurgerIcon } from '../../../../svg/burger.icon';
import { GoogleIcon } from '../../../../svg/google.icon';
import { SearchIcon } from '../../../../svg/search.icon';
import { UserIcon } from '../../../../svg/user.icon';
import { c } from '../../../../utils/classname.utils';
import { AnonymousScope, UserScope, useUser } from '../../../../utils/hooks/user.hook';
import { CartMobile } from '../../../cart/mobile/cart-mobile.component';
import { MobileMenu } from '../../../mobile-menu/mobile-menu.component';
import { openSignInPopup, useSignIn } from '../../../user/auth-dropdown.component';
import styles from './header-mobile.module.scss';

export const HeaderMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const { user } = useUser();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <div className={styles.header_mobile__container}>
        <div className={styles.header_mobile__icon_button}
             onClick={() => setIsMenuOpen(true)}>
          <BurgerIcon className={styles.header_mobile__burger_icon} />
        </div>

      <Link href={"/"}>
          <div className={styles.header_mobile__title}>
          Gzirishvili
        </div>
      </Link>

        <div className={styles.header_mobile__icon_button}
             style={{ marginRight: '-30px' }}>
          <SearchIcon className={styles.header_mobile__search_icon} />
        </div>

        <div className={styles.header_mobile__icon_button}
             onClick={() => setIsAccountMenuOpen(true)}>
          {user?.avatar
            ?
            <img
              className={styles.header_mobile__user_avatar}
              src={user.avatar}
              alt="user" />
            : <UserIcon className={styles.header_mobile__user_icon} />
          }
        </div>

        <AnonymousScope>
          <AuthAccountMenu isAccountMenuOpen={isAccountMenuOpen}
                           setIsAccountMenuOpen={setIsAccountMenuOpen} />
        </AnonymousScope>

        <UserScope>
          <UserAccountMenu isAccountMenuOpen={isAccountMenuOpen}
                           setIsAccountMenuOpen={setIsAccountMenuOpen}
                           setIsCartOpen={setIsCartOpen} />
        </UserScope>
      </div>

      <MobileMenu setIsMenuOpen={setIsMenuOpen}
                  isMenuOpen={isMenuOpen} />

      {isCartOpen && <CartMobile setIsCartOpen={setIsCartOpen}
                                 isCartOpen={isCartOpen} />}
    </>
  );
};

interface IAccountMenuProps {
  setIsAccountMenuOpen: (isOpen: boolean) => void;
  isAccountMenuOpen: boolean;
  setIsCartOpen?: (isCartOpen: boolean) => void;
}

export const AuthAccountMenu = ({
  setIsAccountMenuOpen,
  isAccountMenuOpen,
}: IAccountMenuProps) => {
  const handleBackdropClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains(styles.account_menu__container)) {
      setIsAccountMenuOpen(false);
    }
    event.stopPropagation();
  };

  useSignIn();

  return (
    <div className={c(styles.account_menu__container, { [styles.account_menu__container___active]: isAccountMenuOpen })}
         onClick={() => handleBackdropClick}>
      <div className={c(styles.account_menu, { [styles.account_menu___active]: isAccountMenuOpen })}>
        <div className={styles.auth__menu__title}>
          Sign in with:
        </div>

        <div
          className={styles.auth__menu__item}
          onClick={openSignInPopup}>
          <GoogleIcon className={styles.auth_menu__google_icon} />
          oogle
        </div>
      </div>
    </div>
  );
};

export const UserAccountMenu = ({
  setIsAccountMenuOpen,

  isAccountMenuOpen,
  setIsCartOpen,
}: IAccountMenuProps) => {


  const handleBackdropClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains(styles.account_menu__container)) {
      setIsAccountMenuOpen(false);
    }
    event.stopPropagation();
  };

  const signOut = () => {
    cookie.remove('jwt');
    location.reload();
  };

  const openCartHandler = () => {
    setIsAccountMenuOpen(false);
    setIsCartOpen?.(true);
  };

  return (
    <div className={c(styles.account_menu__container, { [styles.account_menu__container___active]: isAccountMenuOpen })}
         onClick={handleBackdropClick}>
      <div className={c(styles.account_menu, { [styles.account_menu___active]: isAccountMenuOpen })}>
        <div className={styles.user__menu__items}>
          <Link href={"/user"} className={styles.user__menu__item}>
            Аккаунт
          </Link>

          <div className={styles.user__menu__item}
               onClick={openCartHandler}>
            Корзина
          </div>

          <div className={styles.user__menu__item}>
            Лайки
          </div>

          <div className={styles.user__menu__item}
               onClick={signOut}>
            Выйти
          </div>
        </div>
      </div>
    </div>
  );
};



