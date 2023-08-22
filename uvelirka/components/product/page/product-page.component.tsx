import React from 'react';
import { CURRENCY } from '../../../constants/currency.constants';
import { IProduct } from '../../../models/product.model';
import { EditIcon } from '../../../svg/edit.icon';
import { useToggleProductInCart } from '../../../utils/hooks/toggle-product-in-cart.hook';
import { useIsAddToCart } from '../../../utils/hooks/use-add-to-cart.hook';
import EditButton from '../../home/catalog-list/edit/edit-button.component';
import { CatalogHeader } from '../../home/header/catalog-header/catalog-header.component';
import { EditProductName } from '../edit/name/edit-product-name.component';
import { IMediaViewItemProps } from '../media/media-preview-item.component';
import { MediaView } from '../media/media-preview.component';
import { ProductTagsTable } from '../tags/product-tags.component';
import styles from './product-page.module.scss';

export interface IProductPageProps {
  product: IProduct;
  media: IMediaViewItemProps[];
}

export const ProductPage = ({
  product,
  media,
}: IProductPageProps) => {
  const { toggleLikeSuppressWrapper } = useToggleProductInCart(product._id);
  return (
    <div>
      <CatalogHeader hideCatalogList={true}
                     catalog={product.catalog} />

      <div className={styles.productpage}>
        <div className={styles.productpage__content}>
          <div className={styles.productpage__info}>
            <div>
              <div className={styles.productpage__name}>
                {product.name}
                <EditButton dialogTitle="Изменить название"
                            button={<EditIcon />}>
                  <EditProductName productId={product._id}
                                   name={product.name} />
                </EditButton>
              </div>

              <MediaView className={styles.productpage__media}
                         items={media} />
            </div>

            <div className={styles.productpage__card}>
              <div className={styles.productpage__catalog}>
                Каталог: {product.catalog.name}
              </div>
              <div className={styles.productpage__separator} />
              <ProductTagsTable tags={product.tags} />
              <div className={styles.productpage__spacer} />
              <div className={styles.productpage__pricecontainer}>
                <div className={styles.productpage__price}>
                  {product.price} {CURRENCY}
                </div>

                <button onClick={toggleLikeSuppressWrapper}>
                  {useIsAddToCart(product._id) ? 'Удалить из корзины' : 'Добавить в корзину'}
                </button>
              </div>
            </div>
          </div>

          <div className={styles.productpage__description}>
            {product.description}
          </div>
        </div>
      </div>
    </div>
  );
};

