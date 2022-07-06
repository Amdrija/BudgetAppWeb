import { setUncaughtExceptionCaptureCallback } from 'process';
import { Expense } from '../models/Expense';
import { TotalAmount } from '../models/GetTotalAmount';

export async function GetTotalAmount(
  token: string,
  startDate: Date | null,
  endDate: Date | null
): Promise<TotalAmount> {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const searchParams = new URLSearchParams();

  if (startDate != null) {
    searchParams.append('StartDate', startDate?.toISOString());
  }
  if (endDate != null) {
    searchParams.append('StartDate', endDate?.toISOString());
  }

  const response = await fetch(`${serverUrl}/Expense/graph?${searchParams}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseData: TotalAmount = await response.json();

  return responseData;
}

export async function GetExpenses(
  token: string,
  startDate: Date | null,
  endDate: Date | null,
  categoryIds: string[] | null,
  minimumAmount: number | null,
  maximumAmount: number | null
): Promise<Expense[]> {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const searchParams = new URLSearchParams();

  if (startDate != null) {
    searchParams.append('StartDate', startDate?.toISOString());
  }
  if (endDate != null) {
    searchParams.append('StartDate', endDate?.toISOString());
  }
  if (categoryIds != null) {
    searchParams.append('CategoryIds[]', categoryIds.join(','));
  }
  if (minimumAmount != null) {
    searchParams.append('MinimumAmount', minimumAmount.toString());
  }
  if (maximumAmount != null) {
    searchParams.append('MinimumAmount', maximumAmount.toString());
  }

  const response = await fetch(
    `${serverUrl}/Expense?${searchParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const responseData: Expense[] = await response.json();

  return responseData.map((e) => {
    e.date = new Date(e.date);
    return e;
  });
}

export async function addExpense(
  token: string,
  expense: Expense
): Promise<Expense> {
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const response = await fetch(`${serverUrl}/Expense`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify([expense]),
  });
  const responseData: Expense[] = await response.json();
  const expenseResponse: Expense = responseData[0];
  expenseResponse.date = new Date(expenseResponse.date);

  return expenseResponse;
}

export async function editExpense(
  token: string,
  expense: Expense
): Promise<Expense> {
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const response = await fetch(`${serverUrl}/Expense/${expense.id}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(expense),
  });

  const responseData: Expense = await response.json();
  responseData.date = new Date(responseData.date);

  return responseData;
}

export async function deleteExpense(
  token: string,
  expense: Expense
): Promise<void> {
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const response = await fetch(`${serverUrl}/Expense/${expense.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}
