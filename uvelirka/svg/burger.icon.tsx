import React from 'react';
import { IPropsWithClassname } from '../models/common.model';

export const BurgerIcon = ({ className }: IPropsWithClassname) => {
  return (
    <svg viewBox="0 0 24 24"
         className={className}
         fill="none">
      <path d="M4 18L20 18"
            strokeLinecap="round" />
      <path d="M4 12L20 12"
            strokeLinecap="round" />
      <path d="M4 6L20 6"
            strokeLinecap="round" />
    </svg>
  );
};
