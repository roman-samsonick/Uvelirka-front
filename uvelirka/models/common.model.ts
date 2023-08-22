import { MouseEvent, PropsWithChildren, ReactNode } from 'react';

export interface IPropsWithClassname {
  className?: string;
}

export interface IPropsWithChildren extends PropsWithChildren {
}

export interface IPropsWithOnClick {
  onClick: () => void;
}

export interface IClickHandler {
  onClick?: IValueCallback<MouseEvent>;
}

export type IChild = ReactNode;

export interface ICallback {
  (): void;
}

export interface IValueCallback<T> {
  (value: T): void;
}

export interface I2ValueCallback<T, V> {
  (value: T, value2: V): void;
}

export interface IMapFunction<TIn, TOut> {
  (value: TIn): TOut;
}
