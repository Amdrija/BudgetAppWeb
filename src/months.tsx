const months = [
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
  return getMonthSerbian(new Date());
}

export function getMonthSerbian(date: Date): string {
  return months[date.getMonth()];
}
