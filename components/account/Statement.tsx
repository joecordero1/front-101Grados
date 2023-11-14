import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { useTransactions, useProgram } from 'hooks';
import { TransactionType } from '~/utils/types';
import { capitalizeFirstChar } from 'utils';

export const Statement = () => {
  const { transactions, loading } = useTransactions({});
  const { coinName } = useProgram();

  // If loading return spinner
  if (loading)
    return (
      <div className="text-center">
        <i
          className="fas fa-spinner fa-spin"
          style={{
            fontSize: '3rem',
          }}
        ></i>
      </div>
    );

  return (
    <div>
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          style={{
            display: 'flex',
            borderBottom: '1px solid #ccc',
            justifyContent: 'space-between',
            padding: '1rem 0',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <span
              style={{
                fontSize: '1.3rem',
                color: '#989898',
                fontWeight: 'bold',
              }}
            >
              Ref: {transaction.id}
            </span>
            <h6
              style={{
                fontSize: '1.4rem',
                fontWeight: 'normal',
                // marginBottom: '0.5rem',
                margin: 0,
              }}
            >
              {transaction.description}
            </h6>
            <span
              style={{
                fontSize: '1.3rem',
                color: '#999',
              }}
            >
              {format(new Date(transaction.createdAt), 'dd/MM/yyyy HH:mm')}
            </span>
            <span
              style={{
                fontSize: '1.2rem',
                color: '#999',
                fontWeight: 'lighter',
              }}
            >
              {transaction.type === TransactionType.INCOME
                ? 'Obtenidos en:'
                : 'Descontados de:'}{' '}
              {capitalizeFirstChar(
                format(
                  new Date(`${transaction.month} 1 ${transaction.year}`),
                  'MMMM YYY',
                  {
                    locale: es,
                  }
                )
              )}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <span
              style={{
                fontWeight: 'bold',
                color:
                  transaction.type === TransactionType.INCOME
                    ? '#74D575'
                    : '#D5635F',
                fontSize: '1.6rem',
                textAlign: 'right',
                lineHeight: '1.5rem',
              }}
            >
              {transaction.type === TransactionType.INCOME ? '+' : '-'}
              {transaction.points} {capitalizeFirstChar(coinName)}
            </span>
            <span
              style={{
                textAlign: 'right',
                lineHeight: '1.5rem',
              }}
            >
              {transaction.afterPoints} {capitalizeFirstChar(coinName)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
