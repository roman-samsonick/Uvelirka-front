import { MutableRefObject, useEffect, useRef } from 'react';
import { ICallback } from '../../models/common.model';

export function useStableRef<T>(value: T): MutableRefObject<T> {
  const ref = useRef<T>(value);

  ref.current = value;

  return ref;
}

export function useBackdropClick(ref: MutableRefObject<HTMLElement | null>, callback: ICallback, active: boolean) {
  const stableCallback = useStableRef(callback);
  const stableActive = useStableRef(active);

  useEffect(() => {
    const handler = (event: Event) => {
      if (!stableActive.current) {
        return;
      }

      if (!event.composedPath().includes(ref.current!)) {
        stableCallback.current();
        event.stopPropagation();
      }
    };

    document.addEventListener('click', handler, { capture: true });

    return () => document.removeEventListener('click', handler);
  }, []);
}
