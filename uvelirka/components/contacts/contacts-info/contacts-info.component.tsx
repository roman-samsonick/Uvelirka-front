import React, { ReactNode } from 'react';
import { CalendarIcon } from '../../../svg/calendar.icon';
import { EmailIcon } from '../../../svg/email.icon';
import { FacebookIcon } from '../../../svg/facebook.icon';
import { GeoIcon } from '../../../svg/geo.icon';
import { InstagramIcon } from '../../../svg/instagram.icon';
import { PhoneIcon } from '../../../svg/phone.icon';
import { ViberIcon } from '../../../svg/viber.icon';
import { VkIcon } from '../../../svg/vk.icon';
import styles from './contacts-info.module.scss';

export const ContactsInfoComponent = () => {
  return (
    <div className={styles.contacts_info}>
      <div className={styles.contacts_info__text}>
        Мы в соц. сетях:
      </div>

      <IconBar />

      <div className={styles.contacts_info__item}>
        <ContactsSection title="Режим работы"
                         content={<WorkHours />}
                         icon={<CalendarIcon className={styles.contacts_info__item_icon} />} />
      </div>

      <div className={styles.contacts_info__item}>
        <ContactsSection title="Адрес"
                         content="Брест, Пушкинская 19"
                         icon={<GeoIcon className={styles.contacts_info__item_icon} />} />
      </div>

      <div className={styles.contacts_info__item}>
        <ContactsSection title="Телефон"
                         content="+375 (69) 420-69-69"
                         icon={<PhoneIcon className={styles.contacts_info__item_icon} />} />
      </div>

      <div className={styles.contacts_info__item}>
        <ContactsSection title={'email'}
                         content={'uvelirka@gmail.cum'}
                         icon={<EmailIcon className={styles.contacts_info__item_icon} />} />
      </div>
    </div>
  );
};

const IconBar = () => {
  return (
    <div className={styles.icon_bar}>
      <VkIcon className={styles.icon_bar__icon} />

      <InstagramIcon className={styles.icon_bar__icon} />

      <ViberIcon className={styles.icon_bar__icon} />

      <FacebookIcon className={styles.icon_bar__icon} />
    </div>
  );
};

interface IContactsSectionProps {
  title: string,
  content: string | ReactNode,
  icon: ReactNode
}

const ContactsSection = ({
  title,
  content,
  icon,
}: IContactsSectionProps) => {
  return (

    <>
      <div className={styles.contacts_info__item_icon_container}>
       {icon}
      </div>

      <div className={styles.contacts_section__text_container}>
        <div className={styles.contacts_section__text}>
          {title}
        </div>

        <div className={styles.contacts_section__subtext}>
          {content}
        </div>
      </div>
    </>


  );
};

const WorkHours = () => {
  return (
    <>
      <div className={styles.work_hours__text_container}>
        <div className={styles.work_hours__text}>
          понедельник
        </div>

        <div className={styles.work_hours__text}>
          10:00–18:00
        </div>
      </div>

      <div className={styles.work_hours__text_container}>
        <div className={styles.work_hours__text}>
          вторник
        </div>

        <div className={styles.work_hours__text}>
          10:00–18:00
        </div>
      </div>

      <div className={styles.work_hours__text_container}>
        <div className={styles.work_hours__text}>
          среда
        </div>

        <div className={styles.work_hours__text}>
          10:00–18:00
        </div>
      </div>

      <div className={styles.work_hours__text_container}>
        <div className={styles.work_hours__text}>
          четверг
        </div>

        <div className={styles.work_hours__text}>
          10:00–18:00
        </div>
      </div>

      <div className={styles.work_hours__text_container}>
        <div className={styles.work_hours__text}>
          пятница
        </div>

        <div className={styles.work_hours__text}>
          10:00–18:00
        </div>
      </div>

      <div className={styles.work_hours__text_container}>
        <div className={styles.work_hours__text}>
          суббота
        </div>

        <div className={styles.work_hours__text}>
          10:00–18:00
        </div>
      </div>

      <div className={styles.work_hours__text_container}>
        <div className={styles.work_hours__text}>
          воскресенье
        </div>

        <div className={styles.work_hours__text}>
          закрыто
        </div>
      </div>
    </>
  );
};
