import Link from 'next/link';
import { IPropsWithClassname } from '../../../models/common.model';
import { SearchIcon } from '../../../svg/search.icon';
import { c } from '../../../utils/classname.utils';
import { AnonymousScope, UserScope } from '../../../utils/hooks/user.hook';
import { rootCatalog } from '../../../utils/path.utils';
import { AuthDropdown } from '../../user/auth-dropdown.component';
import { UserToolbar } from '../../user/user-toolbar/user-toolbar.component';
import styles from './header.module.scss';

interface IHeaderProps extends IPropsWithClassname {
}

export const Header = ({ className }: IHeaderProps) => {
  return <div className={c(styles.header, className)}>
    <Link className={styles.header__link}
          href={rootCatalog}>
      Каталог
    </Link>

    <Link className={styles.header__link}
          href="/contacts">
      Контакты
    </Link>

    <Link href="/"
          className={styles.header__title}>
      jojo
    </Link>

    <div className={styles.search}>
      <div>
        <SearchIcon className={styles.search_icon} />
      </div>
      <input className={c('transparent', styles.search__input)}
             placeholder="Поиск" />
    </div>

    <AnonymousScope>
      <div className={styles.header__sign}>
        <AuthDropdown />
      </div>
    </AnonymousScope>

    <UserScope>
      <UserToolbar className={styles.header__usertoolbar} />
    </UserScope>
  </div>;
};
