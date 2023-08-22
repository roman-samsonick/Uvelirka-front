import { UserCabinetMobile } from '../components/user/user-cabinet/mobile/user-cabinet-mobile.component';
import { UserCabinet } from '../components/user/user-cabinet/user-cabinet.component';
import { IIsMobile, isMobile } from '../utils/device.utils';
import { getAuthServerSideProps } from '../utils/hooks/user.hook';

export const getServerSideProps = getAuthServerSideProps(
  async context => {
    return {
      props: {
        ...isMobile(context),
      },
    };
  }, false,
);

export default function UserPage({ isMobile }: IIsMobile) {
  return isMobile ? <UserCabinetMobile /> : <UserCabinet />;
}
