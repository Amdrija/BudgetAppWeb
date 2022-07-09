import {
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
  Box,
} from '@chakra-ui/react';
import React, { ChangeEvent, useState } from 'react';
import { Category, defaultCategory } from '../../models/Category';
import theme from '../../theme';

type CategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  category: Category;
  handleSubmit: (newECategory: Category) => Promise<void>;
  onDeleteCategory: ((category: Category) => Promise<void>) | null;
};

function CategoryModal({
  isOpen,
  onClose,
  title,
  category,
  handleSubmit,
  onDeleteCategory,
}: CategoryModalProps) {
  const [newCategory, setNewCategory] = useState({
    id: category.id,
    name: category.name,
    color: category.color,
  } as Category);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setNewCategory({
      ...newCategory,
      [name]: value,
    } as Category);
  };

  const submitModal = async () => {
    await handleSubmit(newCategory);
    if (category.id === defaultCategory.id) {
      setNewCategory(defaultCategory);
    }

    onClose();
  };

  const deleteModal = async () => {
    if (onDeleteCategory == null) {
      return;
    }

    await onDeleteCategory(category);

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
              <Text mt={3}>Име:</Text>
              <Input
                placeholder="Име"
                value={newCategory.name}
                onChange={handleChange}
                name="name"
              ></Input>
              <Text mt={3}>Боја:</Text>
              <input
                type="color"
                placeholder="#FFFFFF"
                value={newCategory.color}
                onChange={handleChange}
                name="color"
              ></input>
            </form>
          </ModalBody>
          <ModalFooter display="flex" justifyContent="space-between">
            <Box>
              {onDeleteCategory != null && (
                <Button colorScheme="red" onClick={deleteModal}>
                  Избриши
                </Button>
              )}
            </Box>
            <Box>
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
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CategoryModal;
