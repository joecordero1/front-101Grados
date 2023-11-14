import { useState, useEffect } from 'react';

import { useApiAuth } from '~/hooks';
import { Transaction, TransactionType } from 'utils/types';

interface TransactionFilter {
  types?: TransactionType[];
  includeRolledBackTransactions?: boolean;
}

export const useTransactions = (initialFilters?: TransactionFilter) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { get } = useApiAuth();
  const [filters, setFilters] = useState<TransactionFilter>(
    initialFilters || {
      includeRolledBackTransactions: false,
    }
  );

  const getTransactions = async () => {
    try {
      setLoading(true);
      console.log('Buscando transacciones');
      const data = await get<Transaction[]>('/transactions/mine');
      setTransactions(data);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, [filters.types, filters.includeRolledBackTransactions]);

  const handleFilterChange = (
    newFilters: TransactionFilter,
    replace = false
  ) => {
    if (replace) {
      setFilters(newFilters);
    } else {
      setFilters({
        ...filters,
        ...newFilters,
      });
    }
  };

  return {
    transactions,
    loading,
    error,
    handleFilterChange,
  };
};
