import axios from 'axios';
import { ApiUrl } from './path.utils';
import { GetServerSidePropsContext } from 'next';
import cookie from 'cookiejs';

export const axiosInstance = axios.create({
  baseURL: ApiUrl,
});

if (process.browser) {
  axiosInstance.interceptors.request.use(
    r => {
      if (!isAuthenticatedClient()) {
        return r;
      }

      return {
        ...r,
        headers: {
          ...r.headers,
          Authorization: `Bearer ${getTokenClient()}`,
        },
      };
    },
  );
}

export const isAuthenticatedSSR = (context: GetServerSidePropsContext) => !!context.req.cookies.jwt;

export const isAuthenticatedClient = () => {
  return !!cookie.get('jwt');
};

const getTokenClient = () => cookie.get('jwt');

export const isBrowser = () => process.browser;

export const getRequestSSR = async <T>(context: GetServerSidePropsContext, path: string) => {
  const { jwt } = context.req.cookies;

  return (
    await axiosInstance.get(
      path,
      {
        headers: jwt
          ? { Authorization: `Bearer ${jwt}` }
          : {},
      },
    )
  ).data;
};

export const getRequest = async <T>(path: string) => (
  await axiosInstance.get<T>(path)
).data;

export const postRequest = async <TInput, TOutput>(path: string, data?: TInput) => (
  await axiosInstance.post<TOutput>(path, data)
).data;

export const putRequest = async <TInput, TOutput>(path: string, data: TInput) => (
  await axiosInstance.put<TOutput>(path, data)
).data;

export const deleteRequest = async (path: string): Promise<void> => {
  await axiosInstance.delete(path);
};
