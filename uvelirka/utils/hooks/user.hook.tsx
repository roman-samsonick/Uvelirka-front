import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { createContext, useContext, useMemo, useState } from 'react';
import { getUserSSR } from '../../api/user.api';
import { EUserRole } from '../../enums/user-role.enum';
import { IPropsWithChildren, IValueCallback } from '../../models/common.model';
import { IUser } from '../../models/user.model';
import { callbackStub } from '../callback.utils';

export interface IWithUser {
  readonly user: IUser | null;
}

export interface IWithRequiredUser {
  readonly user: IUser;
}

interface IUserContext extends IWithUser {
  readonly setUser: IValueCallback<IUser>;
}

const UserContext = createContext<IUserContext>({
  user: null,
  setUser: callbackStub,
});

export const AnonymousScope = ({ children }: IPropsWithChildren) => {
  const { user } = useUser();

  return <>
    {!user ? children : null}
  </>;
};

export const ProvideUser = ({ children, user }: { user: IUser } & IPropsWithChildren) => {
  const [userState, setUserState] = useState<IUser | null>(
    user
      ? { ...user }
      : null,
  );

  const userContext: IUserContext = useMemo(() => ({
    user: userState,
    setUser: setUserState,
  }), [userState, setUserState]);

  return <UserContext.Provider value={userContext}>
    {children}
  </UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

export const UserScope = ({ children }: IPropsWithChildren) => {
  const { user } = useUser();

  return <>
    {user ? children : null}
  </>;
};

export const AdminScope = ({ children }: IPropsWithChildren) => {
  const { user } = useUser();

  return <>
    {user?.role === EUserRole.ADMIN ? children : null}
  </>;
};

export function getAuthServerSideProps<T>(
  getOtherProps: (context: GetServerSidePropsContext, user: IUser) => Promise<GetServerSidePropsResult<T>>,
  redirectOnUnauthorized = false,
) {
  return async function (c: GetServerSidePropsContext): Promise<GetServerSidePropsResult<T & IWithRequiredUser>> {
    const user = await getUserSSR(c);

    if (!user && redirectOnUnauthorized) {
      return {
        redirect: {
          destination: '/',
          permanent: true,
        },
      };
    }

    const other = await getOtherProps(c, user);

    const otherAsPropsHolder = other as { props: T };

    return {
      ...other,
      props: {
        user,
        ...otherAsPropsHolder.props,
      },
    };
  };
}
