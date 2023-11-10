import { useState, useEffect, useCallback } from "react";
import queryString from "query-string";
import { useRouter } from "next/router";

import { CatalogueItem, Page, PaginationMetaDto } from "utils/types";

import { useApiAuth } from "./useApiAuth";

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

type UseItemsProps = {
  metaProps?: PaginationMetaDto;
  filterOptions?: FilterOptions;
  useQueryParams?: boolean;
};

export const useItems = ({
  metaProps,
  filterOptions = {},
  useQueryParams = false,
}: UseItemsProps) => {
  const { random = false } = filterOptions;
  const api = useApiAuth();
  const [products, setProducts] = useState<CatalogueItem[]>([]);
  const [meta, setMeta] = useState<PaginationMetaDto>({
    page: metaProps?.page || 1,
    take: metaProps?.take || 10,
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
        order: metaProps?.order || "ASC",
        take: meta.take.toString(),
        page: meta.page.toString(),
        // Add just the filter options that are not null or undefined or empty string
        ...(Object.keys(filterOptions).reduce((acc, key) => {
          if (filterOptions[key]) {
            acc[key] = filterOptions[key];
          }
          return acc;
        }, {}) as FilterOptions),
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
    (newMeta: PaginationMetaDto, replace = false) => {
      replace ? setMeta(newMeta) : setMeta({ ...meta, ...newMeta });
    },
    [meta]
  );

  useEffect(() => {
    handleFilterOptionsChange({
      categoriesIds: query.category ? [query.category as any] : null,
      brandId: query.brand ? (query.brand as any) : null,
      random: query.random ? true : null,
      buyable: query.buyable ? true : null,
      justOnSale: query.on_sale ? true : null,
      lastDigits: query.last_digits ? (query.last_digits as any) : null,
      catalogueId: query.catalogue ? (query.catalogue as any) : null,
      toSearch: query.search ? (query.search as any) : null,
      orderPoints: query.orderPoints ? (query.orderPoints as any) : null,
    });
    if (useQueryParams && isInitialised) {
      handleMetaChange({
        page: query.page ? parseInt(query.page as any) : metaProps.page,
        take: query.take ? parseInt(query.take as any) : metaProps.take,
      });
    }
  }, [query]);

  /*   // initialize query based on meta
  useEffect(() => {
    if (useQueryParams) {
      setIsInitialised(false);
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          page: meta.page,
          take: meta.take,
        },
      });
      setIsInitialised(true);
    }
  }, []); */

  useEffect(() => {
    if (!isInitialised) return;
    getProducts();
  }, [isInitialised, meta.take, meta.page, localFilterOptions]);

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
