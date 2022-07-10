import { useAuth0 } from '@auth0/auth0-react';
import {
  Heading,
  useToast,
  Text,
  Box,
  Checkbox,
  Flex,
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  Button,
  Grid,
  GridItem,
  SimpleGrid,
} from '@chakra-ui/react';
import React, { ChangeEvent, useEffect, useState } from 'react';
import MultipleCategorySelect from '../components/categories/multiple-category-select';
import DatePicker from '../components/datepicker/datepicker';
import ExpenseTable from '../components/expenses/expense-table';
import { Category } from '../models/Category';
import { Expense } from '../models/Expense';
import { getCategories } from '../repositories/CategoryRepository';
import {
  deleteExpense,
  editExpense,
  GetExpenses,
} from '../repositories/ExpenseRepository';
import Categories from './categories';

type SearchCrtiera = {
  StartDate: Date | null;
  EndDate: Date | null;
  Categories: Category[] | null;
  MinimumAmount: number | null;
  MaximumAmount: number | null;
};

const defaultSearchCriteria: SearchCrtiera = {
  StartDate: null,
  EndDate: null,
  Categories: null,
  MinimumAmount: null,
  MaximumAmount: null,
};

function Search() {
  const [expenses, setExpenses] = useState(new Array<Expense>());
  const [searchCriteria, setSearchCriteria] = useState(defaultSearchCriteria);
  const [categories, setCategories] = useState(new Array<Category>());
  const toast = useToast();

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();

        setCategories(await getCategories(token));
      } catch (e) {
        toast({
          title: 'Грешка',
          description: 'Дошло је до грешке при учитавању података.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (searchCriteria == defaultSearchCriteria) {
        setExpenses([]);
        return;
      }

      try {
        const token = await getAccessTokenSilently();
        const expenses = await GetExpenses(
          token,
          searchCriteria.StartDate,
          searchCriteria.EndDate,
          searchCriteria.Categories?.map((c) => c.id) ?? null,
          searchCriteria.MinimumAmount,
          searchCriteria.MaximumAmount
        );
        setExpenses(expenses);
      } catch (e) {
        toast({
          title: 'Грешка',
          description: 'Дошло је до грешке при учитавању података.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    })();
  }, [searchCriteria]);

  const editExpenseModal = async (newExpense: Expense) => {
    try {
      const token = await getAccessTokenSilently();
      const expense = await editExpense(token, newExpense);
      expense.category = newExpense.category;

      setExpenses(
        expenses
          .map((e) => (e.id != expense.id ? e : expense))
          .sort((a, b) => b.date.getTime() - a.date.getTime())
      );
    } catch (e) {
      toast({
        title: 'Грешка',
        description: 'Дошло је до грешке при промени трошка.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const deleteExpenseModal = async (newExpense: Expense) => {
    try {
      const token = await getAccessTokenSilently();
      await deleteExpense(token, newExpense);

      setExpenses(expenses.filter((e) => e.id != newExpense.id));
    } catch (e) {
      toast({
        title: 'Грешка',
        description: 'Дошло је до грешке при брисању трошка.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const changeCategories = (event: any, category: Category) => {
    let newCategories;
    if (event.target.checked) {
      newCategories = [...(searchCriteria.Categories ?? []), category];
    } else {
      newCategories = searchCriteria.Categories?.filter(
        (c) => c.id != category.id
      );

      if (newCategories === undefined || newCategories == []) {
        newCategories = null;
      }
    }

    setSearchCriteria({
      ...searchCriteria,
      Categories: newCategories,
    });
  };

  const clearFilter = () => {
    setSearchCriteria(defaultSearchCriteria);
  };

  return (
    <>
      <Heading>Претрага</Heading>
      <Box mb={6}>
        <form>
          <Flex wrap="wrap" gap={6} justify="space-between">
            <Box>
              <Text mt={3}>Почетни датум:</Text>
              <DatePicker
                onChange={(date) =>
                  setSearchCriteria({
                    ...searchCriteria,
                    StartDate: date as Date,
                  })
                }
                selectedDate={searchCriteria.StartDate ?? undefined}
              ></DatePicker>
            </Box>
            <Box>
              <Text mt={3}>Крајњи датум:</Text>
              <DatePicker
                onChange={(date) =>
                  setSearchCriteria({
                    ...searchCriteria,
                    EndDate: date as Date,
                  })
                }
                selectedDate={searchCriteria.EndDate ?? undefined}
              ></DatePicker>
            </Box>
            <Box>
              <Text mt={3}>Минимална вредност:</Text>
              <NumberInput
                precision={2}
                step={0.01}
                value={searchCriteria.MinimumAmount ?? 0}
                onChange={(s) =>
                  setSearchCriteria({ ...searchCriteria, MinimumAmount: +s })
                }
                name="MinimumAmount"
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
            <Box>
              <Text mt={3}>Максимална вредност:</Text>
              <NumberInput
                precision={2}
                step={0.01}
                value={searchCriteria.MaximumAmount ?? 0}
                onChange={(s) =>
                  setSearchCriteria({ ...searchCriteria, MaximumAmount: +s })
                }
                name="MaximumAmount"
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
          </Flex>
          <Text mt={3}>Категорије:</Text>
          <SimpleGrid columns={[2, 3, 4]} spacing={3}>
            {categories.map((c) => (
              <Checkbox
                key={c.id}
                isChecked={searchCriteria.Categories?.includes(c) ?? false}
                onChange={(e) => changeCategories(e, c)}
                value={c.id}
              >
                {c.name}
              </Checkbox>
            ))}
          </SimpleGrid>
        </form>
        <Button mt={6} onClick={clearFilter}>
          Избирши филтере
        </Button>
      </Box>
      <ExpenseTable
        expenses={expenses}
        onEditExpense={editExpenseModal}
        onDeleteExpense={deleteExpenseModal}
      />
    </>
  );
}

export default Search;
