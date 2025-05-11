import {
  Button,
  Container,
  Grid,
  InputLabel,
  TextField,
  IconButton,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react';
import { useApiAuth } from '~/hooks';
import { useSnackbar } from 'notistack';

const ChangeMyPassword = () => {
  const api = useApiAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordVerify, setNewPasswordVerify] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleNewPasswordChange = (e) => {
    const newPasswordValue = e.target.value;
    setNewPassword(newPasswordValue);

    // Validate that the password does not contain spaces
    const containsSpaces = newPasswordValue.includes(' ');
    setPasswordsMatch(
      newPasswordValue === newPasswordVerify &&
        !containsSpaces &&
        newPasswordValue.length > 5
    );
  };

  const handleNewPasswordVerifyChange = (e) => {
    const newPasswordVerifyValue = e.target.value;
    setNewPasswordVerify(newPasswordVerifyValue);

    // Validate that the password does not contain spaces
    const containsSpaces = newPasswordVerifyValue.includes(' ');
    setPasswordsMatch(
      newPassword === newPasswordVerifyValue &&
        !containsSpaces &&
        newPassword.length > 5
    );
  };

  const saveNewPassword = async () => {
    try {
      await api.put('/lala4/participants/mine', {
        password: newPassword,
      });
      enqueueSnackbar('Contraseña cambiada correctamente', {
        variant: 'success',
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error al cambiar la contraseña', { variant: 'error' });
    }
  };

  return (
    <div>
      <Container sx={{ width: '100%', height: '100vh', marginTop: 10 }}>
        <Grid container spacing={1}>
          {!passwordsMatch && (
            <Typography variant='h5' color='error'>
              {
                'Las contraseñas no coinciden, contienen espacios en blanco, o la contraseña es demasiado corta (mínimo 6 caracteres)'
              }
            </Typography>
          )}
          <Grid item xs={12}>
            <InputLabel sx={{ mb: 1, fontSize: 14, fontWeight: 'bold' }}>
              {'Nueva Contraseña'}
            </InputLabel>
            <TextField
              fullWidth
              required
              inputProps={{ style: { fontSize: 16 } }}
              name='password'
              value={newPassword}
              type={showPassword ? 'text' : 'password'}
              placeholder={'Ingrese su nueva contraseña'}
              variant='outlined'
              onChange={handleNewPasswordChange}
            />
            <IconButton onClick={handleTogglePasswordVisibility} size='large'>
              {showPassword ? (
                <VisibilityOff fontSize='large' />
              ) : (
                <Visibility fontSize='large' />
              )}
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <InputLabel sx={{ mb: 1, fontSize: 14, fontWeight: 'bold' }}>
              {'Repita la contraseña'}
            </InputLabel>
            <TextField
              fullWidth
              required
              inputProps={{ style: { fontSize: 16 } }}
              name='passwordVerify'
              value={newPasswordVerify}
              type={showPassword ? 'text' : 'password'}
              placeholder={'Repita la contraseña'}
              variant='outlined'
              onChange={handleNewPasswordVerifyChange}
            />
          </Grid>
        </Grid>
        <Button
          variant='contained'
          color='primary'
          sx={{ mt: 3, fontSize: 13 }}
          size='large'
          disabled={!passwordsMatch}
          onClick={saveNewPassword}
        >
          {'Cambiar Contraseña'}
        </Button>
      </Container>
    </div>
  );
};

export default ChangeMyPassword;
