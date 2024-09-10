import { useEffect, useState } from "react";

import { useApiAuth } from "./useApiAuth";
import { DishItem, IngredientCodes } from "~/utils/types";

const codesToGetResults = ["IN_RESUL_06", "IN_RESUL_08", "IN_RESUL_01"];

export const useDishsItems = () => {
  const [items, setItems] = useState<DishItem[]>([]);
  const [availableCodes, setAvailableCodes] = useState<IngredientCodes[]>([]);
  const api = useApiAuth();

  const getMyDishsItems = async () => {
    const myDishsItemsData = await api.get<DishItem[]>(
      "/dishs-items/my-dishs-items"
    );

    setItems(myDishsItemsData);
  };

  useEffect(() => {
    function parseDishItemsToCodes() {
      const codes = items.map((item) => item.ingredient.code);
      setAvailableCodes(codes);
    }
    parseDishItemsToCodes();
  }, [items]);

  return {
    items,
    getMyDishsItems,
    availableCodes,
    couldSeeResults: availableCodes.some((code) =>
      codesToGetResults.includes(code)
    ),
  };
};
export default useDishsItems;
