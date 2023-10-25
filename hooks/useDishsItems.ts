import { useEffect, useState } from "react";
import { useApiAuth } from "./useApiAuth";
import { useAuth } from "./useAuth";

const useDishsItems = () => {
  const [items, setItems] = useState<any>([]);
  const api = useApiAuth();
  const { isLoggedIn } = useAuth();
  const getMyCatalogues = async () => {
    const myDishsItemsData = await api.get("/dishs-items/my-dishs-items");
    console.log(myDishsItemsData);
    setItems(myDishsItemsData);
  };

  useEffect(() => {
    getMyCatalogues();
  }, [isLoggedIn]);

  return {
    items,
    getMyCatalogues,
  };
};
export default useDishsItems;
