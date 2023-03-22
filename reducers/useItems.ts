import { useReducer, useEffect, useCallback } from "react";
import queryString from "query-string";

import { useApiAuth } from "hooks/useApiAuth";
import { SubcategoriesList } from "../utils/types/award";
import {
  CatalogueItem,
  Page,
  Category,
  PaginationMetaDto,
  Brand,
} from "~/utils/types";
import { useRouter } from "next/router";

type Loading = {
  type: "loading";
};

type GetItems = {
  type: "GET_VEHICLES";
  payload: {
    items: CatalogueItem[];
    meta: PaginationMetaDto;
  };
};

type UpdateMetaPageOptions = {
  type: "UPDATE_META_PAGE_OPTIONS";
  payload: {
    meta: PaginationMetaDto;
  };
};

type HandleFiltersChange = {
  type: "HANDLE_FILTERS_CHANGE";
  payload: {
    field: string;
    value: any;
  };
};

type GetBrands = {
  type: "GET_BRANDS";
  payload: {
    brands: Brand[];
  };
};

type GetCategories = {
  type: "GET_CATEGORIES";
  payload: {
    categories: Category[];
  };
};

type CleanFilters = {
  type: "CLEAN_FILTERS";
};

type Actions =
  | Loading
  | GetItems
  | UpdateMetaPageOptions
  | HandleFiltersChange
  | GetBrands
  | GetCategories
  | CleanFilters;

type FilterOptions = {
  brandId: number;
  categoriesIds: number[];
  justOnSale: boolean;
  lastDigits: string;
};

export type FilterOptionsToString =
  | "brandId"
  | "categoriesIds"
  | "justOnSale"
  | "lastDigits";

type State = {
  loading: boolean;
  items: CatalogueItem[];
  meta: PaginationMetaDto;
  filterOptions: FilterOptions;
  categories: Category[];
  brands: Brand[];
};

const initialState: State = {
  loading: true,
  items: [],
  meta: {
    page: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    itemCount: 0,
    pageCount: 0,
    take: 50,
  },
  filterOptions: {
    brandId: null,
    categoriesIds: null,
    justOnSale: false,
    lastDigits: null,
  },
  categories: [],
  brands: [],
};

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        loading: true,
      };
    case "GET_VEHICLES":
      return {
        ...state,
        loading: false,
        items: action.payload.items,
        meta: action.payload.meta,
      };
    case "UPDATE_META_PAGE_OPTIONS": {
      const { meta } = action.payload;
      return {
        ...state,
        meta,
      };
    }
    case "HANDLE_FILTERS_CHANGE": {
      const { field, value } = action.payload;
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          [field]: value,
        },
      };
    }
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload.categories,
      };
    case "GET_BRANDS":
      return {
        ...state,
        brands: action.payload.brands,
      };
    case "CLEAN_FILTERS":
      return {
        ...state,
        filterOptions: {
          brandId: null,
          categoriesIds: null,
          justOnSale: false,
          lastDigits: null,
        },
      };
    default:
      return state;
  }
};

export interface ReducerValue extends State {
  handlePageChange: (page: number) => void;
  handleFiltersChange: (field: FilterOptionsToString, value: any) => void;
  cleanFilters: () => void;
}

export const useItems = (): ReducerValue => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { get } = useApiAuth();
  const router = useRouter();
  const query = router.query;

  const getItems = useCallback(async () => {
    try {
      dispatch({ type: "loading" });

      const params = {
        order: "DESC",
        take: state.meta.take.toString(),
        page: state.meta.page.toString(),
        // Add just the filter options that are not null or undefined or empty string
        ...(Object.keys(state.filterOptions).reduce((acc, key) => {
          if (state.filterOptions[key]) {
            acc[key] = state.filterOptions[key];
          }
          return acc;
        }, {}) as FilterOptions),
      };

      const query = queryString.stringify(params);

      const response = await get<Page<CatalogueItem>>(
        "/catalogue-items/store?" + query
      );

      const items = response.data;
      const meta = response.meta;
      dispatch({
        type: "GET_VEHICLES",
        payload: {
          items,
          meta,
        },
      });
    } catch (error) {
      console.error("  getItems() -> error", error);
    }
  }, [state.meta.page, state.filterOptions]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= state.meta.pageCount) {
      dispatch({
        type: "UPDATE_META_PAGE_OPTIONS",
        payload: {
          meta: {
            ...state.meta,
            page,
          },
        },
      });
    }
  };

  const handleFiltersChange = (field: FilterOptionsToString, value: any) => {
    dispatch({
      type: "HANDLE_FILTERS_CHANGE",
      payload: {
        field,
        value,
      },
    });
  };

  const getCategories = useCallback(async () => {
    try {
      const data = await get<SubcategoriesList[]>(
        "/catalogue-items/categories"
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

      dispatch({ type: "GET_CATEGORIES", payload: { categories } });
    } catch (error) {
      console.error("getCategories() -> error", error);
    }
  }, []);

  const getBrands = useCallback(async () => {
    try {
      const response = await get<Brand[]>("/brands/list");
      dispatch({ type: "GET_BRANDS", payload: { brands: response } });
    } catch (error) {
      console.error("getBrands() -> error", error);
    }
  }, []);

  const cleanFilters = () => {
    dispatch({ type: "CLEAN_FILTERS" });
  };

  const localHandleFiltersChange = () => {
    if (Object.keys(query).length > 0) {
      // if (query.brand) handleFiltersChange('brandId', query.brand);
      if (query.category)
        handleFiltersChange("categoriesIds", [query.category]);

      if (query.page && !isNaN(parseInt(query.page.toString()))) {
        handlePageChange(parseInt(query.page.toString()) || state.meta.page);
      } else {
        console.log("No entró localHandleFiltersChange useItems Hook");
      }
      // if (query.justOnSale) handleFiltersChange('justOnSale', query.justOnSale);
    } else {
      cleanFilters();
    }
  };

  useEffect(() => {
    getCategories();
    getBrands();
  }, []);

  useEffect(() => {
    getItems();
  }, [getItems, state.meta.page, state.filterOptions]);

  useEffect(() => {
    localHandleFiltersChange();
  }, [query]);

  return {
    ...state,
    handlePageChange,
    handleFiltersChange,
    cleanFilters,
  };
};
