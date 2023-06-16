import React from "react";
import useSpecialCatalogues from "~/hooks/useCatalogues";
import SpecialCollection from "./SpecialCollection";

const SpecialCatalogues = () => {
  const { myCatalogues } = useSpecialCatalogues();

  return (
    <>
      {myCatalogues.length > 0 &&
        myCatalogues.map((catalogue) => (
          <SpecialCollection catalogue={catalogue} />
        ))}
    </>
  );
};

export default SpecialCatalogues;
