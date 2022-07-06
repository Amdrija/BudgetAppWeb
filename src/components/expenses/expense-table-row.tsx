import { useDisclosure, Tr, Td, Box } from '@chakra-ui/react';
import React from 'react';
import { defaultExpense } from '../../models/Expense';
import ExpenseModal from './expense-modal';

function ExpenseTableRow({ expense, onEditExpense, onDeleteExpense }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Tr key={expense.id} onClick={onOpen}>
      <Td p={3}>
        <Box
          display="inline-block"
          bg={expense.category.color}
          h="1rem"
          w="1rem"
          borderRadius="1rem"
        ></Box>{' '}
        <ExpenseModal
          isOpen={isOpen}
          onClose={onClose}
          title="Измени трошак"
          expense={expense}
          handleSubmit={onEditExpense}
          onDeleteExpense={onDeleteExpense}
        ></ExpenseModal>
      </Td>
      <Td pl={0}>{expense.name}</Td>
      <Td>{expense.date.toLocaleDateString('sr')}</Td>
      <Td isNumeric>{expense.amount}</Td>
    </Tr>
  );
}

export default ExpenseTableRow;
