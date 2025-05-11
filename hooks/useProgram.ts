import { useContext } from 'react';

import { ProgramContext } from 'context/ProgramContext';

export const useProgram = () => {
  const context = useContext(ProgramContext);

  if (!context)
    throw new Error(`usePrograms must be inside a ProgramContext provider.`);

  return context;
};
