import React from 'react';

import SpecialCollection from './SpecialCollection';
import { useSpecialCatalogues } from 'hooks';

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
