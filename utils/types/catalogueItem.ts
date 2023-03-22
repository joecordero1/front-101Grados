import { Award, AwardVariant } from "./award";

export interface CatalogueItem {
  id: number;
  points: number;
  award: Award;
}

export interface CartItem extends CatalogueItem {
  quantity?: number;
  variant?: AwardVariant;
}
