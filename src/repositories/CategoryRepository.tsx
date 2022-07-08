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
