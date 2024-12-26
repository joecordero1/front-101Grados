import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth, useForm, useProgram } from '../../../hooks';

const SignIn = () => {
  const { logIn } = useAuth();
  const { program } = useProgram();
  const { values, onChange } = useForm({
    username: null,
    password: null,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    logIn(values.username, values.password);
  };

  return (
    <div
      className='flex items-center justify-center h-screen bg-cover bg-center'
      style={{
        backgroundImage: `url(${program.loginScreen})`,
      }}
    >
      <div className='bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-lg w-[90%] max-w-lg'>
        <div className='text-center'>
          <img
            src={program.logoBig}
            alt='logo'
            className='w-48 h-40 mx-auto'
            style={{
              objectFit: 'contain',
              opacity: 0.9,
            }}
          />
        </div>
        <div className='text-center mt-1'>
          <h2 className='text-3xl font-bold text-white'>Ingresa</h2>
        </div>
        <form onSubmit={handleSubmit} className='mt-3'>
          <div className='mb-4'>
            <label
              htmlFor='username'
              className='block text-white text-md font-medium mb-2'
            >
              Usuario:
            </label>
            <input
              type='text'
              id='username'
              placeholder='1234567890'
              className='w-full p-2 rounded-md bg-white/30 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400'
              value={values.username}
              onChange={(e) => onChange('username', e.target.value || null)}
              required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block text-white text-md font-medium mb-2'
            >
              Contraseña:
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              placeholder='************'
              className='w-full p-2 rounded-md bg-white/30 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400'
              value={values.password}
              onChange={(e) => onChange('password', e.target.value || null)}
              required
            />
            <p
              className='text-right text-md  cursor-pointer mt-2 text-gray-100'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </p>
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition'
          >
            Ingresar
          </button>
          <div className='text-center text-md text-gray-100 mt-4'>
            ¿Aún no eres socio?{' '}
            <Link href='/signup' className=' font-bold hover:underline'>
              Regístrate
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
