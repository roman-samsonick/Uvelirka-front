import { IProduct } from '../../models/product.model';
import { productPath } from '../../utils/path.utils';
import { currency } from './product-item-mobile.component';
import styles from './product-item.module.scss';
import { IPropsWithChildren, IPropsWithClassname } from '../../models/common.model';
import { c } from '../../utils/classname.utils';
import Link from 'next/link';

export interface IProductItemProps extends IPropsWithChildren, IPropsWithClassname {
  readonly product: IProduct;
  readonly small?: boolean;
}

export const ProductItem = ({
  product, children, small, className,
}: IProductItemProps) => {
  return <Link className={c(styles.productitem, { [styles.productitem_small]: small }, className)}
               href={productPath(product._id)}>
    {children}

    <div className={styles.productitem__imagewrapper}>
      <img className={styles.productitem__image}
           src={product.mediaUrls[0]}
           alt={product.name} />
      <div className={styles.productitem__imagewrapperoverlay} />
    </div>

    <div className={styles.productitem__name}>
      {product.name}
    </div>

    <div className={styles.productitem__pricecontainer}>
      <div className={styles.productitem__price}>
        {product.price}
        <span className={styles.productitem_pricecurrency}>{currency}</span>
      </div>
    </div>
  </Link>;
};
