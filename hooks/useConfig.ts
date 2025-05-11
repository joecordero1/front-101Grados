import { useCallback } from 'react';
import { useFetch } from './useFetch';

import { ParticipantConfig } from 'utils/types';
import { useApiAuth } from './useApiAuth';

export const useConfig = () => {
  const { get } = useApiAuth();

  const getConfig = useCallback(async () => {
    try {
      const config = await get<ParticipantConfig>('/lala4/app/config');

      return config;
    } catch (error) {
      console.error(error);
      return null;
    }
  }, []);

  const { data, loadData, error, loading } = useFetch<ParticipantConfig>({
    getData: getConfig,
    initialData: null,
  });

  return {
    getConfig,
    data,
    loadData,
    error,
    loading,
  };
};
