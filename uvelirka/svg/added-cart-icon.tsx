import { IClickHandler, IPropsWithClassname } from '../models/common.model';

export const AddedCartIcon = (
  {
    className,
    onClick,
  }: IPropsWithClassname & IClickHandler,
) => <svg className={className}
          onClick={onClick}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
  <path d="M3 6H22L19 16H6L3 6ZM3 6L2.25 3.5"
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round" />

  <path d="M 10 9 L 12 13 L 14 9"
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round" />

  <path d="M11 19.5C11 20.3284 10.3284 21 9.5 21C8.67157 21 8 20.3284 8 19.5"
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round" />

  <path d="M17 19.5C17 20.3284 16.3284 21 15.5 21C14.6716 21 14 20.3284 14 19.5"
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round" />
</svg>;
