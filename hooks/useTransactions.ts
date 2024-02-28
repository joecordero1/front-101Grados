import { useState, useEffect } from "react";
import queryString from "querystring";

import { useApiAuth, useAuth, useProgram } from "~/hooks";
import {
  Transaction,
  TransactionType,
  PaginationMetaDto,
  AccountBalance,
} from "utils/types";

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
  const [accountBalance, setAccountBalance] = useState<AccountBalance>();
  const [loading, setLoading] = useState(false);
  const { program } = useProgram();
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
      order: "DESC",
    }
  );

  const getTransactions = async () => {
    try {
      setLoading(true);
      await getAccountBalance();
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

  const getAccountBalance = async () => {
    try {
      const data = await get<AccountBalance>(
        program.id !== 9
          ? `/points/my-account-balance`
          : `/points/my-account-balance-hdt`
      );
      setAccountBalance(data);
      // setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  return {
    transactions,
    loading,
    error,
    handleFilterChange,
    handleMetaChange,
    filters,
    meta,
    accountBalance,
  };
};
