import { useAuth0 } from '@auth0/auth0-react';
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Flex,
  Box,
  FormLabel,
  Switch,
  Textarea,
  FormControl,
} from '@chakra-ui/react';
import React, { ChangeEvent, MouseEventHandler, useState } from 'react';
import { Category } from '../../models/Category';
import { defaultExpense, Expense } from '../../models/Expense';
import { addExpense } from '../../repositories/ExpenseRepository';
import theme from '../../theme';
import CategorySelect from '../categories/category-select';
import DatePicker from '../datepicker/datepicker';

type ExpenseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  expense: Expense;
  handleSubmit: (newExpense: Expense) => Promise<void>;
  onDeleteExpense: ((expense: Expense) => Promise<void>) | null;
};

function ExpenseModal({
  isOpen,
  onClose,
  title,
  expense,
  handleSubmit,
  onDeleteExpense,
}: ExpenseModalProps) {
  const [isIncome, setIsIncome] = useState(expense.amount > 0 || false);
  const [newExpense, setNewExpense] = useState({
    ...expense,
    amount: expense.amount < 0 ? -expense.amount : expense.amount,
  } as Expense);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setNewExpense({
      ...newExpense,
      [name]: value,
    } as Expense);
  };

  const changeDate = (date: Date) => {
    setNewExpense({ ...newExpense, date: date });
  };

  const changeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    setNewExpense({
      ...newExpense,
      amount: +event.target.value,
    });
  };

  const changeCategory = (category: Category) => {
    setNewExpense({
      ...newExpense,
      category: category,
      categoryId: category.id,
    });
  };

  const changeAmountSign = () => {
    setIsIncome(!isIncome);
  };

  const submitModal = async () => {
    newExpense.amount = isIncome ? newExpense.amount : -newExpense.amount;

    await handleSubmit(newExpense);
    if (expense.id === defaultExpense.id) {
      setNewExpense(defaultExpense);
    }

    onClose();
  };

  const deleteModal = async () => {
    if (onDeleteExpense == null) {
      return;
    }

    await onDeleteExpense(expense);

    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <Flex align="center">
                <FormLabel htmlFor="??xpense-income-swich" mb={1}>
                  ????????????
                </FormLabel>
                <Switch
                  id="income-swich"
                  isChecked={isIncome}
                  colorScheme={theme.buttonPrimary}
                  onChange={changeAmountSign}
                />
                <FormLabel htmlFor="??xpense-income-swich" ml={3} mb={1}>
                  ????????????
                </FormLabel>
              </Flex>
              <FormControl isRequired>
                <FormLabel htmlFor="name-input" mt={3}>
                  ??????:
                </FormLabel>
                <Input
                  placeholder="??????"
                  value={newExpense.name}
                  onChange={handleChange}
                  name="name"
                  id="name-input"
                ></Input>
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="amount-input" mt={3}>
                  ????????????????:
                </FormLabel>
                <NumberInput
                  precision={2}
                  step={0.01}
                  min={0}
                  defaultValue={newExpense.amount}
                  id="amount-input"
                >
                  <NumberInputField
                    value={newExpense.amount}
                    onChange={changeAmount}
                    name="amount"
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="catregory-select" mt={3}>
                  ????????????????????:
                </FormLabel>
                <CategorySelect
                  changeCategory={changeCategory}
                  defaultValue={newExpense.category}
                  id="category-select"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="date-input" mt={3}>
                  ??????????:
                </FormLabel>
                <DatePicker
                  onChange={changeDate}
                  selectedDate={newExpense.date}
                  name="date"
                  id="date-input"
                ></DatePicker>
              </FormControl>
              <Text mt={3}>????????:</Text>
              <Textarea
                placeholder="????????"
                value={newExpense.description ?? ''}
                onChange={handleChange}
                name="description"
              ></Textarea>
            </form>
          </ModalBody>

          <ModalFooter display="flex" justifyContent="space-between">
            <Box>
              {onDeleteExpense != null && (
                <Button colorScheme="red" onClick={deleteModal}>
                  ??????????????
                </Button>
              )}
            </Box>
            <Box>
              <Button
                colorScheme={theme.buttonPrimary}
                mr={3}
                onClick={submitModal}
              >
                ??????????????
              </Button>
              <Button variant="ghost" onClick={onClose}>
                ????????????????
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ExpenseModal;
