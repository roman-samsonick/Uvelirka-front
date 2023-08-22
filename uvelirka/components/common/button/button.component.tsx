import { c } from '../../../utils/classname.utils';
import styles from './button.module.scss';
import { UIEvent } from 'react';
import { IPropsWithClassname, IValueCallback } from '../../../models/common.model';

interface IButtonProps extends IPropsWithClassname {
  readonly text: string;
  readonly onClick?: IValueCallback<UIEvent>;
  readonly disabled?: boolean;
  readonly filled?: boolean;
  readonly small?: boolean;
}

export const Button = (
  { text, onClick, className, disabled, filled, small }: IButtonProps,
) => {
  return <button type="button"
                 disabled={disabled}
                 className={c(styles.button, { [styles.button__filled]: filled }, { [styles.button__small]: small }, className)}
                 onClick={onClick}>
    {text}
  </button>;
};
