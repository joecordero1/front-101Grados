import { useContext } from 'react';

import { ApiAuthContext } from 'context/ApiAuthContext';

export function useApiAuth() {
  const context = useContext(ApiAuthContext);

  if (!context)
    throw new Error('useApiAuth should be used inside ApiAuthProvider');

  return context;
}
