import { useContext } from 'react';

import { AuthContext } from 'context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error(`useAuth must be inside a ParticipantContext provider.`);

  return context;
};
