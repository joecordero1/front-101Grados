import React, { useState } from 'react';

import ALink from '~/components/features/custom-link';

import { useForm, useAuth, useProgram } from 'hooks';

const SignIn = () => {
  const { program } = useProgram();
  const { values, onChange } = useForm<{
    username: string;
    password: string;
  }>({
    username: null,
    password: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const { logIn } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    logIn(values.username, values.password);
  };

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
                // src="../images/home/logo.png"
                src={program.logo}
                alt="logo"
                width="153"
                height="44"
              />
            </ALink>
          </div>
          <span className="nav-link border-no lh-1 ls-normal">Ingresa</span>

          <div className="tab-">
            <form action="#" onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="singin-email"
                  name="singin-email"
                  placeholder="Usuario *"
                  required
                  value={values.username || ''}
                  onChange={(e) =>
                    onChange(
                      'username',
                      e.target.value.length > 0 ? e.target.value : null
                    )
                  }
                />
              </div>
              <div className="form-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  id="singin-password"
                  placeholder="Contraseña *"
                  name="singin-password"
                  required
                  value={values.password || ''}
                  onChange={(e) =>
                    onChange(
                      'password',
                      e.target.value.length > 0 ? e.target.value : null
                    )
                  }
                />
                <p
                  style={{
                    textAlign: 'right',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </p>
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
