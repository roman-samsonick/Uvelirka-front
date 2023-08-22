import { IClickHandler, IPropsWithClassname } from '../models/common.model';

export const CompleteIcon = (
  {
    className,
    onClick,
  }: IPropsWithClassname & IClickHandler,
) => <svg viewBox="0 0 1920 1920"
          className={className}
          onClick={onClick}
          xmlns="http://www.w3.org/2000/svg">
  <path d="M960 1807.059c-467.125 0-847.059-379.934-847.059-847.059 0-467.125 379.934-847.059 847.059-847.059 467.125 0 847.059 379.934 847.059 847.059 0 467.125-379.934 847.059-847.059 847.059M960 0C430.645 0 0 430.645 0 960s430.645 960 960 960 960-430.645 960-960S1489.355 0 960 0M854.344 1157.975 583.059 886.69l-79.85 79.85 351.135 351.133L1454.4 717.617l-79.85-79.85-520.206 520.208Z"
        fillRule="evenodd" />
</svg>;
