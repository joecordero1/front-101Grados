import React, { useState } from 'react';
import { Modal, TextField, Button } from '@mui/material';

import { useSnackbar } from 'notistack';
import { useApiAuth } from '~/hooks';

const MyBirthDateForm = ({ open, onClose }) => {
  const [dateOfBirth, setDateOfBirth] = useState('');
  const api = useApiAuth();
  const { enqueueSnackbar } = useSnackbar();
  const handleConfirm = async () => {
    if (!dateOfBirth) {
      enqueueSnackbar('Por favor, ingrese la fecha de nacimiento.', {
        variant: 'error',
      });
      return;
    }

    try {
      await api.put('/lala4/participants/mine', { dateOfBirth });
      enqueueSnackbar('Fecha de nacimiento guardada correctamente.', {
        variant: 'success',
      });
      onClose(); // Cierra el modal al guardar correctamente
    } catch (e) {
      console.error(e);
      enqueueSnackbar('Ocurrió un error al guardar la fecha de nacimiento.', {
        variant: 'error',
      });
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          width: '90%',
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            margin: 0,
            marginBottom: '20px',
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
          Ingresa tu fecha de Nacimiento
        </h2>
        <TextField
          label='Fecha de Nacimiento'
          type='date'
          inputProps={{
            style: { fontSize: '17px' },
          }}
          size='medium'
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            variant='contained'
            color='primary'
            onClick={handleConfirm}
            style={{
              fontSize: '12px',
            }}
            size='large'
          >
            Confirmar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default MyBirthDateForm;
