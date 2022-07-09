import { useAuth0 } from '@auth0/auth0-react';
import { Box, Heading, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import AddCategoryModal from '../components/categories/add-category-modal';
import CategoryTable from '../components/categories/category-table';
import { Category } from '../models/Category';
import {
  addCategory,
  deleteCategory,
  editCategory,
  getCategories,
} from '../repositories/CategoryRepository';

function Categories() {
  const [categories, setCategories] = useState(new Array<Category>());
  const { getAccessTokenSilently } = useAuth0();
  const toast = useToast();

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();

        const categories = await getCategories(token);
        setCategories(categories);
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

  const categoryAdd = async (category: Category) => {
    try {
      const token = await getAccessTokenSilently();
      const categoryResponse = await addCategory(token, category);

      setCategories([categoryResponse, ...categories]);
    } catch (e) {
      toast({
        title: 'Грешка',
        description: 'Дошло је до грешке при додавању категорије.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const categoryEdit = async (category: Category) => {
    try {
      const token = await getAccessTokenSilently();
      const categoryResponse = await editCategory(token, category);

      setCategories(
        categories.map((c) =>
          c.id == categoryResponse.id ? categoryResponse : c
        )
      );
    } catch (e) {
      toast({
        title: 'Грешка',
        description: 'Дошло је до грешке при промени категорије.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const categoryDelete = async (category: Category) => {
    try {
      const token = await getAccessTokenSilently();
      await deleteCategory(token, category);

      setCategories(categories.filter((c) => c.id != category.id));
    } catch (e) {
      toast({
        title: 'Грешка',
        description: 'Дошло је до грешке при брисању категорије.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Heading mt={6} mb={6}>
        Категорије
      </Heading>
      <Box mb={6}>
        <AddCategoryModal handleSubmit={categoryAdd}></AddCategoryModal>
      </Box>
      <CategoryTable
        categories={categories}
        onDeleteCategory={categoryDelete}
        onEditCategory={categoryEdit}
      />
    </>
  );
}

export default Categories;
