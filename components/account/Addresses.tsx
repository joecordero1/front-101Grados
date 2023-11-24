import React from 'react';

import ALink from '~/components/features/custom-link';

import { useAddresses } from 'hooks';

export const Addresses = () => {
  const { addresses, loading } = useAddresses();

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
      <p className="mb-2">
        Las siguientes direcciones las podrás utilizar en el proceso de canje.
        <br />
        {/* <ALink href="#" className="btn btn-link btn-secondary btn-underline">
          Agregar dirección <i className="far fa-add"></i>
        </ALink> */}
      </p>
      {/* <div className="row"> */}
      {/* <div className="col-sm-6 mb-4"> */}
      {addresses.map((address) => (
        <div
          className="card card-address"
          key={address.id}
          style={{
            border: '2px solid #eaeaea',
            borderRadius: '10px',
            padding: '10px',
          }}
        >
          <div className="card-body">
            <p>
              <span className="text-uppercase font-weight-bold">Alias:</span>{' '}
              {address.alias}
              <br />
              <span className="text-uppercase font-weight-bold">
                Ciudad:
              </span>{' '}
              {address.city}
              <br />
              <span className="text-uppercase font-weight-bold">
                Sector:
              </span>{' '}
              {address.sector}
              <br />
              <span className="text-uppercase font-weight-bold">
                Calle Principal:
              </span>{' '}
              {address.mainStreet}
              <br />
              <span className="text-uppercase font-weight-bold">
                Numeración:
              </span>{' '}
              {address.houseNumber}
              <br />
              <span className="text-uppercase font-weight-bold">
                Calle Secundaria:
              </span>{' '}
              {address.secondaryStreet}
              <br />
              <span className="text-uppercase font-weight-bold">
                Referencia:
              </span>{' '}
              {address.reference}
              <br />
              <span className="text-uppercase font-weight-bold">
                Nombre contacto:
              </span>{' '}
              {address.contactName}
              <br />
              <span className="text-uppercase font-weight-bold">
                Tlf. contacto:
              </span>{' '}
              {address.contactPhone}
              <br />
            </p>
            {/* <ALink
              href="#"
              className="btn btn-link btn-secondary btn-underline"
            >
              Editar <i className="far fa-edit"></i>
            </ALink> */}
          </div>
        </div>
      ))}
      {/* </div>
      </div> */}
    </div>
  );
};
