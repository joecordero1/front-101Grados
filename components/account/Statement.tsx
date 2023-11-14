import React from 'react';

import { useTransactions } from 'hooks';

export const Statement = () => {
  const { transactions } = useTransactions();

  // console.log('transactions', transactions);

  return (
    <div>
      <div>Statement</div>
    </div>
  );
};
