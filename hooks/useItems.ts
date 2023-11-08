import { useState, useEffect, useCallback } from "react";
import queryString from "query-string";
import { useRouter } from "next/router";

import { CatalogueItem, Page, PaginationMetaDto } from "utils/types";

import { useApiAuth } from "./useApiAuth";

type MetaProps = {
  take?: number;
  page?: number;
  order?: "ASC" | "DESC";
};
type FilterOptions = {
  brandId?: number;
  random?: boolean;
  categoriesIds?: number[] | string[];
  justOnSale?: boolean;
  lastDigits?: string;
  toSearch?: string;
  orderPoints?: string;
  buyable?: boolean;
  catalogueId?: number;
};

/* type FilterOptions = {
  random?: boolean;
  toSearch?: string;
  justExtras?: boolean;
  categoriesIds?: number[] | string[];
  subcategoriesIds?: number[] | string[];
  minPrice?: number;
  maxPrice?: number;
  catalogueSlug?: string;
}; */

type UseItemsProps = {
  metaProps?: MetaProps;
  filterOptions?: FilterOptions;
};

export const useItems = ({ metaProps, filterOptions = {} }: UseItemsProps) => {
  const { take = 100, page = 1 } = metaProps || {};
  const { random = false } = filterOptions;
  const api = useApiAuth();

  const [products, setProducts] = useState<CatalogueItem[]>([]);
  const [meta, setMeta] = useState<PaginationMetaDto>({
    page,
    take,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });
  const [localFilterOptions, setLocalFilterOptions] = useState<FilterOptions>({
    random,
    ...filterOptions,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isInitialised, setIsInitialised] = useState(false);
  const router = useRouter();
  const query = router.query;

  const getProducts = async () => {
    try {
      setLoading(true);
      const params = {
        // order: 'DESC',
        random,
        order: metaProps?.order || "ASC",
        take: meta.take.toString(),
        page: meta.page.toString(),
        // Add just the filter options that are not null or undefined or empty string
        ...(Object.keys(localFilterOptions).reduce((acc, key) => {
          if (localFilterOptions[key]) {
            acc[key] = localFilterOptions[key];
          }
          return acc;
        }, {}) as FilterOptions),
      };

      const query = queryString.stringify(params);
      const response = await api.get<Page<CatalogueItem>>(
        "/catalogue-items/store?" + query
      );

      setProducts(response.data);
      setMeta(response.meta);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterOptionsChange = useCallback(
    (newFilterOptions: FilterOptions, replace = false) => {
      setLocalFilterOptions(
        replace ? newFilterOptions : { ...filterOptions, ...newFilterOptions }
      );
      setIsInitialised(true);
    },
    []
  );

  const handleMetaChange = useCallback(
    (newMeta: MetaProps) => {
      setMeta({ ...meta, ...newMeta });
    },
    [meta]
  );

  useEffect(() => {
    handleFilterOptionsChange({
      categoriesIds: query.category ? [query.category as any] : null,
      /*  subcategoriesIds: query.subcategory ? [query.subcategory as any] : null, */
      /* minPrice: query.min_price ? parseFloat(query.min_price as any) : null,
      maxPrice: query.max_price ? parseFloat(query.max_price as any) : null,
      catalogueSlug: query.catalogue ? (query.catalogue as any) : null, */
      brandId: query.brand ? (query.brand as any) : null,
      random: query.random ? true : null,
      buyable: query.buyable ? true : null,
      justOnSale: query.on_sale ? true : null,
      lastDigits: query.last_digits ? (query.last_digits as any) : null,
      catalogueId: query.catalogue ? (query.catalogue as any) : null,
      toSearch: query.search ? (query.search as any) : null,
      orderPoints: query.orderPoints ? (query.orderPoints as any) : null,
    });
  }, [query]);

  function areArraysEqual(arr1 = [], arr2 = []) {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((element, index) => element === arr2[index]);
  }
  useEffect(() => {
    if (!isInitialised) return;
    getProducts();
  }, [isInitialised, meta.take, meta.page, JSON.stringify(localFilterOptions)]);

  return {
    items: products,
    loading,
    error,
    meta,
    showingFrom: meta.itemCount > 0 ? (meta.page - 1) * meta.take + 1 : 0,
    showingTo:
      meta.itemCount > 0 ? Math.min(meta.page * meta.take, meta.itemCount) : 0,
    setMeta,
    handleFiltersChange: handleFilterOptionsChange,
    localFilterOptions,
    handlePageChange: handleMetaChange,
  };
};
