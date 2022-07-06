import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Tag,
  Box,
  Center,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import exp from 'constants';
import React, { useState } from 'react';
import { defaultExpense, Expense } from '../../models/Expense';
import theme from '../../theme';
import ExpenseModal from './expense-modal';
import ExpenseTableRow from './expense-table-row';

type ExpenseTableProps = {
  expenses: Expense[];
  onEditExpense: (expense: Expense) => Promise<void>;
  onDeleteExpense: (expense: Expense) => Promise<void>;
};

function ExpenseTable({
  expenses,
  onEditExpense,
  onDeleteExpense,
}: ExpenseTableProps) {
  return (
    <div>
      <TableContainer>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th w="1rem"></Th>
              <Th ml={0} pl={0}>
                Име
              </Th>
              <Th>Датум</Th>
              <Th isNumeric>Вредност</Th>
            </Tr>
          </Thead>
          <Tbody>
            {expenses.map((e) => (
              <ExpenseTableRow
                key={e.id}
                expense={e}
                onEditExpense={onEditExpense}
                onDeleteExpense={onDeleteExpense}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ExpenseTable;
