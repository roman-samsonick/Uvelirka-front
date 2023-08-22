import { ICallback } from '../models/common.model';
import { UIEvent } from 'react';

export const suppressEvent = (callback: ICallback) => (event: UIEvent) => {
  callback();

  event.stopPropagation();
  event.preventDefault();
};
