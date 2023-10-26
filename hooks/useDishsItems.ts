import { useState } from "react";
import { useApiAuth } from "./useApiAuth";
import { DishItem } from "~/utils/types";

const useDishsItems = () => {
  const [items, setItems] = useState<DishItem[]>([]);
  const api = useApiAuth();

  const getMyDishsItems = async () => {
    const myDishsItemsData = await api.get<DishItem[]>(
      "/dishs-items/my-dishs-items"
    );

    setItems(myDishsItemsData);
  };

  return {
    items,
    getMyDishsItems,
  };
};
export default useDishsItems;
