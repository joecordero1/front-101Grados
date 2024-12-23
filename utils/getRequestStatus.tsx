import React from 'react';
import { StatusTypes } from './types';

export const getStatusElement = (status) => {
  const statusMap = {
    [StatusTypes.SPECIALS]: { text: 'PENDIENTE', color: 'text-yellow-500' },
    [StatusTypes.ORDERRED]: { text: 'PENDIENTE', color: 'text-yellow-500' },
    [StatusTypes.NEWS]: { text: 'PENDIENTE', color: 'text-yellow-500' },
    [StatusTypes.APPROVED]: { text: 'APROBADO', color: 'text-blue-500' },
    [StatusTypes.REQUESTED]: { text: 'SOLICITADO', color: 'text-blue-500' },
    [StatusTypes.DISPATCHED]: { text: 'EN BODEGA', color: 'text-blue-500' },
    [StatusTypes.WAREHOUSE]: { text: 'EN BODEGA', color: 'text-blue-500' },
    [StatusTypes.DELIVERED]: { text: 'RECIBIDO', color: 'text-green-500' },
    [StatusTypes.CANCELED]: { text: 'ANULADO', color: 'text-red-500' },
  };

  const { text, color } = statusMap[status] || {
    text: 'DESCONOCIDO',
    color: 'text-gray-500',
  };

  return <p className={`font-semibold ${color}`}>{text}</p>;
};
