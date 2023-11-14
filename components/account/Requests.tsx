import React from 'react';

import { useRequests, useProgram } from 'hooks';
import { capitalizeFirstChar, formatDistance } from 'utils';
import { statusField } from '../partials/requests';
import { StatusTypes } from '~/utils/types';

export const Requests = () => {
  const { requests, loading } = useRequests();
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
      {requests.map((request) => (
        <div className="card" key={request.id}>
          <div
            style={{
              background: '#E3E3E3',
              height: '2px',
              width: '100%',
            }}
          ></div>
          <div
            style={{
              display: 'flex',
              alignItems: 'start',
              justifyContent: 'start',
              padding: '1rem',
            }}
          >
            <img
              src={request.award.mainImage}
              alt={request.award.name}
              width={75}
              style={{
                marginRight: '1rem',
              }}
            />
            <div>
              <h2
                style={{
                  fontSize: '1.5rem',
                  margin: '0',
                }}
              >
                {request.award.name} | {request.award.model}
              </h2>
              <p className="m-0">
                Código: {''}
                <span className="font-weight-bold">{request.code}</span>
              </p>

              <p className="m-0">
                <span className="font-weight-light">Estado: </span>
                {statusField(request.status)}
              </p>
            </div>
          </div>
          <div>
            {/* <p className="m-0">Marca: {request.award.brand?.name}</p> */}
            <p className="m-0">
              <span className="font-weight-bold">Comprado en: </span>
              {request.points} {capitalizeFirstChar(coinName)}
            </p>
            <p className="m-0">
              <span className="font-weight-bold">Fecha: </span>
              {formatDistance(request.requestedAt)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
