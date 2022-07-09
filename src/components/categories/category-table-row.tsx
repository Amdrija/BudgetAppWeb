import { useDisclosure, Tr, Td, Box } from '@chakra-ui/react';
import React from 'react';
import CategoryModal from './category-modal';

function CategoryTableRow({ category, onEditCategory, onDeleteCategory }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Tr onClick={onOpen}>
      <Td>{category.name}</Td>
      <Td display="flex" gap={2}>
        <Box
          display="inline-block"
          bg={category.color}
          h="1rem"
          w="1rem"
          borderRadius="1rem"
        ></Box>
        <Box>{category.color}</Box>
        <CategoryModal
          isOpen={isOpen}
          onClose={onClose}
          title="Измени категорију"
          category={category}
          handleSubmit={onEditCategory}
          onDeleteCategory={onDeleteCategory}
        />
      </Td>
    </Tr>
  );
}

export default CategoryTableRow;
