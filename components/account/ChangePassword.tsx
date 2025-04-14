import React, { useState } from 'react';
import { useSnackbar } from 'notistack';

import { useAuth, useForm, useApiAuth, useProgram } from 'hooks';
import { EditParticipant } from '~/utils/types';
import { parseCredentials, removeFirstChar } from '~/utils';
import { useRouter } from 'next/router';

export const ChangePassword = () => {
  const router = useRouter();
  const { participant, setSession } = useAuth();
  const { program } = useProgram();
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const { put } = useApiAuth();
  const { values, onChange, touched } = useForm<EditParticipant>({
    username: participant.username,
    firstName: participant.firstName,
    lastName: participant.lastName,
    document: participant.document,
    email: participant.email,
    mobile: participant.mobile,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const { enqueueSnackbar } = useSnackbar();

  const isPasswordValid = (password: string) => {
    const minLength = 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return password.length >= minLength && hasLetter && hasNumber;
  };

  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseñas

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'newPassword') {
      if (!value) {
        setPasswordError(null);
      } else if (!isPasswordValid(value)) {
        setPasswordError(
          'Debe tener mínimo 8 caracteres, incluyendo letras y números.'
        );
      } else {
        setPasswordError(null);
      }
    }

    onChange(name as keyof EditParticipant, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (touched.newPassword && !isPasswordValid(touched.newPassword)) {
      enqueueSnackbar(
        'La nueva contraseña debe tener al menos 8 caracteres, incluyendo letras y números.',
        { variant: 'error' }
      );
      return;
    }

    try {
      await put(`/lala4/participants/mine`, touched);
      setSession();
      if (touched.newPassword) {
        enqueueSnackbar('Contraseña actualizada', { variant: 'success' });
      } else {
        enqueueSnackbar('Información actualizada', { variant: 'success' });
      }
      router.push('/');
    } catch (e) {
      console.error('Error updating participant info', e);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState); // Cambiar el estado para mostrar/ocultar contraseñas
  };

  return (
    <form action='#' className='form' onSubmit={handleSubmit}>
      <p className='text-red-500 text-2xl font-bold'>
        Por favor actualiza tu contraseña
      </p>
      <legend>Actualización de Contraseña</legend>
      <fieldset>
        <label>Contraseña actual</label>
        <div className='password-input-wrapper'>
          <input
            type={showPassword ? 'text' : 'password'} // Cambiar tipo según estado
            className='form-control'
            name='currentPassword'
            value={values.currentPassword}
            onChange={handleInputChange}
          />
          <button
            type='button'
            className='toggle-password-btn font-bold text-blue-500 mb-2'
            onClick={togglePasswordVisibility}
          >
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>

        <div
          style={{
            display: 'flex',
          }}
        >
          {program.id !== 26 && program.supportPhone.length > 0 ? (
            <a
              href={`https://api.whatsapp.com/send?phone=${removeFirstChar(
                program.supportPhone
              )}&text=https://api.whatsapp.com/send?phone=99143091&text=Hola!%20Soy%20${
                participant?.fullName
              }%20podr%C3%ADan%20ayudarme%20reseteando%20mi%20contrase%C3%B1a%20por%20favor?%20Mi%20ID%20de%20usuario%20es%20el:%20${
                participant?.id
              }%20y%20mi%20identificador%20es%20el%20${parseCredentials(
                participant?.identifier
              )}.%20Muchas%20gracias!%20`}
              style={{
                textAlign: 'right',
                width: '100%',
              }}
              target='_blank'
            >
              ¿Olvidaste tu contraseña?
            </a>
          ) : (
            program.id !== 26 && (
              <a
                href={`mailto:${program.supportEmail}&text=Hola!%20Soy%20${
                  participant.fullName
                }%20podr%C3%ADan%20ayudarme%20reseteando%20mi%20contrase%C3%B1a%20por%20favor?%20Mi%20ID%20de%20usuario%20es%20el:%20${
                  participant.id
                }%20y%20mi%20identificador%20es%20el%20${parseCredentials(
                  participant.identifier
                )}.%20Muchas%20gracias!%20`}
                style={{
                  textAlign: 'right',
                  width: '100%',
                }}
                target='_blank'
              >
                ¿Olvidaste tu contraseña?
              </a>
            )
          )}
        </div>

        <label>Nueva contraseña</label>
        <div className='password-input-wrapper'>
          <input
            type={showPassword ? 'text' : 'password'}
            className='form-control'
            name='newPassword'
            value={values.newPassword}
            onChange={handleInputChange}
          />
          {passwordError && (
            <p className='text-red-500 text-md mt-1'>{passwordError}</p>
          )}
        </div>

        <label>Confirmar nueva contraseña</label>
        <div className='password-input-wrapper'>
          <input
            type={showPassword ? 'text' : 'password'} // Cambiar tipo según estado
            className='form-control'
            name='confirmPassword'
            value={values.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
      </fieldset>

      <button type='submit' className='btn btn-primary'>
        Guardar cambios
      </button>
    </form>
  );
};
