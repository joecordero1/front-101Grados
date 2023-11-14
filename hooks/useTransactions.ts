import { useState, useEffect } from 'react';
import queryString from 'querystring';

import { useApiAuth } from '~/hooks';
import { Transaction, TransactionType, PaginationMetaDto } from 'utils/types';

interface TransactionFilter {
  types?: TransactionType[];
  includeRolledBackTransactions?: boolean;
}

export const useTransactions = ({
  initialFilters,
  initialMeta,
}: {
  initialFilters?: TransactionFilter;
  initialMeta?: PaginationMetaDto;
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { get } = useApiAuth();
  const [filters, setFilters] = useState<TransactionFilter>(
    initialFilters || {
      includeRolledBackTransactions: false,
    }
  );
  const [meta, setMeta] = useState<PaginationMetaDto>(
    initialMeta || {
      // page: 1,
      // take: 10,
      order: 'DESC',
    }
  );

  const getTransactions = async () => {
    try {
      setLoading(true);
      console.log('Buscando transacciones');
      const params = {
        ...filters,
        ...meta,
      };
      const query = queryString.stringify(params);
      const data = await get<Transaction[]>(`/transactions/mine?${query}`);
      setTransactions(data);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, [
    filters.types,
    filters.includeRolledBackTransactions,
    meta.page,
    meta.take,
    meta.order,
  ]);

  const handleFilterChange = (
    newFilters: Partial<TransactionFilter>,
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

  const handleMetaChange = (
    newMeta: Partial<PaginationMetaDto>,
    replace = false
  ) => {
    if (replace) {
      setMeta(newMeta);
    } else {
      setMeta({
        ...meta,
        ...newMeta,
      });
    }
  };

  return {
    transactions,
    loading,
    error,
    handleFilterChange,
    handleMetaChange,
  };
};
