import React from 'react';

import { StatusTypes } from '~/utils/types';

export const statusField = (status: StatusTypes) => {
  let statusColor = '';
  let statusText = '';

  switch (status) {
    case StatusTypes.REQUESTED:
      statusColor = 'bg-info';
      statusText = 'Solicitado';
      break;
    case StatusTypes.APPROVED:
      statusColor = 'bg-info';
      statusText = 'Aprobado';
      break;
    case StatusTypes.ORDERRED:
      // statusColor = 'bg-info';
      statusColor = 'bg-primary';
      // statusText = 'Ordenado';
      statusText = 'Aprobado';
      break;
    case StatusTypes.WAREHOUSE:
      statusColor = 'bg-primary';
      statusText = 'Bodega';
      break;
    case StatusTypes.DISPATCHED:
      statusColor = 'bg-success';
      statusText = 'En camino';
      break;
    case StatusTypes.DELIVERED:
      statusColor = 'bg-success';
      statusText = 'Entregado';
      break;
    case StatusTypes.CANCELED:
      statusColor = 'bg-danger';
      statusText = 'Anulado';
      break;
    case StatusTypes.SPECIALS:
      statusColor = 'bg-warning';
      statusText = 'Novedad';
      break;
    case StatusTypes.NEWS:
      statusColor = 'bg-warning';
      statusText = 'Novedad';
      break;
    default:
      statusColor = 'bg-warning';
      statusText = 'Solicitado';
      break;
  }

  return (
    <span
      className={`${statusColor} `}
      style={{
        fontSize: '1.2rem',
        borderRadius: '2rem',
        padding: '0.5rem 1rem',
      }}
    >
      {statusText}
    </span>
  );
};
