import { useAuth0 } from '@auth0/auth0-react';
import {
  Box,
  Container,
  Flex,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { TotalAmount } from '../models/GetTotalAmount';
import { getCurrentMonthSerbian } from '../months';
import { GetTotalAmount } from '../repositories/ExpenseRepository';
import theme from '../theme';

function Dashboard() {
  const [total, setTotal] = useState(0);

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

        setTotal(
          await (
            await GetTotalAmount(token, firstOfMonth, lastOfMonth)
          ).totalAmount
        );
      } catch (e) {
        console.log(e);
      }
    })();
  });

  return (
    <Flex wrap="wrap" gap={6}>
      <Box
        bg={theme.secondary}
        boxShadow="base"
        flex={1}
        flexBasis="300px"
        p={6}
      >
        <Stat bg={theme.secondary}>
          <StatLabel>Укупни трошкови</StatLabel>
          <StatNumber>{total}</StatNumber>
          <StatHelpText>{getCurrentMonthSerbian()}</StatHelpText>
        </Stat>
      </Box>
      <Box
        boxShadow="base"
        bg={theme.primary}
        flex={1}
        flexBasis="300px"
        h="150px"
      ></Box>
    </Flex>
  );
}

export default Dashboard;
