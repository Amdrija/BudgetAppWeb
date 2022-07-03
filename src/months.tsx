export const months = [
  'Јануар',
  'Фебруар',
  'Март',
  'Април',
  'Мај',
  'Јун',
  'Јул',
  'Август',
  'Септембар',
  'Октобар',
  'Новембар',
  'Децембар',
];

export function getCurrentMonthSerbian(): string {
  let date = new Date();

  return months[date.getMonth()];
}
