import React, { useState } from 'react';

import ALink from '~/components/features/custom-link';

const SignIn = () => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className="form-box"
        style={{
          background: '#EAEAEA',
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        <div className="tab tab-nav-simple tab-nav-boxed form-tab">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <ALink href="/" className="logo">
              <img
                src="../images/home/logo.png"
                alt="logo"
                width="153"
                height="44"
              />
            </ALink>
          </div>
          <span className="nav-link border-no lh-1 ls-normal">Ingresa</span>

          <div className="tab-">
            <form action="#">
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="singin-email"
                  name="singin-email"
                  placeholder="Usuario *"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="singin-password"
                  placeholder="Contraseña *"
                  name="singin-password"
                  required
                />
              </div>
              <button
                className="btn btn-dark btn-block btn-rounded mt-5"
                type="submit"
              >
                Ingresar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
