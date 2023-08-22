import { useMemo } from 'react';
import { AddToCartIcon } from '../../../svg/add-to-cart.icon';
import { AddedCartIcon } from '../../../svg/added-cart-icon';
import { CartIcon } from '../../../svg/cart.icon';
import { RemoveFromCartIcon } from '../../../svg/remove-from-cart.icon';
import { c } from '../../../utils/classname.utils';
import { useOrder } from '../../../utils/hooks/order.hook';
import { useToggleProductInCart } from '../../../utils/hooks/toggle-product-in-cart.hook';
import styles from './add-to-cart.module.scss';

export const AddToCart = ({
  productId,
  isMobile,
}: { productId: string, isMobile?: boolean }) => {
  const { order } = useOrder();
  const { toggleLikeSuppressWrapper } = useToggleProductInCart(productId);
  const addedToCart = useMemo(
    () => order.products.some(product => product._id === productId),
    [order, productId],
  );


  return <div onClick={toggleLikeSuppressWrapper}
              className={c(styles.addtocart, {
                [styles.addtocart_liked]: addedToCart,
                [styles.addtocart__mobile]: isMobile,
              })}>
    <CartIcon className={styles.addtocart__likeicon} />
    <AddedCartIcon className={styles.addtocart__addedicon} />
    <RemoveFromCartIcon className={styles.addtocart__unlikeicon} />
    <AddToCartIcon className={styles.addtocart__addlikeicon} />
  </div>;
};
