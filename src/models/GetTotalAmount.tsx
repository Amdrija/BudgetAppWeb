import { Category } from './Category';

export type TotalAmount = {
  totalAmount: number;
  byCategory: Array<AmountByCategory>;
};

export type AmountByCategory = {
  amount: number;
  category: Category;
};
