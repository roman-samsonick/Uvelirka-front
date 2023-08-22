import Link from 'next/link';
import React, { MouseEvent, useState } from 'react';
import { IProduct } from '../../../models/product.model';
import { CloseIcon } from '../../../svg/close.icon';
import { CompleteIcon } from '../../../svg/complete.icon';
import { postRequest } from '../../../utils/axios.utils';
import { c } from '../../../utils/classname.utils';
import { useOrder } from '../../../utils/hooks/order.hook';
import { orderPath } from '../../../utils/path.utils';
import { Button } from '../../common/button/button.component';
import styles from './cart-mobile.module.scss';

interface ICartMobileProps {
  isCartOpen: boolean;
  setIsCartOpen: (isCartOpen: boolean) => void;
}

export const CartMobile = ({
  setIsCartOpen,
  isCartOpen,
}: ICartMobileProps) => {
  const {
    order,
    setOrder,
  } = useOrder();
  const [initialProducts, setInitialProducts] = useState<IProduct[]>(order.products);
  const [submittedOrderId, setSubmittedOrderId] = useState<string>();
  const submitOrder = async () => {
    setSubmittedOrderId(await postRequest('order/submit'));
    setOrder({
      ...order,
      products: [],
    });
    setInitialProducts([]);
  };

  const handleBackdropClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains(styles.cart_mobile__container)) {
      setIsCartOpen(false);
    }
    event.stopPropagation();
  };

  if (submittedOrderId) {
    return (
      <div className={c(styles.cart_mobile__container,
        styles.cart_mobile__container___active,
        styles.cart_mobile__container___center)}
           onClick={handleBackdropClick}>
        <div className={c(styles.cart_mobile,
          styles.cart_mobile___center,
          { [styles.cart_mobile___active]: isCartOpen })}>
          <div className={styles.cart_mobile__title}>
            <div className={styles.cart_mobile__title_text}>
              Заказ оформлен
            </div>

            <CloseIcon className={styles.cart_mobile__close_icon}
                       onClick={() => setIsCartOpen(false)} />
          </div>

          <CompleteIcon className={styles.cart_mobile__submitted_icon} />

          <div className={styles.cart_mobile__submitted_button}>
            <Link href={orderPath(submittedOrderId)}>
              <Button text="Посмотреть заказ" />
            </Link>
          </div>
        </div>
      </div>);
  }

  if (!initialProducts.length) {
    return (
      <div className={c(styles.cart_mobile__container, { [styles.cart_mobile__container___active]: isCartOpen })}
           onClick={handleBackdropClick}>
        <div className={c(styles.cart_mobile,
          styles.cart_mobile___center,
         )}>
          <div className={styles.cart_mobile__title}>
            <div className={styles.cart_mobile__title_text}>
              КОРЗИНКА ПУСТА
            </div>

            <CloseIcon className={styles.cart_mobile__close_icon}
                       onClick={() => setIsCartOpen(false)} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={c(styles.cart_mobile__container, { [styles.cart_mobile__container___active]: isCartOpen })}
         onClick={handleBackdropClick}>
      <div className={c(styles.cart_mobile, { [styles.cart_mobile___active]: isCartOpen })}>
        <div className={styles.cart_mobile__title}>
          <div className={styles.cart_mobile__title_text}>
            КОРЗИНКА
          </div>
          <CloseIcon className={styles.cart_mobile__close_icon}
                     onClick={() => setIsCartOpen(false)} />
        </div>

        <div className={styles.cart_mobile__products}>
          {order.products.map(product => {
            return <Link href={`/product/${product._id}`}
                         className={styles.cart_mobile__product}>
              <div className={styles.cart_mobile__product}>
                <img className={styles.cart_mobile__product_image}
                     src={product.mediaUrls[0]}
                     alt="" />

                <div className={styles.cart_mobile__product_text___glass} />

                <div className={styles.cart_mobile__product_text}>
                  <div className={styles.cart_mobile__product_title}>
                    {product.name}
                  </div>

                  <div className={styles.cart_mobile__product_price}>
                    {product.price} ₽
                  </div>
                </div>
              </div>
            </Link>;
          })}
        </div>

        <div className={styles.cart_mobile__order_button_container}>
          <div className={styles.cart_mobile__order_button}
               onClick={submitOrder}>
            Заказать
          </div>
        </div>
      </div>
    </div>
  );
};
