import { useMemo } from 'react';
import { useOrder } from './order.hook';

export const useIsAddToCart = (productId: string) => {
  const { order } = useOrder();

  return useMemo(
    () => order.products.some(product => product._id === product._id),
    [order, productId],
  );

};
