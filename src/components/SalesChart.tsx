import { Chart as ChartJS, registerables } from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

import { useAppSelector } from '../app/hooks';
import { ISalesState } from '../features/sales/salesSlice';
import { buildChartDataSet, defaultOptions } from '../utils/chart-utils';

ChartJS.register(...registerables);

const SalesChart = () => {
  const { chart, loading, error } = useAppSelector(
    (state: { sales: ISalesState }) => state.sales,
  );

  if (loading) {
    return <div>...loading</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  const { labels, retailSales, wholesaleSales, minSales, maxSales } = chart;
  const chartData = buildChartDataSet(labels, retailSales, wholesaleSales);
  const options = defaultOptions(minSales, maxSales * 2);

  return (
    <div className='retailSales flex-1 box-border px-5 py-32 bg-white'>
      <Line options={options} data={chartData} />
    </div>
  );
};

export default SalesChart;
