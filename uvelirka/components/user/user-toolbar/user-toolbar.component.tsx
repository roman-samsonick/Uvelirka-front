import cookie from 'cookiejs';
import { IPropsWithClassname } from '../../../models/common.model';
import { SignOutIcon } from '../../../svg/sign-out.icon';
import { UserIcon } from '../../../svg/user.icon';
import { c } from '../../../utils/classname.utils';
import { useUser } from '../../../utils/hooks/user.hook';
import styles from './user-toolbar.module.scss';
import { CartIcon } from '../../../svg/cart.icon';
import { Dialog } from '../../common/dialog/dialog.component';
import { useCallback, useState } from 'react';
import { Cart } from '../../cart/cart.component';
import Link from 'next/link';
import { userCabinetPath } from '../../../utils/path.utils';

const signOut = () => {
  cookie.remove('jwt');
  location.reload();
};

export const UserToolbar = ({ className }: IPropsWithClassname) => {
  const { user } = useUser();
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCart = useCallback(() => setCartOpen(o => !o), []);

  return <div className={c(styles.usertoolbar, className)}>
    <Link href={userCabinetPath} className={styles.usertoolbar__user}>
      <UserIcon className={styles.usertoolbar__usericon} />

      {user!.name}
    </Link>

    <CartIcon onClick={toggleCart}
              className={styles.usertoolbar__carticon} />

    {cartOpen && <Dialog title="Корзина"
                         onClose={toggleCart}>
      <Cart onCartClose={toggleCart}/>
    </Dialog>}

    <SignOutIcon className={styles.usertoolbar__signouticon}
                 onClick={signOut} />
  </div>;
};
