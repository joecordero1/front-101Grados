import { Box, Button, CircularProgress, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import DownloadIcon from '@mui/icons-material/Download';

import { useApiAuth } from '~/hooks';
import styles from './accountStyles.module.css';
import SelectorYear from '../features/selectorYear/selectorYear';

export const FilterYears = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { post } = useApiAuth();

  useEffect(() => {
    if (selectedYear !== '') setShowAlert(false);
  }, [selectedYear]);

  const handleButtonClick = async () => {
    setIsLoading(true);
    if (selectedYear !== '' && selectedYear !== 'Todos los años') {
      const year = parseInt(selectedYear);
      const transactionFrom = new Date(year, 0, 1);
      const transactionTo = new Date(year, 11, 31);

      const formattedDateFrom = formatDate(transactionFrom);
      const formattedDateTo = formatDate(transactionTo);

      const requestBody = {
        transactionFrom: formattedDateFrom,
        transactionTo: formattedDateTo,
      };

      const firstResponse = await post(
        `/lala4/transactions/reports`,
        requestBody
      );
      if (typeof firstResponse === 'string') {
        const url = new URL(firstResponse);
        window.open(url.href, '_blank');
      }

      setIsLoading(false);
    } else if (selectedYear === 'Todos los años') {
      const firstResponse = await post(`/lala4/transactions/reports`);
      if (typeof firstResponse === 'string') {
        const url = new URL(firstResponse);
        window.open(url.href, '_blank');
      }
      setIsLoading(false);
    } else {
      setShowAlert(true);
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <Box className={styles.filterYearContainer}>
      <Box className={styles.filterYearSelector} sx={{ minWidth: 120 }}>
        <SelectorYear
          setSelectedYear={setSelectedYear}
          selectedYear={selectedYear}
        />
      </Box>
      <Box className={styles.buttonFilterDate}>
        {!isLoading && (
          <Button
            variant='outlined'
            onClick={() => {
              if (selectedYear !== '') {
                handleButtonClick();
              } else {
                setShowAlert(true);
              }
            }}
            sx={{
              borderColor: '#666',
              color: '#666',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Descargar
            <IconButton size='small' sx={{ ml: 1 }}>
              <DownloadIcon />
            </IconButton>
          </Button>
        )}

        {isLoading && <CircularProgress size={24} sx={{ ml: 2 }} />}
      </Box>
      {showAlert && (
        <Alert variant='standard' severity='warning'>
          Por favor selecciona una fecha.
        </Alert>
      )}
    </Box>
  );
};
