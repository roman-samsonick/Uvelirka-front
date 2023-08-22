import Link from 'next/link';
import Carousel, { ResponsiveType } from 'react-multi-carousel';
import { IOrder } from '../../../models/order.model';
import background from '../../../public/background.png';
import { useRequestedState } from '../../../utils/hooks/use-requested-state.hook';
import { useUser } from '../../../utils/hooks/user.hook';
import { rootCatalog } from '../../../utils/path.utils';
import { Button } from '../../common/button/button.component';
import { Header } from '../../home/header/header.component';
import { ProductItem } from '../../product/product-item.component';
import styles from './user-cabinet.module.scss';

export const responsive: ResponsiveType = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 0,
    },
    items: 2,
    paritialVisibilityGutter: 60,
  },
  mobile: {
    breakpoint: {
      max:900,
      min:0,
    },
    items:2,
    paritialVisibilityGutter:30
  },
};

export const UserCabinet = () => {
  const { state: orders } = useRequestedState<IOrder[]>({
    initialState: [],
    requestPath: 'order',
  });
  const { user } = useUser();

  return (
    <div>
      <div className={styles.usercabinet__headercontainer}
           style={{ backgroundImage: `url(${background.src})` }}>
        <Header />
      </div>

      <div className={styles.usercabinet__top}>
        <div className={styles.usercabinet__user}>
          <img className={styles.usercabinet__useravatar}
               referrerPolicy="no-referrer"
               alt={user?.name}
               width={300}
               height={300}
               src={user?.avatar} />
          <div className={styles.usercabinet__username}>
            {user?.name}
          </div>

          <div className={styles.usercabinet__useremail}>
            {user?.email}
          </div>
        </div>

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
                  deviceType="desktop"
                  responsive={responsive}
                >
                  {order.products.map(product =>
                    <ProductItem key={product._id}
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
    </div>
  );
};
