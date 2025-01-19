import { useState, useEffect } from 'react';

import { useApiAuth } from './useApiAuth';
import { Address } from '~/utils/types';

export const useAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const api = useApiAuth();

  const getMyAddresses = async () => {
    try {
      setLoading(true);
      const myAddressesData = await api.get<Address[]>('/lala4/addresses/mine');
      setAddresses(myAddressesData);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyAddresses();
  }, []);

  return {
    addresses,
    loading,
    error,
    getMyAddresses,
  };
};
