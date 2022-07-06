import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Heading,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useDisclosure,
} from '@chakra-ui/react';
import Dashboard from '../components/dashboard';
import { useAuth0 } from '@auth0/auth0-react';
import {
  addExpense,
  GetExpenses,
  GetTotalAmount,
} from '../repositories/ExpenseRepository';
import { AmountByCategory, TotalAmount } from '../models/GetTotalAmount';
import ExpenseTable from '../components/expenses/expense-table';
import { getCurrentMonthSerbian } from '../months';
import { Expense } from '../models/Expense';
import theme from '../theme';
import ExpenseModal from '../components/expenses/expense-modal';
import AddExpenseModal from '../components/expenses/add-expense-modal';

function Home() {
  const [monthlyStats, setMonthlyStats] = useState({
    totalAmount: 0,
    byCategory: [],
  } as TotalAmount);
  const [dailyStats, setDailyStats] = useState({
    totalAmount: 0,
    byCategory: [],
  } as TotalAmount);
  const [expenses, setExpenses] = useState([] as Expense[]);

  const { getAccessTokenSilently } = useAuth0();

  const firstOfMonth = new Date();
  firstOfMonth.setDate(1);
  const lastOfMonth = new Date();
  lastOfMonth.setMonth((lastOfMonth.getMonth() + 1) % 12);
  lastOfMonth.setDate(0);

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        const totalAmountResponse = await GetTotalAmount(
          token,
          firstOfMonth,
          lastOfMonth
        );

        setMonthlyStats(totalAmountResponse);
      } catch (e) {
        //console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      try {
        const token = await getAccessTokenSilently();
        const totalAmountResponse = await GetTotalAmount(
          token,
          today,
          tomorrow
        );

        setDailyStats(totalAmountResponse);
      } catch (e) {
        //console.log(e);
      }
    })();
  }, [expenses]);

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        const expenses = await GetExpenses(
          token,
          firstOfMonth,
          lastOfMonth,
          null,
          null,
          null
        );

        setExpenses(expenses);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const addExpenseModal = async (newExpense: Expense) => {
    try {
      const token = await getAccessTokenSilently();
      const expense = await addExpense(token, newExpense);
      expense.category = newExpense.category;

      console.log(expense);
      setExpenses([...expenses, expense]);
    } catch (e) {}
  };

  return (
    <div>
      <Dashboard
        monthlyStats={monthlyStats}
        dailyStats={dailyStats}
      ></Dashboard>
      <Box mt={6}>
        <Heading mb={6}>Листа трошкова за {getCurrentMonthSerbian()}</Heading>
        <ExpenseTable expenses={expenses}></ExpenseTable>
        <AddExpenseModal handleSubmit={addExpenseModal}></AddExpenseModal>
      </Box>
    </div>
  );
}

export default Home;
