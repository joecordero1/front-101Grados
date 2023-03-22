import { CatalogueItem } from "~/utils/types";
import { useApiAuth } from "hooks/useApiAuth";
import { useEffect, useState } from "react";
export const useItem = (itemId: any) => {
  const api = useApiAuth();
  const [item, setItem] = useState<CatalogueItem>();

  const [loading, setLoading] = useState<boolean>(false);

  const getItem = async () => {
    try {
      setLoading(true);
      const catalogueItem = await api.get<CatalogueItem>(
        `catalogue-items/store/award/${itemId}`
      );
      setItem(catalogueItem);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getItem();
  }, [itemId]);
  return {
    item,
    loading,
    setLoading,
  };
};
