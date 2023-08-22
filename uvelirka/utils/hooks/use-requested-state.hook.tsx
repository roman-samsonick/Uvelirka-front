import { useCallback, useEffect, useState } from 'react';
import { getRequest, postRequest } from '../axios.utils';
import { IValueCallback } from '../../models/common.model';

function noTransform<TData>(data: TData) {
  return data;
}

export function usePostedState<TState, TBody>(initial: TState) {
  const [state, setState] = useState(initial);
  const [loading, setLoading] = useState(false);

  return {
    post: useCallback(async (path: string, body: TBody) => {
      setLoading(false);

      try {
        const result = await postRequest<TBody, TState>(path, body);

        setState(result);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }, []),
    state,
    setState,
    loading,
  };
}

export function useRequestedState<TState>(
  {
    initialState,
    requestPath,
    transformRequestedState,
  }: {
    initialState: TState,
    requestPath?: string,
    transformRequestedState?: (newState: TState) => TState
  },
): {
  state: TState,
  setState: IValueCallback<TState>,
  loading: boolean,
} {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const transform = transformRequestedState ?? noTransform;

  const requestNewState = async () => {
    if (!requestPath) {
      return;
    }

    setLoading(true);

    try {
      const result = await getRequest<TState>(requestPath);
      setState(transform(result));
    } catch (_) {
    }

    setLoading(false);
  };

  useEffect(() => {
    requestNewState();
  }, [requestPath]);

  return {
    state,
    setState,
    loading,
  };
}
