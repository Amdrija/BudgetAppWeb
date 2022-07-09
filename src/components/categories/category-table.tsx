import { TableContainer, Table, Thead, Tr, Th, Tbody } from '@chakra-ui/react';
import React from 'react';
import { Category } from '../../models/Category';
import CategoryTableRow from './category-table-row';

type CategoryTableProps = {
  categories: Category[];
  onEditCategory: (category: Category) => Promise<void>;
  onDeleteCategory: (category: Category) => Promise<void>;
};

function CategoryTable({
  categories,
  onEditCategory,
  onDeleteCategory,
}: CategoryTableProps) {
  return (
    <div>
      <TableContainer>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Име</Th>
              <Th>Боја</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.map((category) => (
              <CategoryTableRow
                key={category.id}
                category={category}
                onEditCategory={onEditCategory}
                onDeleteCategory={onDeleteCategory}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CategoryTable;
