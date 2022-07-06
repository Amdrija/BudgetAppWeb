import { useAuth0 } from '@auth0/auth0-react';
import {
  AspectRatio,
  Box,
  Center,
  Container,
  Flex,
  Spacer,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { TotalAmount } from '../models/GetTotalAmount';
import { getCurrentMonthSerbian } from '../months';
import { GetTotalAmount } from '../repositories/ExpenseRepository';
import theme from '../theme';
import DoughnutChart from './statistics/DoughnutChart';

type DashboardProps = {
  monthlyStats: TotalAmount;
  dailyStats: TotalAmount;
};

function Dashboard({ monthlyStats, dailyStats }: DashboardProps) {
  const today = new Date();

  return (
    <Flex wrap="wrap" gap={6}>
      <Flex
        boxShadow="base"
        p={6}
        justify="center"
        w={{ base: '100%', md: '400px' }}
        wrap="wrap"
        borderRadius={theme.borderRadius}
      >
        <Center w="100%" mb={2}>
          <Text>Месечна потрошња</Text>
        </Center>
        <AspectRatio w="300px" ratio={1}>
          <DoughnutChart byCategory={monthlyStats.byCategory}></DoughnutChart>
        </AspectRatio>
      </Flex>
      <Flex
        bg={theme.secondary}
        wrap="wrap"
        w={{ base: '100%', md: '150px' }}
        gap={6}
      >
        <Stat
          bg={theme.secondary}
          boxShadow="base"
          p={6}
          borderRadius={theme.borderRadius}
        >
          <StatLabel>Месечни трошкови</StatLabel>
          <StatNumber>{monthlyStats.totalAmount}</StatNumber>
          <StatHelpText>{getCurrentMonthSerbian()}</StatHelpText>
        </Stat>
        <Stat
          bg={theme.secondary}
          boxShadow="base"
          p={6}
          borderRadius={theme.borderRadius}
        >
          <StatLabel>Дневни трошкови</StatLabel>
          <StatNumber>{dailyStats.totalAmount}</StatNumber>
          <StatHelpText>{today.toLocaleDateString('sr')}</StatHelpText>
        </Stat>
      </Flex>
    </Flex>
  );
}

export default Dashboard;
