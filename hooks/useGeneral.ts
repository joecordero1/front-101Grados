import { useContext } from 'react';

import { GeneralContext } from 'context';

export function useGeneral() {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error('useGeneral should be used inside GeneralProvider');
  }
  return context;
}
