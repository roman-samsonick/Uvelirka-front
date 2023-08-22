import { useEffect } from 'react';
import { IPropsWithClassname } from '../../models/common.model';
import { GoogleIcon } from '../../svg/google.icon';
import { googleLoginPath } from '../../utils/path.utils';
import { Dropdown, DropdownItem } from '../common/dropdown/dropdown.component';
import styles from '../home/header/header.module.scss';

const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=500,height=500,left=500,top=500`;

export const openSignInPopup = () => window.open(googleLoginPath(), '_blank', params);
export const useSignIn = () => {
  useEffect(() => {
    const handler = (e: MessageEvent<string>) => {
      if (e.data === 'signinsuccess') {
        location.reload();
      }
    };

    window.addEventListener('message', handler);

    return () => window.removeEventListener('message', handler);
  }, []);

};

export const AuthDropdown = ({ className }: IPropsWithClassname) => {
  useSignIn();

  return <Dropdown className={className}
                   title="Войти">
    <DropdownItem onClick={openSignInPopup}>
      <GoogleIcon className={styles.icon} />
      oogle
    </DropdownItem>
  </Dropdown>;
};
