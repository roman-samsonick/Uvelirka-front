import { ParsedUrlQuery } from 'querystring';
import { useMemo } from 'react';
import { IMediaViewItemProps } from '../../components/product/media/media-preview-item.component';
import { ProductPageMobile } from '../../components/product/page/mobile/product-page-mobile.component';
import { ProductPage } from '../../components/product/page/product-page.component';
import { IProduct } from '../../models/product.model';
import { getRequest } from '../../utils/axios.utils';
import { IIsMobile, isMobile } from '../../utils/device.utils';
import { getAuthServerSideProps } from '../../utils/hooks/user.hook';

interface IProductPageQuery extends ParsedUrlQuery {
  readonly id: string;
}

interface IProductPageProps {
  readonly product: IProduct;
}

export const getServerSideProps = getAuthServerSideProps(
  async context => {
    const query = context.query as IProductPageQuery & IIsMobile;

    const product = await getRequest<IProduct>(`/product/one/${query.id}`);
    return {
      props: {
        product,
        ...isMobile(context),
      },
    };
  }, false,
);

export default function ProductPageComponent(
  {
    product,
    isMobile,
  }: IIsMobile & IProductPageProps,
) {
  const items = useMemo(
    () => product.mediaUrls.map(mediaUrl => ({
      mediaUrl,
      alt: product.name,
    } as IMediaViewItemProps)),
    [product.mediaUrls, product.name],
  );

  if (isMobile) {
    return <ProductPageMobile product={product}
                              media={items} />;
  } else {
    return <ProductPage product={product}
                        media={items} />;
  }
}
