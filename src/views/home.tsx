import React, { useEffect, useState } from 'react';
import { Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react';
import Dashboard from '../components/dashboard';
import { useAuth0 } from '@auth0/auth0-react';
import { GetTotalAmount } from '../repositories/ExpenseRepository';
import { AmountByCategory, TotalAmount } from '../models/GetTotalAmount';

function Home() {
  const [monthlyStats, setMonthlyStats] = useState({
    totalAmount: 0,
    byCategory: [],
  } as TotalAmount);
  const [dailyStats, setDailyStats] = useState({
    totalAmount: 0,
    byCategory: [],
  } as TotalAmount);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      const firstOfMonth = new Date();
      firstOfMonth.setDate(1);
      const lastOfMonth = new Date();
      lastOfMonth.setMonth((lastOfMonth.getMonth() + 1) % 12);
      lastOfMonth.setDate(0);

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

  return (
    <Dashboard monthlyStats={monthlyStats} dailyStats={dailyStats}></Dashboard>
  );
}

export default Home;
