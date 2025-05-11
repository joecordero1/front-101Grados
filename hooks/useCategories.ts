import { useState, useEffect } from 'react';

import { useApiAuth } from 'hooks';
import { Category, SubcategoriesList } from '../utils/types/award';

export const useCategories = ({
  random = false,
  take = 10,
}: {
  random?: boolean;
  take: number;
}) => {
  const { get } = useApiAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    try {
      setLoading(true);
      const data = await get<SubcategoriesList[]>(
        '/lala4/catalogue-items/categories'
      );

      // Extract the categories from the categories with no repeated categories
      const categories = data.reduce((acc, subcategory) => {
        const category = subcategory.category_id;
        if (!acc.find((item) => item.id === category)) {
          acc.push({
            id: category,
            name: subcategory.category_name,
            icon: subcategory.category_icon,
            image: subcategory.category_image,
          });
        }
        return acc;
      }, [] as Category[]);

      if (random) categories.sort(() => Math.random() - 0.5);
      if (take) categories.splice(take);

      // const randomizedCategories = categories.sort(() => Math.random() - 0.5);

      // setCategories(randomizedCategories.slice(0, 10));
      setCategories(categories);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return {
    categories,
    loading,
  };
};
