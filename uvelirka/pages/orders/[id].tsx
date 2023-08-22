import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import React, { useMemo } from 'react';
import { Header } from '../../components/home/header/header.component';
import { IMediaViewItemProps } from '../../components/product/media/media-preview-item.component';
import { MediaView } from '../../components/product/media/media-preview.component';
import { IOrder } from '../../models/order.model';
import { ITag } from '../../models/tag.model';
import { getRequestSSR } from '../../utils/axios.utils';
import { IIsMobile } from '../../utils/device.utils';
import { getAuthServerSideProps } from '../../utils/hooks/user.hook';
import { orderPath } from '../../utils/path.utils';
import { reduceTags } from '../../utils/tags.utils';
import styles from './order.module.scss';

interface IOrderPageQuery extends ParsedUrlQuery {
  readonly id: string;
}

interface IOrderPageProps {
  readonly order: IOrder;
}

export const getServerSideProps = getAuthServerSideProps(
  async context => {
    const query = context.query as IOrderPageQuery;
    const order = await getRequestSSR<IOrder>(context, `/order/one/${query.id}`);
    return {
      props: {
        order,
      },
    };
  }, false,
);

export default function OrderPageComponent({
  order,
  isMobile,
}: IIsMobile & IOrderPageProps) {
  const orderDate = Intl.DateTimeFormat('ru', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());

  return (
    <div className={styles.order_page}>
      <Header className={styles.order_page__header} />

      <div className={styles.order__meta}>
        <Link
          className={styles.order__id}
          href={orderPath(order._id)}>
          Заказ
          <div className={styles.order__id___link}>
            #{order._id}
          </div>
        </Link>

        <div className={styles.order__time}>
          {orderDate}
        </div>
      </div>

      <div className={styles.order__container}>
        <div className={styles.order__header}>
          <div className={styles.order__title}>
            {order.name}
          </div>
        </div>
        <div className={styles.order_products__container}>
          {order.products.map(product => {
            const items = useMemo(
              () => product.mediaUrls.map(mediaUrl => ({
                mediaUrl,
                alt: product.name,
              } as IMediaViewItemProps)),
              [product.mediaUrls, product.name],
            );
            return (
              <Link href={`/product/${product._id}`}
                    style={{ width: '49%' }}
              key={product._id}>
                <div className={styles.order_product__container}>
                  <MediaView className={styles.order_product__image}
                             items={items}
                  />

                  <div className={styles.order_product__content}>
                    <div className={styles.order_product__title}>
                      {product.name}
                    </div>

                    <OrderTags tags={product.tags} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface IOrderTagsProps {
  tags: ITag[];
}

const OrderTags = ({ tags }: IOrderTagsProps) => {
  const t = useMemo(() => reduceTags(tags), [tags]);
  const titles = useMemo(() => Object.keys(t), [t]);
  const values = useMemo(() => Object.values(t), [t]);

  return (
    <div className={styles.order_product__tags_container}>
      <div className={styles.order_product__tags_titles}>
        {titles.map(title => <div key={title} className={styles.tag__title}>{title}</div>)}
      </div>

      <div className={styles.order_product__tags_values}>
        {values.map((valueVariant, index) =>
          <div className={styles.tag__value} key={index}>{valueVariant.join(' , ')}</div>,
        )}
      </div>
    </div>
  );
};
