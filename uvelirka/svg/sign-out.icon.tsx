import { IClickHandler, IPropsWithClassname } from '../models/common.model';

export const SignOutIcon = ({
  className,
  onClick,
}: IPropsWithClassname & IClickHandler) => <svg
  className={className}
  onClick={onClick}
  fill="#000000"
  height="30px"
  width="30px"
  version="1.1"
  id="XMLID_173_"
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 24 26"
  xmlSpace="preserve">
  <g id="logout">
    <g>
      <path
        d="M15,24H0V2h15v8h-2V4H2v18h11v-6h2V24z M18.4,18.7L17,17.3l3.3-3.3H5v-2h15.3L17,8.7l1.4-1.4L24,13L18.4,18.7z" />
    </g>
  </g>
</svg>;

