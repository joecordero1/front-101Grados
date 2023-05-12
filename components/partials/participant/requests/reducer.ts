import { useReducer, useEffect, useCallback } from "react";
import { useApiAuth } from "~/hooks";
import { useAuth } from "../../../../hooks/useAuth";
import { Page, Request } from "../../../../utils/types";
export type RetrieveRequestsParticipant = {
  type: "retrive-requests-participant";
  payload: {
    requestsParticipant: Request[];
  };
};
export type ActionTypes = RetrieveRequestsParticipant;

export type State = {
  status: "idle" | "complete";
  requestsParticipant: Request[];
};
const initialState: State = {
  status: "idle",
  requestsParticipant: [],
};
const reducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case "retrive-requests-participant":
      const { requestsParticipant } = action.payload;
      return {
        ...state,
        requestsParticipant,
        status: "complete",
      };
    default:
      return state;
  }
};
export interface ReducerValue extends State {
  getParticipantRequests: () => void;
}
export const useRequests = (): ReducerValue => {
  const api = useApiAuth();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { participant } = useAuth();
  const getParticipantRequests = useCallback(async () => {
    try {
      const data = (await api.get<Request[]>("/requests/mine")).reverse();
      dispatch({
        type: "retrive-requests-participant",
        payload: {
          requestsParticipant: data,
        },
      });
    } catch (e) {
      console.error("getParticipantRequests", e);
    }
  }, [participant]);
  useEffect(() => {
    getParticipantRequests();
  }, [getParticipantRequests]);
  return {
    ...state,
    getParticipantRequests,
  };
};
