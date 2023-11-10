import { useEffect, useState } from "react";
import { Catalogue, CatalogueItem } from "~/utils/types";
import { useAuth } from "./useAuth";
import { useApi } from "./useApi";

const useSpecialCatalogues = () => {
  const api = useApi();
  const [myCatalogues, setMyCatalogues] = useState<Catalogue[]>([]);

  const getMyCatalogues = async () => {
    const myCataloguesData = await api.get<Catalogue[]>(
      "/catalogues/my-catalogues"
    );

    const filteredCatalogues = myCataloguesData.filter(
      (catalogue) => !catalogue.mainCatalogue
    );
    setMyCatalogues(filteredCatalogues);
  };

  useEffect(() => {
    getMyCatalogues();
  }, []);

  return {
    myCatalogues,
  };
};

export default useSpecialCatalogues;
