import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  resolveStyleConfig,
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
  deleteExpense,
  editExpense,
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
import MonthPicker from '../components/datepicker/monthpicker';

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
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { getAccessTokenSilently } = useAuth0();

  const firstOfMonth = useMemo(() => {
    const firstOfMonth = new Date(currentMonth);
    firstOfMonth.setDate(1);
    return firstOfMonth;
  }, [currentMonth]);

  const lastOfMonth = useMemo(() => {
    const lastOfMonth = new Date(currentMonth);
    lastOfMonth.setMonth((lastOfMonth.getMonth() + 1) % 12);
    lastOfMonth.setDate(0);
    return lastOfMonth;
  }, [currentMonth]);

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
  }, [expenses, currentMonth]);

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
  }, [currentMonth]);

  const addExpenseModal = async (newExpense: Expense) => {
    try {
      const token = await getAccessTokenSilently();
      const expense = await addExpense(token, newExpense);
      expense.category = newExpense.category;

      if (expense.date.getMonth() == currentMonth.getMonth()) {
        setExpenses(
          [...expenses, expense].sort(
            (a, b) => b.date.getTime() - a.date.getTime()
          )
        );
      }
    } catch (e) {}
  };

  const editExpenseModal = async (newExpense: Expense) => {
    try {
      const token = await getAccessTokenSilently();
      const expense = await editExpense(token, newExpense);
      expense.category = newExpense.category;

      if (expense.date.getMonth() == currentMonth.getMonth()) {
        setExpenses(
          expenses
            .map((e) => (e.id != expense.id ? e : expense))
            .sort((a, b) => b.date.getTime() - a.date.getTime())
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteExpenseModal = async (newExpense: Expense) => {
    try {
      console.log(newExpense);
      const token = await getAccessTokenSilently();
      await deleteExpense(token, newExpense);

      setExpenses(expenses.filter((e) => e.id != newExpense.id));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Dashboard
        monthlyStats={monthlyStats}
        dailyStats={dailyStats}
        month={currentMonth}
      ></Dashboard>
      <Box mt={6}>
        <Flex align="baseline" wrap="wrap" mb={6}>
          <Heading mr={3} flex-grow={0}>
            Листа трошкова за{' '}
          </Heading>
          <Box display="inline-block" w="165px" flex-grow={0} mt={3}>
            <MonthPicker
              onChange={(date: Date) => setCurrentMonth(date)}
              selectedDate={currentMonth}
              name="date"
            ></MonthPicker>
          </Box>
        </Flex>
        <Box mb={6}>
          <AddExpenseModal handleSubmit={addExpenseModal}></AddExpenseModal>
        </Box>
        <ExpenseTable
          expenses={expenses}
          onEditExpense={editExpenseModal}
          onDeleteExpense={deleteExpenseModal}
        ></ExpenseTable>
      </Box>
    </div>
  );
}

export default Home;
