import { Button, Center, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { Category, defaultCategory } from '../../models/Category';
import { defaultExpense, Expense } from '../../models/Expense';
import theme from '../../theme';
import CategoryModal from './category-modal';

type AddCategoryModalProps = {
  handleSubmit: (newCategory: Category) => Promise<void>;
};

function AddCategoryModal({ handleSubmit }: AddCategoryModalProps) {
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
        <Center p={3}>+ Додај категорију</Center>
      </Button>
      <CategoryModal
        isOpen={isOpen}
        onClose={onClose}
        title="Додај нови категорију"
        category={defaultCategory}
        handleSubmit={handleSubmit}
        onDeleteCategory={null}
      ></CategoryModal>
    </>
  );
}

export default AddCategoryModal;
