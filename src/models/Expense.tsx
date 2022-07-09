import { Category, defaultCategory } from './Category';

export type Expense = {
  id: string;
  name: string;
  category: Category;
  categoryId: string;
  amount: number;
  date: Date;
  description: string | null;
};

export const defaultExpense: Expense = {
  id: '00000000-0000-0000-0000-000000000000',
  name: 'Име трошка',
  category: defaultCategory,
  categoryId: '00000000-0000-0000-0000-000000000000',
  amount: 0,
  date: new Date(),
  description: null,
};
