import { GarbageIcon } from '../../svg/garbage.icon';
import styles from './remove-product-from-cart.module.scss';
import { useToggleProductInCart } from '../../utils/hooks/toggle-product-in-cart.hook';

export const RemoveProductFromCart = ({ productId }: { productId: string }) => {
  const { toggleLikeSuppressWrapper } = useToggleProductInCart(productId);

  return <GarbageIcon onClick={toggleLikeSuppressWrapper}
                      className={styles.removeproductfromcart} />;
};
