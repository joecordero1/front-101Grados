import { Participant } from "./participant";

export interface Result {
  id: number;
  month: number;
  year: number;
  nameValue1: string;
  value1: number;
  nameValue2: string;
  value2: number;
  result: number;
  isAMonthlyResult: boolean;
  participant: Participant;
  periodResult: PeriodResult;
  parent: Result;
}

export interface PeriodResult {
  id: number;
  name: string;
  description: string;
  months: PeriodResultMonths[];
}

export interface PeriodResultMonths {
  id: number;
  month: number;
  year: number;
}
