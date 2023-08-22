import { IIsMobile } from '../utils/device.utils';
import { ICatalog } from './catalog.models';
import { IProductPage } from './product-page.model';
import { IUser } from './user.model';

export interface IProductPageFromCatalogProps extends IIsMobile{
  readonly catalog: ICatalog;
  readonly page: IProductPage;
  readonly currentUrl: string;
  readonly user: IUser | null;
}
