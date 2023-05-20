import { useReducer, useEffect, useCallback } from "react";
import { useApiAuth } from "~/hooks";
import { useAuth } from "../../../../hooks/useAuth";
import { AccountStatus, Page, Request } from "../../../../utils/types";
import queryString from "query-string";
export type RetrieveAccountStatus = {
  type: "RETRIEVE_ACCOUNT_STATUS";
  payload: {
    accountsStatus: AccountStatus;
  };
};

type HandleFiltersChange = {
  type: "HANDLE_FILTERS_CHANGE";
  payload: {
    field: string;
    value: any;
  };
};
export type ActionTypes = RetrieveAccountStatus | HandleFiltersChange;

type FilterOptions = {
  month: number;
  year: number;
};

const initialFilterOptions: FilterOptions = {
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
};

export type State = {
  status: "idle" | "complete";
  accountStatus: AccountStatus;
  filterOptions?: FilterOptions;
};
const initialState: State = {
  status: "idle",
  accountStatus: {
    incomePoints: [],
    expensePoints: [],
  },
  filterOptions: initialFilterOptions,
};
const reducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case "RETRIEVE_ACCOUNT_STATUS":
      const { accountsStatus } = action.payload;
      return {
        ...state,
        status: "complete",
        accountStatus: accountsStatus,
      };
    case "HANDLE_FILTERS_CHANGE":
      const { field, value } = action.payload;
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          [field]: value,
        },
      };
    default:
      return state;
  }
};
export interface ReducerValue extends State {
  getAccountStatus: () => void;
  handleFiltersChange: (field: string, value: any) => void;
}
export const useAccountStatus = (): ReducerValue => {
  const api = useApiAuth();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { participant } = useAuth();
  const getAccountStatus = async () => {
    try {
      const params = {
        month: state.filterOptions.month,
        year: state.filterOptions.year,
      };

      const query = queryString.stringify(params);

      const data = await api.get<AccountStatus>(
        "/points/my-account-statement?" + query
      );
      dispatch({
        type: "RETRIEVE_ACCOUNT_STATUS",
        payload: {
          accountsStatus: data,
        },
      });
    } catch (e) {
      console.error("getAccountStatus", e);
    }
  };

  const handleFiltersChange = (field: string, value: any) => {
    dispatch({
      type: "HANDLE_FILTERS_CHANGE",
      payload: {
        field,
        value,
      },
    });
  };

  useEffect(() => {
    getAccountStatus();
  }, [state.filterOptions.month, state.filterOptions.year]);
  console.log(state.filterOptions, "filter options");
  return {
    ...state,
    getAccountStatus,
    handleFiltersChange,
  };
};
