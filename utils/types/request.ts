import { Address } from "./address";
import { Award, AwardVariant } from "./award";
import { Participant } from "./participant";

export enum RequestTypes {
  PARTICIPANT = "PARTICIPANT",
  PERSONAL_SHOPPER = "PERSONAL_SHOPPER",
}

export enum StatusTypes {
  REQUESTED = "REQUESTED",
  APPROVED = "APPROVED",
  ORDERRED = "ORDERRED",
  NEWS = "NEWS",
  DELIVERED = "DELIVERED",
  WAREHOUSE = "WAREHOUSE",
  DISPATCHED = "DISPATCHED",
  SPECIALS = "SPECIALS",
  CANCELED = "CANCELED",
}

export interface CreateRequestDto {
  type: RequestTypes;
  points: number;
  participantId: number;
  awardId: number;
  variantId?: number;
  addressId: number;
}

export interface Request {
  id: number;
  code: string;
  quantity: number;
  type: string;
  currentCost: number;
  usedCost: number;
  margin: number;
  points: number;
  status: string;
  requestedAt: string;
  approvedAt: null;
  downloadedAt: null;
  orderedAt: null;
  newsAt: null;
  deliveredAt: null;
  deliveredComment: null;
  cellarAt: null;
  dispatchedAt: null;
  dispatchedComment: null;
  specialsAt: null;
  specialsComment: null;
  canceledAt: null;
  cancelationReason: null;
  shippingGuide: null;
  shippingGuideAttachment: null;
  isDeleted: boolean;
  deletedAt: null;
  award: Award;
  variant: null;
  address: Address;
}
