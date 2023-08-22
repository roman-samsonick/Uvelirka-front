import { IProduct } from './product.model';

export interface IOrderMessage {
  readonly _id: string;
  readonly message: string;
  readonly media: string[];
}

export interface IOrder {
  readonly _id: string;
  readonly name: string;
  readonly products: IProduct[];
  readonly messages: IOrderMessage[];
}
