import { Category } from '../models/Category';

export async function getCategories(token: string): Promise<Category[]> {
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const response = await fetch(`${serverUrl}/Category`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP Error Status: ${response.status}`);
  }

  const responseData: Category[] = await response.json();

  return responseData;
}

export async function addCategory(
  token: string,
  category: Category
): Promise<Category> {
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const response = await fetch(`${serverUrl}/Category`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    throw new Error(`HTTP Error Status: ${response.status}`);
  }

  const responseData: Category = await response.json();

  return responseData;
}

export async function editCategory(
  token: string,
  category: Category
): Promise<Category> {
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const response = await fetch(`${serverUrl}/Category/${category.id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    throw new Error(`HTTP Error Status: ${response.status}`);
  }

  const responseData: Category = await response.json();

  return responseData;
}

export async function deleteCategory(
  token: string,
  category: Category
): Promise<void> {
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const response = await fetch(`${serverUrl}/Category/${category.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP Error Status: ${response.status}`);
  }
}
