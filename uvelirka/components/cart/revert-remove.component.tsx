import styles from './revert-remove.module.scss';
import { useToggleProductInCart } from '../../utils/hooks/toggle-product-in-cart.hook';
import { Button } from '../common/button/button.component';

export const RevertRemoveComponent = ({ productId }: { productId: string }) => {
  const { toggleLikeSuppressWrapper } = useToggleProductInCart(productId);

  return <div className={styles.revertremove}>
    <div className={styles.revertremove__label}>
      Удалён из <span>корзины</span>
    </div>
    <Button filled
            small
            onClick={toggleLikeSuppressWrapper}
            text="Вернуть в корзину"
            className={styles.revertremove__revert} />
  </div>;
};
