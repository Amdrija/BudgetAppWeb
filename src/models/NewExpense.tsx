type NewExpense = {
  name: string;
  categoryId: string;
  amount: number;
  date: Date;
  description: string | null;
};

export default NewExpense;
