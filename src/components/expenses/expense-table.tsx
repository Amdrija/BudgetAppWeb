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
} from '@chakra-ui/react';
import React from 'react';
import { Expense } from '../../models/Expense';

type ExpenseTableProps = {
  expenses: Expense[];
};

function ExpenseTable({ expenses }: ExpenseTableProps) {
  return (
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
            <Tr key={e.id}>
              <Td p={0}>
                <Box
                  display="inline-block"
                  bg={e.category.color}
                  h="1rem"
                  w="1rem"
                  borderRadius="1rem"
                ></Box>
              </Td>
              <Td pl={0}>{e.name}</Td>
              <Td>{e.date.toLocaleDateString('sr')}</Td>
              <Td isNumeric>{e.amount}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ExpenseTable;
