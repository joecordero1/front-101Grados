import { useReducer, useEffect } from 'react';
import queryString from 'query-string';

import { useApiAuth } from 'hooks';
import { Result } from 'utils/types';

type CardResult = {
  name: string;
  remaining: number;
  obtained: number;
  objective: number;
  percentage: number;
};

type State = {
  status: 'idle' | 'loading' | 'loading-error';
  error: null | string;
  results: CardResult[] | null;
};

type Actions =
  | { type: 'load'; results: CardResult[] }
  | { type: 'error'; error: string };

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'load':
      return {
        ...state,
        status: 'idle',
        results: action.results,
      };
    case 'error':
      return { ...state, status: 'loading-error', error: action.error };
    default:
      return state;
  }
};

const initialState: State = {
  status: 'loading',
  error: null,
  // result: null,
  results: [
    {
      name: '',
      remaining: 0,
      obtained: 0,
      objective: 0,
      percentage: 0,
    },
  ],
};

export function useResults() {
  const { get } = useApiAuth();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function loadResult() {
      try {
        const params = queryString.stringify({
          ignorePagination: true,
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
          isAMonthlyResult: true,
        });
        const firstResponse = await get<Result[]>(
          `/lala4/results/my-results?${params}`
        );
        const results = firstResponse;
        dispatch({
          type: 'load',
          results: results.map((result) => ({
            name: result.dishItem?.ingredient.name || '',
            remaining:
              result.value1 - result.value2 < 0
                ? 0
                : result.value1 - result.value2,
            obtained: result.value2,
            objective: result.value1,
            percentage: parseFloat(
              ((result.value2 / result.value1) * 100).toFixed(2)
            ),
          })),
        });
      } catch (e) {
        dispatch({ type: 'error', error: e.message });
      }
    }
    loadResult();
  }, [get]);

  return {
    loading: state.status === 'loading',
    loadingError: state.status === 'loading-error',
    error: state.error,
    results: state.results,
  };
}
