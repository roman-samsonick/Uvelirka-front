import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { callbackStub } from '../callback.utils';
import { IOrder } from '../../models/order.model';
import { IPropsWithChildren, IValueCallback } from '../../models/common.model';
import { isBrowser } from '../axios.utils';
import { getOrderDraft } from '../../pages/api/order.api';
import { useUser } from './user.hook';

interface IOrderContext {
  readonly order: IOrder;
  readonly setOrder: IValueCallback<IOrder>;
}

const defaultOrder: IOrderContext = {
  order: {
    products: [],
    name: '',
    _id: '',
    messages: [],
  },
  setOrder: callbackStub,
};

const OrderContext = createContext<IOrderContext>(defaultOrder);

export const ProvideOrder = ({ children }: IPropsWithChildren) => {
  const { user } = useUser();
  const [order, setOrder] = useState<IOrder>(defaultOrder.order);
  const context = useMemo<IOrderContext>(
    () => ({ order, setOrder }),
    [order],
  );

  const fetchOrder = useCallback(async () => {
    if (user) {
      setOrder(await getOrderDraft());
    }
  }, []);

  useEffect(() => {
    if (isBrowser()) {
      fetchOrder();
    }
  }, []);

  return <OrderContext.Provider value={context}
                                children={children} />;
};

export const useOrder = () => {
  return useContext(OrderContext);
};
