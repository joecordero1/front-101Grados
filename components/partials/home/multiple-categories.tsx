import React from 'react';

import CategoryCollection from './category-collection';
import { useCategories } from 'hooks';

const MultipleCategories = () => {
  const { categories: rawCategories } = useCategories({
    take: 10,
    random: true,
  });

  const categories = rawCategories.slice(0, 2);

  return (
    <>
      {categories.map((category) => (
        <CategoryCollection key={category.id} category={category} />
      ))}
    </>
  );
};

export default MultipleCategories;
