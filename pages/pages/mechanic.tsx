import React, { useState, useEffect } from 'react';
import { useProgram } from '~/hooks';
import { CircularProgress, Box } from '@mui/material';

const Mechanic = () => {
  const { program } = useProgram();
  const [isLoading, setIsLoading] = useState(true);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  const getPdfUrl = () => {
    if (program.id === 28) {
      return 'https://storage.googleapis.com/lala4/store/files/PA%CC%81GINAS-MEC-NESFORCE_compressed.pdf';
    } else if (program.id === 39) {
      return 'https://storage.googleapis.com/lala4/store/files/paginas-mec-tspforce_compressed-1743215994153.pdf';
    }
    return null;
  };

  const pdfUrl = getPdfUrl();

  useEffect(() => {
    const fallbackTimeout = setTimeout(() => {
      if (!isIframeLoaded) setIsLoading(false);
    }, 10000);

    return () => clearTimeout(fallbackTimeout);
  }, [isIframeLoaded]);

  return (
    <div
      style={{ height: '100vh', margin: 0, padding: 0, position: 'relative' }}
    >
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.9)',
            zIndex: 10,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {pdfUrl && (
        <object
          data={pdfUrl}
          type='application/pdf'
          width='100%'
          height='100%'
          onLoad={() => {
            setIsLoading(false);
            setIsIframeLoaded(true);
          }}
        >
          <p style={{ textAlign: 'center', padding: '2rem' }}>
            No se pudo cargar el PDF.{' '}
            <a href={pdfUrl} target='_blank' rel='noopener noreferrer'>
              Haz clic aquí para verlo
            </a>
            .
          </p>
        </object>
      )}
    </div>
  );
};

export default Mechanic;
