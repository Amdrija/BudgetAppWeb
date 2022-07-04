import { TotalAmount } from '../models/GetTotalAmount';

export async function GetTotalAmount(
  token: string,
  startDate: Date | null,
  endDate: Date | null
): Promise<TotalAmount> {
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const response = await fetch(
    `${serverUrl}/Expense/graph?StartDate=${startDate?.toISOString()}&EndDate=${endDate?.toISOString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const responseData: TotalAmount = await response.json();

  return responseData;
}
