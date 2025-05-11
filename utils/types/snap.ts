export interface Snap {
  id: number;
  imageUrl: string;
  identifier: string | null;
  date: string | null;
  status: SnapStatus;
  haveAlreadyEarnedPoints: boolean;
  uploadComment: string | null;
  comment: string | null;
  isDeleted: boolean;
  createdAt: string;
  deletedAt: string | null;
  snapsItems: SnapsItem[];
}
export enum SnapStatus {
  PENDING = "PENDING",
  VALID = "VALID",
  INVALID = "INVALID",
}

export interface SnapsItem {
  id: number;
  quantity: number;
  haveAlreadyEarnedPoints: boolean;
  isDeleted: boolean;
  deletedAt: null;
  sku: Sku;
}

export interface Sku {
  id: number;
  name: string;
  code: string;
  level: number;
  isActive: boolean;
  points: number;
  isDeleted: boolean;
  deletedAt: null;
}
