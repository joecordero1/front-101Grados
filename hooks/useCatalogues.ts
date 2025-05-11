import { useEffect, useState } from 'react';
import { Catalogue, CatalogueItem } from '~/utils/types';
import { useAuth } from './useAuth';
import { useApi } from './useApi';

export const useCatalogues = () => {
  const { isLoggedIn } = useAuth();
  const api = useApi();
  const [myCatalogues, setMyCatalogues] = useState<Catalogue[]>([]);

  const getMyCatalogues = async () => {
    const myCataloguesData = await api.get<Catalogue[]>(
      '/lala4/catalogues/my-catalogues'
    );

    setMyCatalogues(myCataloguesData);
  };

  useEffect(() => {
    getMyCatalogues();
  }, []);

  return {
    myCatalogues,
  };
};
