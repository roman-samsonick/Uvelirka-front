import { EUserRole } from '../enums/user-role.enum';
import { IProduct } from './product.model';

export interface IUser {
  readonly name: string;
  readonly avatar: string;
  readonly email: string;
  readonly favouriteProducts: IProduct[];
  readonly role: EUserRole;
}
