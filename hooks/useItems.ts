import { useState, useEffect } from "react";
import queryString from "query-string";

import { useApiAuth } from "hooks/useApiAuth";
import { CatalogueItem } from "../utils/types/catalogueItem";
import { Page, PaginationMetaDto } from "../utils/types/common";

type MetaProps = {
  take?: number;
  page?: number;
};

type FilterOptions = {
  random?: boolean;
  orderPoints?: "ASC" | "DESC";
  categoriesIds?: number[];
  buyable?: boolean;
  toSearch?: string;
};

type UseItemsProps = {
  metaProps?: MetaProps;
  filterOptions?: FilterOptions;
};

export function useItems({ metaProps, filterOptions = {} }: UseItemsProps) {
  const { take = 10, page = 1 } = metaProps || {};

  const [items, setItems] = useState<CatalogueItem[]>([]);
  const [meta, setMeta] = useState<PaginationMetaDto>({
    page,
    take,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { get } = useApiAuth();

  const getItems = async () => {
    try {
      setLoading(true);
      const params = {
        order: "DESC",
        take: meta.take.toString(),
        page: meta.page.toString(),
        // Add just the filter options that are not null or undefined or empty string
        ...(Object.keys(filterOptions).reduce((acc, key) => {
          if (filterOptions[key]) {
            acc[key] = filterOptions[key];
          }
          return acc;
        }, {}) as FilterOptions),
      };

      const query = queryString.stringify(params);

      const response = await get<Page<CatalogueItem>>(
        "/catalogue-items/store?" + query
      );
      setItems(response.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return {
    items,
    loading,
  };
}
