import React, { useEffect, useState, createContext } from 'react';
import { AxiosError } from 'axios';

import { createRequestMethods, FetchFunction } from '../utils/api';
import { useSnackbar } from 'notistack';

interface ApiContextValue {
  get: FetchFunction;
  post: FetchFunction;
  put: FetchFunction;
  delete: FetchFunction;
  patch: FetchFunction;
}

export const ApiContext = createContext<ApiContextValue>({
  get: () => Promise.reject(),
  post: () => Promise.reject(),
  put: () => Promise.reject(),
  delete: () => Promise.reject(),
  patch: () => Promise.reject(),
});

type ErrorMessagesType = {
  error: string;
  message: string;
  status: number;
  detail: string;
  instance: string;
  help: string;
};

export function ApiProvider({ children }: { children: React.ReactNode }) {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const value = React.useMemo(() => {
    const handleErrors = (error: AxiosError) => {
      if (error.response) {
        const { data } = error.response as any;
        // Check if data is an array of errors
        if (Array.isArray(data)) {
          // data is an array of errors ErrorMessagesType[]
          data.forEach((error) => {
            setErrorMessages((prev) => [...prev, error.message]);
          });
        } else {
          console.error('Non formated error', error.response.data);
          // TODO: Handle non formated errors
        }
      }
    };
    return createRequestMethods(handleErrors);
  }, []);

  useEffect(() => {
    if (errorMessages.length === 0) return;
    const message = errorMessages[0];
    enqueueSnackbar(message, { variant: 'error' });
    setErrorMessages((prev) => prev.slice(1));
  }, [errorMessages]);

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}
