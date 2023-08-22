import Link from 'next/link';
import { useState } from 'react';
import { ICallback } from '../../models/common.model';
import { IProduct } from '../../models/product.model';
import { CartIcon } from '../../svg/cart.icon';
import { CompleteIcon } from '../../svg/complete.icon';
import { postRequest } from '../../utils/axios.utils';
import { useOrder } from '../../utils/hooks/order.hook';
import { orderPath, rootCatalog } from '../../utils/path.utils';
import { Button } from '../common/button/button.component';
import { ProductItem } from '../product/product-item.component';
import styles from './cart.module.scss';
import { RemoveProductFromCart } from './remove-product-from-cart.component';
import { RevertRemoveComponent } from './revert-remove.component';

export const Cart = ({ onCartClose }: { onCartClose: ICallback }) => {
  const {
    order,
    setOrder,
  } = useOrder();
  const [initialProducts, setInitialProducts] = useState<IProduct[]>(order.products);
  const removed = initialProducts.map(p => p._id)
    .filter(pId => !order.products.some(other => other._id === pId));
  const [submittedOrderId, setSubmittedOrderId] = useState<string>();

  const submitOrder = async () => {
    setSubmittedOrderId(await postRequest('order/submit'));
    setOrder({
      ...order,
      products: [],
    });
    setInitialProducts([]);
  };

  if (submittedOrderId) {
    return <div className={styles.cart__submitted}>
      <div className={styles.cart__submittedlabel}>
        Заказ успешно оформлен!
      </div>

      <CompleteIcon className={styles.cart__submittedicon} />

      <div className={styles.cart__actions}>
        <Link href={orderPath(submittedOrderId)}>
          <Button text="Посмотреть заказ" />
        </Link>
      </div>
    </div>;
  }

  return initialProducts.length
    ? <>
        <div className={styles.cart__products}>
         {initialProducts.map(product => <ProductItem className={styles.cart__product}
                                                      small
                                                      product={product}
                                                      key={product._id}>
           {removed.includes(product._id)
             ? <RevertRemoveComponent productId={product._id} />
             : <RemoveProductFromCart productId={product._id} />
           }
         </ProductItem>)}
         </div>

         <div className={styles.cart__actions}>
            <Button text="Заказать"
                    onClick={submitOrder} />
         </div>
    </>
    : <>
      <div className={styles.cart_empty__text}>
        Ваша корзина пуста
      </div>

      <div className={styles.cart_empty__text}>
        Давайте в неё что-нибудь добавим
      </div>

      <div className={styles.cart_empty__actions}>
        <CartIcon className={styles.cart_empty__icon} />

        <Link href={rootCatalog}>
          <Button text="Перейти в каталог"
                  onClick={onCartClose}
                  className={styles.cart_empty__button} />
        </Link>
      </div>
    </>;
};
