import {
  Box,
  Container,
  Flex,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import React from 'react';
import { getCurrentMonthSerbian } from '../months';
import theme from '../theme';

function Dashboard() {
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
          <StatNumber>0.00</StatNumber>
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
