import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { ProvideUser } from '../utils/hooks/user.hook';
import { ProvideOrder } from '../utils/hooks/order.hook';

export default function App({ Component, pageProps }: AppProps) {
  return <ProvideUser user={pageProps.user}>
    <ProvideOrder>
      <Component {...pageProps} />
    </ProvideOrder>
  </ProvideUser>;
}
