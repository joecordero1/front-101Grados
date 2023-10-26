import { useReducer, useEffect, useCallback } from "react";
import { useApiAuth } from "~/hooks";
import { useAuth } from "../../../../hooks/useAuth";
import { AccountBalance, Transaction } from "../../../../utils/types";
import queryString from "query-string";
export type RetrieveAccountBalance = {
  type: "RETRIEVE_ACCOUNT_BALANCE";
  payload: {
    accountBalance: AccountBalance;
  };
};

export type RetrieveMyTransactions = {
  type: "RETRIEVE_MY_TRANSACTIONS";
  payload: {
    transactions: Transaction[];
  };
};

/* type HandleFiltersChange = {
  type: "HANDLE_FILTERS_CHANGE";
  payload: {
    field: string;
    value: any;
  };
}; */
export type ActionTypes =
  | RetrieveAccountBalance /* | HandleFiltersChange */
  | RetrieveMyTransactions;

/* type FilterOptions = {
  month: number;
  year: number;
}; */

/* const initialFilterOptions: FilterOptions = {
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
}; */

export type State = {
  status: "idle" | "complete";
  accountBalance: AccountBalance;
  myTransactions: Transaction[];
  /* filterOptions?: FilterOptions; */
};
const initialState: State = {
  status: "idle",
  accountBalance: {
    incomePoints: "0",
    expensePoints: "0",
  },
  myTransactions: [],
  /*   filterOptions: initialFilterOptions, */
};
const reducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case "RETRIEVE_ACCOUNT_BALANCE":
      const { accountBalance } = action.payload;
      return {
        ...state,
        status: "complete",
        accountBalance: accountBalance,
      };

    case "RETRIEVE_MY_TRANSACTIONS":
      const { transactions } = action.payload;
      return {
        ...state,
        status: "complete",
        myTransactions: transactions,
      };

    /*  case "HANDLE_FILTERS_CHANGE":
      const { field, value } = action.payload;
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          [field]: value,
        },
      }; */
    default:
      return state;
  }
};
export interface ReducerValue extends State {
  getAccountBalance: () => void;
  /* handleFiltersChange: (field: string, value: any) => void; */
}
export const useAccountBalance = (): ReducerValue => {
  const api = useApiAuth();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { participant } = useAuth();
  const getAccountBalance = async () => {
    try {
      /*  const params = {
        month: state.filterOptions.month,
        year: state.filterOptions.year,
      }; */

      /*  const query = queryString.stringify(params); */

      const data = await api.get<AccountBalance>(
        `/points/my-account-balance` /* + query */
      );
      dispatch({
        type: "RETRIEVE_ACCOUNT_BALANCE",
        payload: {
          accountBalance: data,
        },
      });
    } catch (e) {
      console.error("getAccountBalance", e);
    }
  };

  const getMyTransactions = async () => {
    const params = {
      order: "DESC",
    };
    const query = queryString.stringify(params);
    try {
      const data = await api.get<Transaction[]>(`/transactions/mine?${query}`);
      dispatch({
        type: "RETRIEVE_MY_TRANSACTIONS",
        payload: {
          transactions: data,
        },
      });
    } catch (e) {
      console.error("getMyTransactions", e);
    }
  };

  /* 
  const handleFiltersChange = (field: string, value: any) => {
    dispatch({
      type: "HANDLE_FILTERS_CHANGE",
      payload: {
        field,
        value,
      },
    });
  }; */

  useEffect(() => {
    getAccountBalance();
    getMyTransactions();
  }, []);
  return {
    ...state,
    getAccountBalance,
  };
};
