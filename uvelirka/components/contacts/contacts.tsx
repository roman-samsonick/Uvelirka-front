import React from 'react';
import background from '../../public/background.png';
import { MiniMap } from '../common/mini-map/mini-map.component';

import { Header } from '../home/header/header.component';
import { ContactsInfoComponent } from './contacts-info/contacts-info.component';
import styles from './contacts.module.scss';

const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consequat quam at posuere pellentesque. Sed sed lacus ante. Duis scelerisque nisi ac dui luctus, at dictum tellus pretium. Donec pretium sollicitudin elit, nec cursus dui egestas ac. Nullam luctus in metus dapibus faucibus. In id scelerisque felis. Nam blandit nunc nibh, id vulputate leo elementum eu. Nullam commodo aliquet tincidunt. Curabitur et eros ac lectus efficitur facilisis. Vestibulum at venenatis metus.';
export const Contacts = () => {
  return (
    <div>
      <div style={{ backgroundImage: `url(${background.src})` }}>
        <Header />
      </div>

      <div className={styles.contacts__content}>
        <div className={styles.contacts__description}>
          {description}
        </div>

        <div className={styles.contacts__actions}>
          <div className={styles.contacts__map_container}>
            <MiniMap className={styles.contacts__map} />
          </div>

          <ContactsInfoComponent />

        </div>

        <div className={styles.contacts__footer}>
          {description}
        </div>
      </div>
    </div>
  );
};
