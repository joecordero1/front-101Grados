import { createContext, FC, ReactNode, useReducer, useEffect } from "react";
import { useRouter } from "next/router";

import { useProgram, useApi, useApiAuth } from "hooks";
import { Participant } from "utils/types";
import { parseCredentials } from "utils";

interface AuthState {
  status: "idle" | "login";
  error: "wrong-user-password" | any | null;
  accessToken: string | null;
  participant: Participant;
  isLoggedIn: boolean;
  isInitialised: boolean;
  availablePoints: number;
}

interface AuthContextValue extends AuthState {
  haveToUpdateHisInfo: boolean;
  logIn: (username: string, password: string, isGoogleLogin?: boolean) => void;
  logOut: () => void;
  loginWithToken: (token: string) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

type LoginAction = {
  type: "login";
  payload: {
    accessToken: string;
    participant: Participant;
  };
};

type LogoutAction = {
  type: "logout";
};

type WrongUserPasswordAction = {
  type: "wrong-user-password";
};

type UpdateAvailablePoints = {
  type: "UPDATE_AVAILABLE_POINTS";
  payload: number;
};

type Action =
  | LoginAction
  | LogoutAction
  | WrongUserPasswordAction
  | UpdateAvailablePoints;

const initialState: AuthState = {
  status: "idle",
  accessToken: null,
  participant: {} as Participant,
  error: null,
  isLoggedIn: false,
  isInitialised: false,
  availablePoints: 0,
};
export const setSessionWithToken = (accessToken: string | null): void => {
  if (accessToken) {
    localStorage.setItem("accessTokenLala4Store", accessToken);
  } else {
    localStorage.removeItem("accessTokenLala4Store");
  }
};
const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "login":
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
    case "wrong-user-password":
      return {
        ...state,
        error: "wrong-user-password",
      };
    case "logout":
      /* Router.push('/login'); */
      return {
        ...state,
        accessToken: null,
        participant: {} as Participant,
        isInitialised: true,
        isLoggedIn: false,
      };
    case "UPDATE_AVAILABLE_POINTS":
      return {
        ...state,
        availablePoints: action.payload,
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
  haveToUpdateHisInfo: true,
  loginWithToken: (token: string) => {},
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [auth, dispatch] = useReducer(reducer, initialState);
  const { program } = useProgram();
  const { get, post } = useApi();
  const router = useRouter();

  const loginWithToken = (token: string | null) => {
    setSessionWithToken(token);
    setSession();
  };

  const logIn = async (
    username: string,
    password: string,
    isGoogleLogin?: boolean
  ) => {
    try {
      const accessTokenResponse = await post<{
        accessToken: string;
      }>(`/auth/participant/login`, {
        username,
        password,
        isGoogleLogin,
        programId: program.id,
      });

      localStorage.setItem(
        `accessTokenLala4Store`,
        accessTokenResponse.accessToken
      );
      setSession();
    } catch (e) {
      console.error(e);
      // dispatch({
      //   type: 'wrong-user-password',
      // });
      // notification.open({
      //   message: 'Tu usuario o contraseña son incorrectos.',
      //   type: 'error',
      //   description: 'Inténtalo de nuevo!',
      //   duration: 3,
      // });
    }
  };

  const logOut = () => {
    console.log("entrando logout");
    localStorage.removeItem("accessTokenLala4Store");
    setSession();
  };

  const setSession = async () => {
    // First I retrieve the token saved on localStorage
    const accessToken = localStorage.getItem("accessTokenLala4Store");

    // If there is a token, I proceed to validate it
    if (accessToken) {
      try {
        const participant = await get<Participant>(`participants/info/me`);

        // If all is OK, I send a Login action
        // and i need to verify if participant is active if is active i dispatch action else i send alert for not active
        dispatch({
          type: "login",
          payload: {
            accessToken,
            participant,
          },
        });
      } catch (e: any) {
        console.error("setSession() ->", e);
        if (e.statusCode === 401) {
          dispatch({
            type: "logout",
          });
        }
      }
    } else {
      localStorage.setItem("cart", JSON.stringify([]));
      dispatch({
        type: "logout",
      });
    }
  };

  const getAvailablePoints = async () => {
    try {
      const availablePoints = await get<number>(`/points/my-available-points`);
      dispatch({
        type: "UPDATE_AVAILABLE_POINTS",
        payload: availablePoints,
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (auth.isLoggedIn) getAvailablePoints();
  }, [auth.isLoggedIn]);

  // const updatedAccountInfo = async (changes: UpdateProfileInfo) => {
  //   try {
  //     await axios.put(`/participants/${auth.participant.id}`, {
  //       ...changes,
  //       lastUpdateOfInfo: new Date(),
  //     });
  //     notification.open({
  //       message: '¡Gracias!',
  //       description: 'Has actualizado tus datos correctamente.',
  //       type: 'success',
  //       duration: 3,
  //     });
  //     setSession();
  //   } catch (e) {
  //     console.error(e);
  //     notification.open({
  //       message: 'Error',
  //       description:
  //         'Lo sentimos, algo inesperado ha ocurrido. Inténtalo más tarde',
  //       type: 'error',
  //       duration: 3,
  //     });
  //   }
  // };

  const verifyIfHasToUpdateHisInfo = (): boolean => {
    // const { participant } = auth;
    // if (participant.lastUpdateOfInfo) {
    //   const now = new Date();
    //   const daysOfDifference = differenceInCalendarDays(
    //     now,
    //     new Date(participant.lastUpdateOfInfo)
    //   );
    //   if (daysOfDifference > 31) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // } else {
    //   return true;
    // }
    return false;
  };
  useEffect(() => {
    setSession();
  }, []);
  console.log(auth.isLoggedIn);
  return (
    <AuthContext.Provider
      value={{
        ...auth,
        // isLoggedIn: auth.accessToken ? true : false,
        haveToUpdateHisInfo: verifyIfHasToUpdateHisInfo(),
        logIn,
        logOut,
        loginWithToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
