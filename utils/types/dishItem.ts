import { Ingredient } from "./ingredient";

export interface DishItem {
  id: number;
  order: number;
  isDeleted: boolean;
  deletedAt: null;
  ingredient: Ingredient;
}
