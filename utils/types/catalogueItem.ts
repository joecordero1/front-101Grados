import { Award, AwardVariant } from './award';

export interface CatalogueItem {
  id: number;
  points: number;
  send_awards_to_participant: boolean;
  award: Award;
}

export interface CartItem extends CatalogueItem {
  quantity?: number;
  variant?: AwardVariant;
}
