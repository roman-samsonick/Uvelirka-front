import { ParsedUrlQuery } from 'querystring';
import { CatalogPageDesktop } from '../../components/catalog-page/catalog-page-desktop.component';
import { CatalogPageMobile } from '../../components/catalog-page/catalog-page-mobile.component';
import { IProductPageFromCatalogProps } from '../../models/catalog-product-page.model';
import { ICatalog } from '../../models/catalog.models';
import { IGetByCatalogDto } from '../../models/get-by-catalog-dto.model';
import { IProductPage } from '../../models/product-page.model';
import { ITag } from '../../models/tag.model';
import { getRequest, postRequest } from '../../utils/axios.utils';
import { isMobile } from '../../utils/device.utils';
import { IIsMobile } from '../../utils/device.utils';
import { getAuthServerSideProps } from '../../utils/hooks/user.hook';
import { addMultipleQueryParam, createTagQuery, tagQueryParam } from '../../utils/path.utils';

export interface ISubCatalogParams extends ParsedUrlQuery {
  readonly id: string;
  readonly page: string;
  readonly limit: string;
}

export const gradient = 'linear-gradient(0deg, rgba(180, 180, 180, 0) 20.31%, #333333 100%)';

export function splitInto<T>(items: T[], into: number): T[][] {
  const splitted: T[][] = [];

  for (let i = 0; i < items.length; i++) {
    const row = Math.floor(i / into);
    const column = i % into;

    splitted[row] = splitted[row] || [];

    splitted[row][column] = items[i];
  }

  return splitted;
}

export const getServerSideProps = getAuthServerSideProps(
  async (context) => {
    const query = context.query as ISubCatalogParams & IIsMobile;
    const limit = parseInt(query.limit) || 9;
    const pageIndex = parseInt(query.page) || 0;
    const tagsRaw = typeof context.query.filters === 'string'
      ? [context.query.filters]
      : context.query.filters === undefined
        ? []
        : context.query.filters instanceof Array
          ? context.query.filters as string[]
          : [];

    const tags: ITag[] = tagsRaw
      .filter(tag => tag.includes('--'))
      .map(rawTag => ({
        name: rawTag.split('--')[0],
        value: rawTag.split('--')[1],
      }));

    const catalog = await getRequest<ICatalog>(
      `catalog/one/${query.id}`,
    );
    const page = await postRequest<IGetByCatalogDto, IProductPage>(
      `product/by/catalog`,
      {
        page: pageIndex,
        limit,
        catalogId: catalog._id,
        tags,
      },
    );

    const validatedTags = tags.filter(tag => page.tags.find(
      t => t.name === tag.name && t.values.includes(tag.value),
    ));

    context.res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59',
    );

    if (tagsRaw.length != validatedTags.length) {
      return {
        redirect: {
          destination: addMultipleQueryParam(
            `/catalog/${catalog._id}`,
            tagQueryParam,
            validatedTags.map(t => createTagQuery(t.name, t.value)),
          ),
          permanent: true,
        },
      };
    }

    return {
      props: {
        catalog,
        page,
        currentUrl: context.resolvedUrl,
        ...isMobile(context),
      },
    };
  },
  false,
);

export interface ICatalogPageProps {
  page: IProductPage,
  catalog: ICatalog,
  currentUrl: string,
}

export default function CatalogById(
  {
    catalog,
    page,
    currentUrl,
    isMobile,
  }: IProductPageFromCatalogProps & IIsMobile,
) {
  return isMobile
    ? <CatalogPageMobile page={page}
                         catalog={catalog}
                         currentUrl={currentUrl} />
    : <CatalogPageDesktop page={page}
                          catalog={catalog}
                          currentUrl={currentUrl} />;
}
