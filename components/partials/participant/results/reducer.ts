import queryString from "query-string";
import { useCallback, useEffect, useReducer } from "react";
import { useApiAuth, useAuth, useProgram } from "~/hooks";
import { Result } from "~/utils/types";

type GetMyResults = {
  type: "GET_MY_RESULTS";
  payload: {
    results: Result[];
  };
};

type GetGroupedResults = {
  type: "GET_GROUPED_RESULTS";
  payload: {
    results: {
      parent: Result;
      children: Result[];
    }[];
  };
};

type GetUngroupedResults = {
  type: "GET_UNGROUPED_RESULTS";
  payload: {
    results: Result[];
  };
};

type HandleStatus = {
  type: "HANDLE_STATUS";
  payload: {
    status: "idle" | "complete";
  };
};

type HandleFilter = {
  type: "HANDLE_FILTER";
  payload: {
    name: string;
    value: any;
  };
};

type ActionTypes =
  | GetMyResults
  | GetUngroupedResults
  | HandleStatus
  | HandleFilter
  | GetGroupedResults;

export type State = {
  status: "idle" | "complete";
  results: any;
  groupedResults: any;
  ungroupedResults: any;
  filters: {
    month?: number | null;
    year: number | null;
  };
};

const initialState: State = {
  status: "idle",
  results: [],
  groupedResults: [],
  ungroupedResults: [],
  filters: {
    // default month is before the current month
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  },
};

const reducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case "GET_MY_RESULTS":
      const { results } = action.payload;
      return {
        ...state,
        results,
      };

    case "GET_GROUPED_RESULTS":
      const groupedResults = action.payload.results;
      return {
        ...state,
        groupedResults,
      };

    case "GET_UNGROUPED_RESULTS":
      const ungroupedResults = action.payload.results;
      return {
        ...state,
        ungroupedResults,
      };
    case "HANDLE_STATUS":
      const { status } = action.payload;
      return {
        ...state,
        status,
      };

    case "HANDLE_FILTER":
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    default:
      return state;
  }
};

export interface ReducerValue extends State {
  getMyResults: () => void;
  getUngroupedResults: () => void;
  handleFilter: (name: string, value: any) => void;
}

export const useMyResults = (): ReducerValue => {
  const api = useApiAuth();
  const { program } = useProgram();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { participant } = useAuth();

  const handleFilter = useCallback((name: string, value: string) => {
    dispatch({
      type: "HANDLE_FILTER",
      payload: {
        name,
        value,
      },
    });
  }, []);

  const getMyResults = useCallback(async () => {
    try {
      const params = {
        order: "DESC",
        ignorePagination: true,
        periodMonth: new Date().getMonth() + 1,
        periodYear: new Date().getFullYear(),
        isAMonthlyResult: false,
        // just send the filters that are not null
        // ...Object.keys(state.filters).reduce((acc, key) => {
        //   if (state.filters[key] !== null) {
        //     acc[key] = state.filters[key];
        //   }
        //   return acc;
        // }, {}),
      };
      const query = queryString.stringify(params);
      const data = await api.get<Result[]>(`/results/my-results?${query}`);

      dispatch({
        type: "GET_MY_RESULTS",
        payload: {
          results: data,
        },
      });
      dispatch({
        type: "HANDLE_STATUS",
        payload: {
          status: "complete",
        },
      });
    } catch (e) {
      console.error("getMyResults", e);
    }
  }, [participant, state.filters]);

  const getUngroupedResults = useCallback(async () => {
    try {
      const params = {
        ignorePagination: true,
        order: "DESC",
        isAMonthlyResult: true,
        ...Object.keys(state.filters).reduce((acc, key) => {
          if (state.filters[key] !== null) {
            acc[key] = state.filters[key];
          }
          return acc;
        }, {}),
      };
      const query = queryString.stringify(params);
      const data = await api.get<Result[]>(`/results/my-results?${query}`);

      dispatch({
        type: "GET_UNGROUPED_RESULTS",
        payload: {
          results: data,
        },
      });

      dispatch({
        type: "HANDLE_STATUS",
        payload: {
          status: "complete",
        },
      });
    } catch (e) {
      console.error("getMyResults", e);
    }
  }, [participant, state.filters]);

  useEffect(() => {
    if (program.id === 8) {
      getUngroupedResults();
    } else {
      getMyResults();
    }
  }, [getMyResults]);

  const groupResults = () => {
    dispatch({
      type: "HANDLE_STATUS",
      payload: {
        status: "idle",
      },
    });

    // Initialize an object to store grouped results
    const groupedResults: {
      [parentId: number]: Result & { children: Result[] };
    } = {};

    // Iterate over each result
    state.results.forEach((result: Result) => {
      const parentId = result.parent?.id;
      if (parentId !== undefined && parentId !== null) {
        if (!groupedResults[parentId]) {
          // If not, initialize an object with all props of result and an empty children array
          groupedResults[parentId] = { ...result, children: [] };
        }
        // Push the result into the children array
        groupedResults[parentId].children.push(result);
      }
    });
    // Convert the groupedResults object into an array of objects
    const result = Object.values(groupedResults);

    dispatch({
      type: "GET_GROUPED_RESULTS",
      payload: {
        results: result,
      },
    });

    dispatch({
      type: "HANDLE_STATUS",
      payload: {
        status: "complete",
      },
    });

    return result;
  };

  useEffect(() => {
    groupResults();
  }, [state.results]);

  return {
    ...state,
    getMyResults,
    handleFilter,
    getUngroupedResults,
  };
};
