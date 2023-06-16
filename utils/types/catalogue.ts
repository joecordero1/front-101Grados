import { Position } from "./positions";
import { Program } from "./program";

export interface Catalogue {
  id: number;
  cxp: number;
  name: string;
  coverImage: string;
  coverImage2: string;
  coverImage3: string;
  coverImage4: string;
  isActive: boolean;
  position: Position;
  program: Program;
  color: string;
  dateFrom: string;
  dateTo: string;
  sendAwardsToParticipant: boolean;
  sendAwardsToOffice: boolean;
  hasSpecificMargin: boolean;
  specificMargin: number | null;
  isDeleted: boolean;
  deletedAt: null;
  mainCatalogue: boolean;
}

export interface CreateCatalogueInterface extends Omit<Catalogue, "id"> {}
