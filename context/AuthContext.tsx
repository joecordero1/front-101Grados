import { createContext, FC, ReactNode, useReducer, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useProgram, useApi } from 'hooks';
import { Participant } from 'utils/types';
import { parseCredentials } from 'utils';
import { useCart } from 'hooks';

interface AuthState {
  status: 'idle' | 'login';
  loadingPoints: boolean;
  error: 'wrong-user-password' | any | null;
  accessToken: string | null;
  participant: Participant;
  isLoggedIn: boolean;
  isInitialised: boolean;
  availablePoints: number;
}

interface AuthContextValue extends AuthState {
  logIn: (username: string, password: string) => void;
  logOut: () => void;
  loginWithToken: (token: string) => void;
  getAvailablePoints: () => void;
  setSession: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

type LoginAction = {
  type: 'login';
  payload: {
    accessToken: string;
    participant: Participant;
  };
};

type LoadingPoints = {
  type: 'loading-points';
};

type LogoutAction = {
  type: 'logout';
};

type WrongUserPasswordAction = {
  type: 'wrong-user-password';
};

type UpdateAvailablePoints = {
  type: 'UPDATE_AVAILABLE_POINTS';
  payload: number;
};

type Action =
  | LoginAction
  | LogoutAction
  | WrongUserPasswordAction
  | UpdateAvailablePoints
  | LoadingPoints;

const initialState: AuthState = {
  status: 'idle',
  loadingPoints: true,
  accessToken: null,
  participant: {} as Participant,
  error: null,
  isLoggedIn: false,
  isInitialised: false,
  availablePoints: 0,
};

export const setSessionWithToken = (accessToken: string | null): void => {
  if (accessToken) {
    localStorage.setItem('accessTokenLala4Store', accessToken);
  } else {
    localStorage.removeItem('accessTokenLala4Store');
  }
};

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case 'login':
      const { accessToken, participant } = action.payload;
      return {
        ...state,
        accessToken,
        participant: {
          ...participant,
          username: parseCredentials(participant.username),
        },
        isInitialised: true,
        isLoggedIn: true,
      };
    case 'wrong-user-password':
      return {
        ...state,
        error: 'wrong-user-password',
      };
    case 'logout':
      /* Router.push('/login'); */
      return {
        ...state,
        accessToken: null,
        participant: {} as Participant,
        isInitialised: true,
        isLoggedIn: false,
      };
    case 'loading-points': {
      return {
        ...state,
        loadingPoints: true,
      };
    }
    case 'UPDATE_AVAILABLE_POINTS':
      return {
        ...state,
        availablePoints: action.payload,
        loadingPoints: false,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
  getAvailablePoints: () => {},
  loginWithToken: (token: string) => {},
  setSession: () => {},
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [auth, dispatch] = useReducer(reducer, initialState);
  const { program } = useProgram();
  const { get, post } = useApi();
  const { items } = useCart();
  const router = useRouter();

  const loginWithToken = (token: string | null) => {
    setSessionWithToken(token);
    setSession();
  };

  const logIn = async (username: string, password: string) => {
    try {
      const accessTokenResponse = await post<{
        access_token: string;
      }>(`/lala4/auth/v5/participant/login`, {
        username,
        password,
        programId: program.id,
      });

      localStorage.setItem(
        `accessTokenLala4Store`,
        accessTokenResponse.access_token
      );
      setSession();
    } catch (e) {
      console.error(e);
    }
  };

  const logOut = () => {
    localStorage.removeItem('accessTokenLala4Store');
    setSession();
    window.location.reload();
  };

  const setSession = async () => {
    // First I retrieve the token saved on localStorage
    const token = router.query.token;
    if (token) localStorage.setItem('accessTokenLala4Store', token.toString());

    const accessToken = localStorage.getItem('accessTokenLala4Store');

    // If there is a token, I proceed to validate it
    if (accessToken) {
      try {
        const participant = await get<Participant>(
          `/lala4/participants/info/me`
        );

        // If all is OK, I send a Login action
        // and i need to verify if participant is active if is active i dispatch action else i send alert for not active
        dispatch({
          type: 'login',
          payload: {
            accessToken,
            participant,
          },
        });
      } catch (e: any) {
        console.error('setSession() ->', e);
        if (e.statusCode === 401) {
          dispatch({
            type: 'logout',
          });
        }
      }
    } else {
      localStorage.setItem('cart', JSON.stringify([]));
      dispatch({
        type: 'logout',
      });
    }
  };

  const getAvailablePoints = async () => {
    dispatch({
      type: 'loading-points',
    });
    try {
      console.info('Cargando puntos');
      const availablePoints = await get<number>(
        `/lala4/points/my-available-points`
      );
      dispatch({
        type: 'UPDATE_AVAILABLE_POINTS',
        payload: availablePoints,
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (auth.isLoggedIn) getAvailablePoints();
  }, [auth.isLoggedIn, auth.participant, items]);

  useEffect(() => {
    setSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        logIn,
        logOut,
        getAvailablePoints,
        loginWithToken,
        setSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
