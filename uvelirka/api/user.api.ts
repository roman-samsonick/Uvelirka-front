import { GetServerSidePropsContext } from 'next';
import { IUser } from '../models/user.model';
import { getRequestSSR, isAuthenticatedSSR, postRequest } from '../utils/axios.utils';

export const getUserSSR = async (c: GetServerSidePropsContext) => {
  if (isAuthenticatedSSR(c)) {
    try {
      return await getRequestSSR<IUser>(c, 'user');
    } catch (e) {
      return null;
    }
  }

  return null;
};

export const toggleLike = async (productId: string): Promise<IUser> => {
  return postRequest<unknown, IUser>(`user/toggle-like/${productId}`);
};
