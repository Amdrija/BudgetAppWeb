import { useAuth0 } from '@auth0/auth0-react';
import { Select } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Category } from '../../models/Category';
import { getCategories } from '../../repositories/CategoryRepository';

type CategorySelectProps = {
  changeCategory: (category: Category[]) => void;
  defaultValue: Category[];
};

function MultipleCategorySelect({
  changeCategory,
  defaultValue,
}: CategorySelectProps) {
  const { getAccessTokenSilently } = useAuth0();
  const [categories, setCategories] = useState(new Array<Category>());
  const [selectedCategoryIds, setSelectedCategoryIds] = useState(
    defaultValue.map((c) => c.id)
  );

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
    const selectedIds: Array<string> = Array.from(event.target.options)
      .filter((o) => o.selected)
      .map(o.value);
    console.log(selectedIds);
    setSelectedCategoryIds(selectedIds);
    changeCategory(categories.filter((c) => selectedIds.includes(c.id)));
  };

  return (
    <Select
      placeholder="Изабери категорије"
      onChange={handleChange}
      multiple={true}
    >
      {categories.map((c) => (
        <option
          key={c.id}
          value={c.id}
          selected={selectedCategoryIds.includes(c.id)}
        >
          {c.name}
        </option>
      ))}
    </Select>
  );
}

export default MultipleCategorySelect;
