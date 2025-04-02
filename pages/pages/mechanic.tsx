'use client';

import React from 'react';
import { useProgram } from '~/hooks';
import { Box, Button, Paper } from '@mui/material';

const Mechanic = () => {
  const { program } = useProgram();

  let pdfUrl = '';
  if (program.id === 28) {
    pdfUrl =
      'https://storage.googleapis.com/lala4/store/files/PA%CC%81GINAS-MEC-NESFORCE_compressed.pdf';
  } else if (program.id === 39) {
    pdfUrl =
      'https://storage.googleapis.com/lala4/store/files/paginas-mec-tspforce_compressed-1743215994153.pdf';
  }

  if (!pdfUrl) return null;

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      minHeight='100vh'
      px={2}
      py={4}
      bgcolor='#f5f5f5'
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 900,
          border: '1px solid #ccc',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <iframe
          src={pdfUrl}
          style={{ width: '100%', height: '85vh', border: 'none' }}
        />
      </Paper>

      <Button
        variant='contained'
        color='primary'
        sx={{ mt: 3, fontSize: 14 }}
        href={pdfUrl}
        target='_blank'
        rel='noopener noreferrer'
      >
        Descargar PDF
      </Button>
    </Box>
  );
};

export default Mechanic;
