import { getRequest } from '../../utils/axios.utils';
import { IOrder } from '../../models/order.model';

export const getOrderDraft = () => {
  return getRequest<IOrder>('order/draft');
};
