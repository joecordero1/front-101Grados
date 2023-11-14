import React from 'react';

import { useAuth } from 'hooks';

export const AccountDetails = () => {
  const { participant } = useAuth();

  return (
    <form action="#" className="form">
      <label>Usuario *</label>
      <input
        type="email"
        className="form-control"
        name="email"
        required
        value={participant.username}
      />

      <div className="row">
        <div className="col-sm-6">
          <label>Nombre *</label>
          <input
            type="text"
            className="form-control"
            name="first_name"
            required
            value={participant.firstName}
          />
        </div>
        <div className="col-sm-6">
          <label>Apellido *</label>
          <input
            type="text"
            className="form-control"
            name="last_name"
            required
            value={participant.lastName}
          />
        </div>
      </div>

      <label>Cédula</label>
      <input
        type="text"
        className="form-control"
        name="mobile"
        required
        value={participant.document}
      />

      <label>Correo electrónico</label>
      <input
        type="email"
        className="form-control"
        name="email"
        required
        value={participant.email}
      />

      <label>Teléfono</label>
      <input
        type="tel"
        className="form-control"
        name="mobile"
        required
        value={participant.mobile}
      />

      <fieldset>
        <legend>Actualización de Contraseña</legend>
        <label>Contraseña actual</label>
        <input
          type="password"
          className="form-control"
          name="current_password"
        />

        <label>Nueva contraseña</label>
        <input type="password" className="form-control" name="new_password" />

        <label>Confirmar nueva contraseña</label>
        <input
          type="password"
          className="form-control"
          name="confirm_password"
        />
      </fieldset>

      <button type="submit" className="btn btn-primary">
        Guardar cambios
      </button>
    </form>
  );
};
