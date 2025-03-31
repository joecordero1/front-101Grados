import React from 'react';
import { useProgram } from '~/hooks';

const Mechanic = () => {
  const { program } = useProgram();

  return (
    <div style={{ height: '100vh', margin: 0, padding: 0 }}>
      {program.id === 28 ? (
        <iframe
          src='https://storage.googleapis.com/lala4/store/files/PA%CC%81GINAS-MEC-NESFORCE_compressed.pdf'
          style={{
            width: '100%',
            height: '90vh',
            border: 'none',
          }}
        />
      ) : program.id === 39 ? (
        <iframe
          src='https://storage.googleapis.com/lala4/store/files/paginas-mec-tspforce_compressed-1743215994153.pdf'
          style={{
            width: '100%',
            height: '90vh',
            border: 'none',
          }}
        />
      ) : null}
    </div>
  );
};

export default Mechanic;
