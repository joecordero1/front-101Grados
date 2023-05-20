export interface AccountStatus {
  incomePoints: EPoint[];
  expensePoints: EPoint[];
}

export interface EPoint {
  month: number;
  year: number;
  points: string;
}
