// import { createContext, FC, ReactNode, useReducer, useEffect } from "react";
// import { notification } from "antd";
// import { useRouter } from "next/router";
// import { differenceInCalendarDays } from "date-fns";

// import axios from "../../utilities/axios";
// import { useProgram } from "../../hooks/useProgram";
// import { Participant, UpdateProfileInfo } from "../../types/participant";
// import { parseLoginCredential } from "../../utilities/common-helpers";

// interface AuthState {
//   status: "idle" | "login";
//   error: "wrong-user-password" | any | null;
//   accessToken: string | null;
//   participant: Participant;
//   isLoggedIn: boolean;
//   isInitialised: boolean;
// }

// interface AuthContextValue extends AuthState {
//   haveToUpdateHisInfo: boolean;
//   logIn: (username: string, password: string, isGoogleLogin?: boolean) => void;
//   logOut: () => void;
//   updatedAccountInfo: (changes: UpdateProfileInfo) => void;
//   loginWithToken: (token: string) => void;
// }

// interface AuthProviderProps {
//   children: ReactNode;
// }

// type LoginAction = {
//   type: "login";
//   payload: {
//     accessToken: string;
//     participant: Participant;
//   };
// };

// type LogoutAction = {
//   type: "logout";
// };

// type WrongUserPasswordAction = {
//   type: "wrong-user-password";
// };

// type Action = LoginAction | LogoutAction | WrongUserPasswordAction;

// const initialState: AuthState = {
//   status: "idle",
//   accessToken: null,
//   participant: {} as Participant,
//   error: null,
//   isLoggedIn: false,
//   isInitialised: false,
// };
// export const setSessionWithToken = (accessToken: string | null): void => {
//   if (accessToken) {
//     localStorage.setItem("accessToken", accessToken);
//     axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//   } else {
//     localStorage.removeItem("accessToken");
//     delete axios.defaults.headers.common.Authorization;
//   }
// };
// const reducer = (state: AuthState, action: Action): AuthState => {
//   switch (action.type) {
//     case "login":
//       const { accessToken, participant } = action.payload;
//       return {
//         ...state,
//         accessToken,
//         participant: {
//           ...participant,
//           loginCredential: parseLoginCredential(participant.loginCredential),
//         },
//         isInitialised: true,
//         isLoggedIn: true,
//       };
//     case "wrong-user-password":
//       return {
//         ...state,
//         error: "wrong-user-password",
//       };
//     case "logout":
//       /* Router.push('/login'); */
//       return {
//         ...state,
//         accessToken: null,
//         participant: {} as Participant,
//         isInitialised: true,
//         isLoggedIn: false,
//       };
//     default:
//       return state;
//   }
// };

// export const AuthContext = createContext<AuthContextValue>({
//   ...initialState,
//   isLoggedIn: false,
//   logIn: () => {},
//   logOut: () => {},
//   updatedAccountInfo: () => {},
//   haveToUpdateHisInfo: true,
//   loginWithToken: (token: string) => {},
// });

// export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
//   const [auth, dispatch] = useReducer(reducer, initialState);
//   const { program } = useProgram();
//   const router = useRouter();

//   const loginWithToken = (token: string | null) => {
//     setSessionWithToken(token);
//     setSession();
//     router.push("/");
//   };

//   const logIn = async (
//     username: string,
//     password: string,
//     isGoogleLogin?: boolean
//   ) => {
//     try {
//       const login_response = await axios.post(`/auth/participant/login`, {
//         username,
//         password,
//         isGoogleLogin,
//         programId: program.id,
//       });

//       const { accessToken } = login_response.data;

//       localStorage.setItem(`accessToken`, accessToken);
//       setSession();
//     } catch (e) {
//       console.error(e);
//       dispatch({
//         type: "wrong-user-password",
//       });
//       notification.open({
//         message: "Tu usuario o contraseña son incorrectos.",
//         type: "error",
//         description: "Inténtalo de nuevo!",
//         duration: 3,
//       });
//     }
//   };

//   const logOut = () => {
//     localStorage.removeItem("accessToken");
//     setSession();
//   };

//   const setSession = async () => {
//     // First I retrieve the token saved on localStorage
//     const accessToken = localStorage.getItem("accessToken");

//     // If there is a token, I proceed to validate it
//     if (accessToken) {
//       try {
//         // I set the token as an Axios header
//         axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

//         const response = await axios.get<Participant>(`participants/info/me`);
//         // When the backend validate the Token, it includes the Participant info on the response
//         const participant = response.data;

//         // If all is OK, I send a Login action
//         // and i need to verify if participant is active if is active i dispatch action else i send alert for not active
//         if (participant.isActive) {
//           dispatch({
//             type: "login",
//             payload: {
//               accessToken,
//               participant,
//             },
//           });
//           notification.open({
//             message: "¡Bienvenido!",
//             description: "Has ingresado satisfactoriamente.",
//             type: "success",
//             duration: 3,
//           });
//         } else {
//           notification.open({
//             message: "usuario inactivo",
//             type: "error",
//             duration: 3,
//           });
//         }
//       } catch (e: any) {
//         console.error(e);
//         // The backend validate the token, and if it isn't valid, I send a Logout action
//         if (e.statusCode === 401) {
//           delete axios.defaults.headers.common.Authorization;
//           dispatch({
//             type: "logout",
//           });
//         }
//       }
//     } else {
//       // If there is no token, so I automatically send a Logout action
//       delete axios.defaults.headers.common.Authorization;
//       localStorage.setItem("cart", JSON.stringify([]));
//       dispatch({
//         type: "logout",
//       });
//     }
//   };

//   const updatedAccountInfo = async (changes: UpdateProfileInfo) => {
//     try {
//       await axios.put(`/participants/${auth.participant.id}`, {
//         ...changes,
//         lastUpdateOfInfo: new Date(),
//       });
//       notification.open({
//         message: "¡Gracias!",
//         description: "Has actualizado tus datos correctamente.",
//         type: "success",
//         duration: 3,
//       });
//       setSession();
//     } catch (e) {
//       console.error(e);
//       notification.open({
//         message: "Error",
//         description:
//           "Lo sentimos, algo inesperado ha ocurrido. Inténtalo más tarde",
//         type: "error",
//         duration: 3,
//       });
//     }
//   };

//   const verifyIfHasToUpdateHisInfo = (): boolean => {
//     const { participant } = auth;
//     if (participant.lastUpdateOfInfo) {
//       const now = new Date();
//       const daysOfDifference = differenceInCalendarDays(
//         now,
//         new Date(participant.lastUpdateOfInfo)
//       );
//       if (daysOfDifference > 31) {
//         return true;
//       } else {
//         return false;
//       }
//     } else {
//       return true;
//     }
//   };
//   useEffect(() => {
//     setSession();
//   }, []);
//   return (
//     <AuthContext.Provider
//       value={{
//         ...auth,
//         // isLoggedIn: auth.accessToken ? true : false,
//         haveToUpdateHisInfo: verifyIfHasToUpdateHisInfo(),
//         logIn,
//         logOut,
//         updatedAccountInfo,
//         loginWithToken,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

export const test = '';
