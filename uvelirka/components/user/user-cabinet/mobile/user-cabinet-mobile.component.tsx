import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import { IOrder } from '../../../../models/order.model';
import { IUser } from '../../../../models/user.model';
import { useRequestedState } from '../../../../utils/hooks/use-requested-state.hook';
import { useUser } from '../../../../utils/hooks/user.hook';
import { rootCatalog } from '../../../../utils/path.utils';
import { Button } from '../../../common/button/button.component';
import { HeaderMobile } from '../../../home/header/mobile/header-mobile.component';
import { ProductItemMobile } from '../../../product/product-item-mobile.component';
import { responsive } from '../user-cabinet.component';
import styles from './user-cabinet-mobile.module.scss';

export const UserCabinetMobile = () => {

  const { state: orders } = useRequestedState<IOrder[]>({
    initialState: [],
    requestPath: 'order',
  });
  const { user } = useUser();
  if (!user) {
    return;
  }

  return (
    <div>
      <HeaderMobile />

      <UserHeader user={user} />

      {orders.length > 0
        ?
        <div className={styles.usercabinet__orders}>
          {orders.map(order =>
            <div className={styles.usercabinet__order}
                 key={order._id}>
              <div className={styles.usercabinet__ordername}>{order.name}</div>

              <Carousel
                className={styles.usercabinet__orderproducts}
                ssr
                deviceType="mobile"
                responsive={responsive}
              >
                {order.products.map(product =>
                  <ProductItemMobile key={product._id}
                                     small
                                     className={styles.usercabinet__orderproduct}
                                     product={product} />,
                )}
              </Carousel>
            </div>,
          )}
        </div>
        :
        <div className={styles.usercabinet__empty}>
          <div className={styles.usercabinet__empty_title}>
            Заказов пока нет.
          </div>

          <div className={styles.usercabinet__empty_title}>
            ¯\_(ツ)_/¯
          </div>

          <Link rel="stylesheet"
                href={rootCatalog}>
            <Button text="Вернуться в каталог"
                    className={styles.usercabinet__empty_button} />
          </Link>
        </div>
      }
    </div>
  );
};

const UserHeader = ({ user }: { user: IUser }) => {
  return (
    <div className={styles.user_header}>
      <img src={user.avatar}
           className={styles.user_header__avatar}
           alt="" />

      <div className={styles.user_header__text_container}>
        <div className={styles.user_header__username}>
          {user.name}
        </div>

        <div className={styles.user_header__email}>
          {user.email}
        </div>
      </div>
    </div>
  );
};
