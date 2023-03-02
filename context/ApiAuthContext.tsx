import React, { useEffect, useState, createContext } from 'react';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';

import { useAuth } from '../hooks';
import { createAuthRequestMethods, FetchFunction } from '../utils/apiAuth';

interface ApiContextValue {
  getAuth: FetchFunction;
  postAuth: FetchFunction;
  putAuth: FetchFunction;
  deleteAuth: FetchFunction;
  patchAuth: FetchFunction;
}

export const ApiAuthContext = createContext<ApiContextValue>({
  getAuth: () => Promise.reject(),
  postAuth: () => Promise.reject(),
  putAuth: () => Promise.reject(),
  deleteAuth: () => Promise.reject(),
  patchAuth: () => Promise.reject(),
});

export enum HandledAuthErrors {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
  null = null,
}

type ErrorMessagesType = {
  [key in HandledAuthErrors]: {
    title: string;
    variant: 'error' | 'warning' | 'info' | 'success';
    message: string;
  };
};

const ErroMessages: ErrorMessagesType = {
  [HandledAuthErrors.BAD_REQUEST]: {
    title: 'Error',
    variant: 'error',
    message: 'Hay un error con la información que nos proporcionaste.',
  },
  [HandledAuthErrors.UNAUTHORIZED]: {
    title: 'Error',
    variant: 'error',
    message: 'Tu sesión ha finalizado. Ingresa nuevamente.',
  },
  [HandledAuthErrors.FORBIDDEN]: {
    title: 'Error',
    variant: 'error',
    message: 'No puedes realizar esa operación. Ponte en contacto con soporte.',
  },
  [HandledAuthErrors.NOT_FOUND]: {
    title: 'Error',
    variant: 'error',
    message: 'No podemos encontrar lo que nos solicitaste.',
  },
  [HandledAuthErrors.CONFLICT]: {
    title: 'Error',
    variant: 'error',
    message: 'El recurso ya se encuentra creado.',
  },
  [HandledAuthErrors.INTERNAL_SERVER_ERROR]: {
    title: 'Error',
    variant: 'error',
    message: 'Ha ocurrido algo inesperado. Por favor intenta más tarde.',
  },
};

export function ApiAuthProvider({ children }: { children: React.ReactNode }) {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { logOut, accessToken } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const value = React.useMemo(() => {
    function handleError(error: AxiosError | any) {
      if (error.response) {
        // returned from api buy with an error code outside 2xx
        const isHandledError = Object.values(HandledAuthErrors).includes(
          error.response.status
        );
        setErrorMessage(
          isHandledError
            ? ErroMessages[error.response.status].message
            : ErroMessages[HandledAuthErrors.INTERNAL_SERVER_ERROR].message
        );
        setErrorMessage('');

        // This if is for the validation errors | Usually are 400 errors when the sent data is not valid
        if (
          error.response.data &&
          error.response.data.errors &&
          error.response.data.errors.length > 0
        ) {
          const errors: {
            property: string;
            children: [];
            constraints: { [key: string]: string };
          }[] = error.response.data.errors;

          const errorMessages = errors.map((e) => {
            const errorKey = Object.keys(e.constraints)[0];
            return e.constraints[errorKey];
          });

          errorMessages.forEach((message) => {
            setErrorMessage(message);
            setErrorMessage('');
          });
        } else {
          if (
            error.response.data.message &&
            error.response.data.message !== 'Unauthorized'
          ) {
            setErrorMessage(error.response.data.message);
            setErrorMessage('');
          }
        }

        if (error.response.status === 401) {
          //When 401 is the response status the user is no longer authorized and should
          //be logged out
          logOut();
        }
      } else if (error.response) {
        // setState({ errorCode: NoResponseCode, status: 'error' });
      }
    }

    return createAuthRequestMethods(accessToken, handleError);
  }, [logOut, accessToken]);

  useEffect(() => {
    if (errorMessage.length === 0) return;
    enqueueSnackbar(errorMessage, {
      variant: 'error',
    });
  }, [errorMessage]);

  return (
    <ApiAuthContext.Provider value={value}>{children}</ApiAuthContext.Provider>
  );
}
