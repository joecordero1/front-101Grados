import { useState, useEffect, use } from 'react';

import { useApiAuth } from '~/hooks';
import { Request } from 'utils/types';

export const useRequests = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { get } = useApiAuth();

  const getRequests = async () => {
    try {
      setLoading(true);
      const data = await get<Request[]>('/requests/mine');
      setRequests(data);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  return {
    requests,
    loading,
    error,
  };
};
