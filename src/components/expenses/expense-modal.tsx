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
import React, { ChangeEvent, useState } from 'react';
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
};

function ExpenseModal({
  isOpen,
  onClose,
  title,
  expense,
  handleSubmit,
}: ExpenseModalProps) {
  const [isIncome, setIsIncome] = useState(expense.amount > 0 || false);
  const [newExpense, setNewExpense] = useState({
    ...expense,
    amount: expense.amount < 0 ? -expense.amount : expense.amount,
  } as Expense);

  const handleChange = (event: ChangeEvent) => {
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

  const changeAmount = (event: ChangeEvent) => {
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

  const submitModal = async (event: Event) => {
    event.preventDefault();
    newExpense.amount = isIncome ? newExpense.amount : -newExpense.amount;

    await handleSubmit(newExpense);
    if (expense.id === defaultExpense.id) {
      setNewExpense(defaultExpense);
    }

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
                <FormLabel htmlFor="еxpense-income-swich" mb={1}>
                  Трошак
                </FormLabel>
                <Switch
                  id="income-swich"
                  isChecked={isIncome}
                  colorScheme={theme.buttonPrimary}
                  onChange={changeAmountSign}
                />
                <FormLabel htmlFor="еxpense-income-swich" ml={3} mb={1}>
                  Зарада
                </FormLabel>
              </Flex>
              <Text mt={3}>Име:</Text>
              <Input
                placeholder="Име"
                value={newExpense.name}
                onChange={handleChange}
                name="name"
              ></Input>
              <Text mt={3}>Вредност:</Text>
              <NumberInput
                precision={2}
                step={0.01}
                min={0}
                defaultValue={newExpense.amount}
              >
                <NumberInputField
                  value={newExpense.amount}
                  onChange={changeAmount}
                  name="amount"
                  required
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Text mt={3}>Категорија:</Text>
              <CategorySelect
                changeCategory={changeCategory}
                defaultValue={newExpense.category}
              />
              <Text mt={3}>Датум:</Text>
              <DatePicker
                onChange={changeDate}
                selectedDate={newExpense.date}
                name="date"
              ></DatePicker>
              <Text mt={3}>Опис:</Text>
              <Textarea
                placeholder="Опис"
                value={newExpense.description ?? ''}
                onChange={handleChange}
                name="description"
              ></Textarea>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme={theme.buttonPrimary}
              mr={3}
              onClick={submitModal}
            >
              Сачувај
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Одустани
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ExpenseModal;
