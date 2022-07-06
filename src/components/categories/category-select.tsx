import { useAuth0 } from '@auth0/auth0-react';
import { Select } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Category } from '../../models/Category';
import { getCategories } from '../../repositories/CategoryRepository';

type CategorySelectProps = {
  changeCategory: (category: Category) => void;
};

function CategorySelect({ changeCategory }) {
  const { getAccessTokenSilently } = useAuth0();
  const [categories, setCategories] = useState(new Array<Category>());
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();

        setCategories(await getCategories(token));
      } catch (e) {
        console.log(e);
      }
    })();
  });

  const handleChange = (event) => {
    setSelectedCategoryId(event.target.value);
    changeCategory(categories.find((c) => c.id == event.target.value));
  };

  return (
    <Select
      placeholder="Select option"
      onChange={handleChange}
      value={selectedCategoryId}
    >
      {categories.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </Select>
  );
}

export default CategorySelect;
