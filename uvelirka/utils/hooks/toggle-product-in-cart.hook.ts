import { useOrder } from './order.hook';
import { useCallback } from 'react';
import { postRequest } from '../axios.utils';
import { suppressEvent } from '../event.utils';

export const useToggleProductInCart = (productId: string) => {
  const { order, setOrder } = useOrder();
  const toggleLike = useCallback(async () => {
    setOrder(await postRequest(`order/product/toggle/${productId}`));
  }, [order, productId]);

  return {
    toggleLikeSuppressWrapper: useCallback(
      suppressEvent(toggleLike),
      [toggleLike],
    ),
  };
};
