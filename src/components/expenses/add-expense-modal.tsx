import { Button, Center, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { Expense } from '../../models/Expense';
import theme from '../../theme';
import ExpenseModal from './expense-modal';

type AddExpenseModalProps = {
  handleSubmit: (newExpense: Expense) => Promise<void>;
};

function AddExpenseModal({ handleSubmit }: AddExpenseModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        borderStyle="dashed"
        borderWidth="2px"
        borderRadius={theme.borderRadius}
        display="block"
        w="100%"
        h="100%"
        bg="white"
        mt={3}
        onClick={onOpen}
        _hover={{
          borderStyle: 'solid',
          color: theme.primary,
          borderColor: theme.primary,
        }}
      >
        <Center p={3}>+ Додај трошак</Center>
      </Button>
      <ExpenseModal
        isOpen={isOpen}
        onClose={onClose}
        title="Додај нови трошак"
        expense={null}
        handleSubmit={handleSubmit}
      ></ExpenseModal>
    </>
  );
}

export default AddExpenseModal;
