import React from 'react';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';

import { useAuth, useForm, useApiAuth } from 'hooks';
import { EditParticipant } from '~/utils/types';

export const AccountDetails = () => {
  const { participant, setSession } = useAuth();
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
  const { push } = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name as keyof EditParticipant, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('touched', touched);
    try {
      await put(`/participants/mine`, touched);
      setSession();
      if (touched.newPassword) {
        enqueueSnackbar('Contraseña actualizada', { variant: 'success' });
      } else {
        enqueueSnackbar('Información actualizada', { variant: 'success' });
      }
      push('/');
    } catch (e) {
      console.error('Error updating participant info', e);
    }
  };

  return (
    <form action="#" className="form" onSubmit={handleSubmit}>
      <label>Usuario *</label>
      <input
        className="form-control"
        name="username"
        required
        value={values.username}
        onChange={handleInputChange}
      />

      <div className="row">
        <div className="col-sm-6">
          <label>Nombre *</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            required
            value={values.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-sm-6">
          <label>Apellido *</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            required
            value={values.lastName}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <label>Cédula</label>
      <input
        type="text"
        className="form-control"
        name="document"
        value={values.document}
        onChange={handleInputChange}
      />

      <label>Correo electrónico</label>
      <input
        type="email"
        className="form-control"
        name="email"
        value={values.email}
        onChange={handleInputChange}
      />

      <label>Teléfono</label>
      <input
        type="tel"
        className="form-control"
        name="mobile"
        required
        value={values.mobile}
        onChange={handleInputChange}
      />

      <fieldset>
        <legend>Actualización de Contraseña</legend>
        <label>Contraseña actual</label>
        <input
          type="password"
          className="form-control"
          name="currentPassword"
          value={values.currentPassword}
          onChange={handleInputChange}
        />

        <label>Nueva contraseña</label>
        <input
          type="password"
          className="form-control"
          name="newPassword"
          value={values.newPassword}
          onChange={handleInputChange}
        />

        <label>Confirmar nueva contraseña</label>
        <input
          type="password"
          className="form-control"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleInputChange}
        />
      </fieldset>

      <button type="submit" className="btn btn-primary">
        Guardar cambios
      </button>
    </form>
  );
};
