import { useSnackbar } from "notistack";
import queryString from "query-string";
import { useEffect, useReducer } from "react";

import { useApi, useAuth, useProgram } from "~/hooks";
import { OptionLabel, Participant } from "~/utils/types";

type HandlePdvData = {
  type: "handle-pdv-data";
  payload: {
    field: string;
    value: any;
  };
};

type GetParticipants = {
  type: "get-participants";
  payload: {
    participants: OptionLabel[];
  };
};

type ActionTypes = HandlePdvData | GetParticipants;

type PdvData = {
  name: string | null;
  participantSupervisorId: any;
};

const initialPdvData: PdvData = {
  name: null,
  participantSupervisorId: null,
};

type State = {
  pdvData: PdvData;
  participants: OptionLabel[];
};

const initialState: State = {
  pdvData: initialPdvData,
  participants: [],
};

const Reducer = (state: State, action: ActionTypes) => {
  switch (action.type) {
    case "handle-pdv-data":
      const { field, value } = action.payload;
      return {
        ...state,
        pdvData: {
          ...state.pdvData,
          [field]: value,
        },
      };
    case "get-participants": {
      const { participants } = action.payload;
      return {
        ...state,
        participants,
      };
    }
    default:
      return state;
  }
};

export const useRegisterPdvReducer = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const api = useApi();
  const { enqueueSnackbar } = useSnackbar();
  const { participant } = useAuth();
  const { program } = useProgram();

  const handlePdvData = (field: string, value: any) => {
    dispatch({
      type: "handle-pdv-data",
      payload: {
        field,
        value,
      },
    });
  };

  const getParticipants = async () => {
    try {
      const params = {
        programId: program.id,
        positionId: 36,
      };
      const query = queryString.stringify(params);
      const participants = await api.get<any[]>(`/participants/list?${query}`);
      dispatch({
        type: "get-participants",
        payload: {
          participants: participants.map((participant) => ({
            label: participant.fullName,
            value: participant.id,
          })),
        },
      });
    } catch (error) {
      console.error(error, "get participants");
    }
  };

  const createPdv = async () => {
    try {
      const { name, participantSupervisorId } = state.pdvData;
      await api.post("/groups/register", {
        name,
        level: 1,
        programId: program.id,
        canUploadSnaps: true,
        supervisorId: participantSupervisorId && participantSupervisorId.value,
      });
      enqueueSnackbar("Punto de venta creado con exito", {
        variant: "success",
      });
    } catch (error: any) {
      enqueueSnackbar("a ocurrido un error al crear el punto de venta.", {
        variant: "error",
      });
      console.error(error, "create pdv");
    }
  };

  useEffect(() => {
    getParticipants();
  }, []);

  console.log(state.pdvData, "state.pdvData");

  return {
    ...state,
    handlePdvData,
    createPdv,
  };
};
