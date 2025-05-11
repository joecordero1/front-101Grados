import React, { useState } from 'react';

import ALink from '~/components/features/custom-link';

import { useForm, useAuth, useProgram } from 'hooks';
import { removeFirstChar } from '~/utils';
import { useRouter } from 'next/router';

const SignIn = () => {
  const { program } = useProgram();
  const { push } = useRouter();
  const { values, onChange } = useForm<{
    username: string;
    password: string;
  }>({
    username: null,
    password: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const { logIn, logInUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.username);

    if (program.id === 40 && isEmail) {
      try {
        const token = await logInUser(values.username, values.password);
        if (token) {
          push(`https://asesores.conticlubec.com/login?token=${token}`);
        }
      } catch (err) {
        console.error('Error en logInUser', err);
      }
    } else {
      logIn(values.username, values.password);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${program.loginScreen})`,
        backgroundPosition: 'bottom',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className='form-box'
        style={{
          background: '#EAEAEA',
          padding: '20px',
          borderRadius: '10px',
          width: '350px',
        }}
      >
        <div className='tab tab-nav-simple tab-nav-boxed form-tab'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <ALink href='/' className='logo'>
              <img src={program.logoBig} alt='logo' width='153' height='44' />
            </ALink>
          </div>
          <span className='nav-link border-no lh-1 ls-normal'>Ingresa</span>

          <div className='tab-'>
            <form action='#' onSubmit={handleSubmit}>
              <div className='form-group mb-3'>
                <input
                  type='text'
                  className='form-control'
                  id='singin-email'
                  name='singin-email'
                  placeholder='Usuario *'
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
              <div className='form-group'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='form-control'
                  id='singin-password'
                  placeholder='Contraseña *'
                  name='singin-password'
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
              <div
                style={{
                  display: 'flex',
                }}
              >
                {program.supportPhone.length > 0 ? (
                  <a
                    href={`https://api.whatsapp.com/send?phone=${removeFirstChar(
                      program.supportPhone
                    )}&text=https://api.whatsapp.com/send?phone=99143091&text=`}
                    style={{
                      textAlign: 'right',
                      width: '100%',
                    }}
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                ) : (
                  <a
                    href={`mailto:${program.supportEmail}&text=`}
                    style={{
                      textAlign: 'right',
                      width: '100%',
                    }}
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                )}
              </div>
              <button
                className='btn btn-dark btn-block btn-rounded mt-5'
                type='submit'
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
