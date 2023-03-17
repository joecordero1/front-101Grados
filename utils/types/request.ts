export enum RequestTypes {
  PARTICIPANT = 'PARTICIPANT',
  PERSONAL_SHOPPER = 'PERSONAL_SHOPPER',
}

export enum StatusTypes {
  REQUESTED = 'REQUESTED',
  APPROVED = 'APPROVED',
  ORDERRED = 'ORDERRED',
  NEWS = 'NEWS',
  DELIVERED = 'DELIVERED',
  CELLAR = 'CELLAR',
  DISPATCHED = 'DISPATCHED',
  SPECIALS = 'SPECIALS',
  CANCELED = 'CANCELED',
}

export interface CreateRequestDto {
  type: RequestTypes;
  points: number;
  participantId: number;
  awardId: number;
  variantId?: number;
  addressId: number;
}
