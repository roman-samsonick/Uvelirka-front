import { IClickHandler, IPropsWithClassname } from '../models/common.model';

export const UserIcon = (
  {
    className,
    onClick,
  }: IPropsWithClassname & IClickHandler,
) => <svg className={className}
          onClick={onClick}
          width="30px"
          height="30px"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 60.671 60.671"
          xmlSpace="preserve"
          fill="#010002">
  <g>
    <g>
      <ellipse
        cx="30.336"
        cy="12.097"
        rx="11.997"
        ry="12.097" />
      <path
        d="M35.64,30.079H25.031c-7.021,0-12.714,5.739-12.714,12.821v17.771h36.037V42.9
			C48.354,35.818,42.661,30.079,35.64,30.079z" />
    </g>
  </g>
</svg>;
