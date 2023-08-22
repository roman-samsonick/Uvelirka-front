import { SVGProps } from 'react';

export const FileUploadIcon = (props: SVGProps<SVGSVGElement>) =>
  <svg
    {...props}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    strokeWidth="3"
    stroke="#000000"
    fill="none">
    <polygon points="25.15 6.32 50.81 6.32 50.81 54.84 13.19 54.84 13.19 19.18 25.15 6.32"
             strokeLinecap="round" />
    <polyline points="25.17 6.32 25.15 19.18 13.19 19.18" />
    <path d="M40.26,34v7.4a.82.82,0,0,1-.82.81H24.56a.82.82,0,0,1-.82-.81V34" />
    <polyline points="36.08 30.87 32 26.79 27.93 30.87" />
    <line x1="32"
          y1="26.79"
          x2="32"
          y2="38.74" />
  </svg>;
