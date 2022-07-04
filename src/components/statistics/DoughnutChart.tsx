import React from 'react';
import {
  ArcElement,
  Chart as ChartJS,
  defaults,
  Legend,
  Tooltip,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { AmountByCategory, TotalAmount } from '../../models/GetTotalAmount';

type DoughnutChartProps = {
  byCategory: AmountByCategory[];
};

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ byCategory }: DoughnutChartProps) {
  const data = {
    labels: byCategory.map<string>((bc) => bc.category.name),
    datasets: [
      {
        data: byCategory.map<number>((bc) => bc.amount),
        backgroundColor: byCategory.map<string>((bc) => bc.category.color),
      },
    ],
  };
  return <Doughnut data={data}></Doughnut>;
}

export default DoughnutChart;
