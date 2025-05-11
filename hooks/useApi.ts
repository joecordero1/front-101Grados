import { useContext } from 'react';

import { ApiContext } from 'context';

export function useApi() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi should be used inside ApiProvider');
  }
  return context;
}
