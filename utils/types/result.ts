import { DishItem } from './dishItem';
import { Participant } from './participant';
import { TransactionResult } from './transaction';

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
  dishItem: DishItem;
  description: string;
  //this prop is not native to the API but is used to store the parent result
  children: Result[];
  transactionResults: TransactionResult[];
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
