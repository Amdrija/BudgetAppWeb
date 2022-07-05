import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import Dashboard from '../components/dashboard';
import { useAuth0 } from '@auth0/auth0-react';
import { GetExpenses, GetTotalAmount } from '../repositories/ExpenseRepository';
import { AmountByCategory, TotalAmount } from '../models/GetTotalAmount';
import ExpenseTable from '../components/expenses/expense-table';
import { getCurrentMonthSerbian } from '../months';
import { Expense } from '../models/Expense';

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

      try {
        const token = await getAccessTokenSilently();
        const totalAmountResponse = await GetTotalAmount(token, today, today);

        setDailyStats(totalAmountResponse);
      } catch (e) {
        //console.log(e);
      }
    })();
  }, []);

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

  return (
    <div>
      <Dashboard
        monthlyStats={monthlyStats}
        dailyStats={dailyStats}
      ></Dashboard>
      <Box mt={6}>
        <Heading mb={6}>Листа трошкова за {getCurrentMonthSerbian()}</Heading>
        <ExpenseTable expenses={expenses}></ExpenseTable>
      </Box>
    </div>
  );
}

export default Home;
