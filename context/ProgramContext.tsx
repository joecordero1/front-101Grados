import { createContext, FC, ReactNode, useReducer, useEffect } from "react";
import Script from "next/script";

import { useApi } from "hooks";
import { config } from "utils/config";
import { Program } from "utils/types";

interface ProgramState {
  status: ActionType.IDLE;
  program: Program;
  coinName: string | null;
}

interface ProgramContextValue extends ProgramState {}

interface ProgramProviderProps {
  children: ReactNode;
}

export enum ActionType {
  IDLE = "IDLE",
  GET_PROGRAM = "GET_PROGRAM",
  ERROR = "ERROR",
}

type GetProgramAction = {
  type: ActionType.GET_PROGRAM;
  payload: {
    program: Program;
  };
};

type Action = GetProgramAction;

const initialState: ProgramState = {
  status: ActionType.IDLE,
  program: null,
  coinName: null,
};

const reducer = (state: ProgramState, action: Action): ProgramState => {
  switch (action.type) {
    case ActionType.GET_PROGRAM:
      const { program } = action.payload;
      return {
        ...state,
        program,
        coinName: `${program.coinName
          .charAt(0)
          .toUpperCase()}${program.coinName.slice(1)}`,
      };
    default:
      return state;
  }
};

export const ProgramContext = createContext<ProgramContextValue>({
  ...initialState,
});

export const ProgramProvider: FC<ProgramProviderProps> = ({ children }) => {
  const [programState, dispatch] = useReducer(reducer, initialState);
  const { program } = config;
  const { get } = useApi();

  const getProgram = async () => {
    try {
      const response = await get<Program>(`/programs/store/${program.id}`);
      dispatch({
        type: ActionType.GET_PROGRAM,
        payload: {
          program: response,
        },
      });
    } catch (e) {
      console.error("getProgram() ->", e);
    }
  };

  useEffect(() => {
    getProgram();
  }, []);

  // Update colors based on the database
  useEffect(() => {
    if (process.browser) {
      const root = document.documentElement;

      // TODO: Change this validation with a new variable to check if the program was loaded

      if (programState.program) {
        const { colorPrimary, colorHeadings, colorHeaderIcons, colorIcons } =
          programState.program;
        root.style.setProperty(
          "--color-primary",
          colorPrimary ? colorPrimary : "white"
        );
        root.style.setProperty(
          "--color-headings",
          colorHeadings ? colorHeadings : "black"
        );
        root.style.setProperty(
          "--color-header-icons",
          colorHeaderIcons ? colorHeaderIcons : "black"
        );
        root.style.setProperty(
          "--color-icons",
          colorIcons ? colorIcons : "black"
        );
      }
    }
  }, [programState.program, process.browser]);

  return (
    <ProgramContext.Provider value={{ ...programState }}>
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${programState?.program?.googleAnalyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', ${programState?.program?.googleAnalyticsId});
        `}
        </Script>
        {children}
      </>
    </ProgramContext.Provider>
  );
};
