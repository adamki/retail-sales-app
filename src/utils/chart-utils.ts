import { ChartOptions } from 'chart.js';
import 'chartjs-adapter-date-fns';

import { IChartData, ISale } from '../features/sales/salesSlice';

export const buildChartDataSet = (
	labels: string[],
	dataOne: number[],
	dataTwo: number[],
) => ({
		labels: labels,
		datasets: [
			{
				label: 'Retail',
				data: dataOne,
				backgroundColor: 'rgb(70, 168, 246)',
				borderColor: 'rgb(70, 168, 246)',
				tension: 0.7,
			},
			{
				label: 'Wholesale',
				data: dataTwo,
				backgroundColor: 'rgb(154, 165, 191)',
				borderColor: 'rgb(154, 165, 191)',
				tension: 0.7,
			},
		],
	});

export const defaultOptions = (
	min: number,
	max: number,
): ChartOptions<'line'> => ({
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
		},
		interaction: {
			intersect: false,
			mode: 'index',
		},
		scales: {
			x: {
				ticks: {
					padding: 50 ,
					font: {
						size: 20,
					},
					color: '#cbd5e1',
					callback: function (timestamp) {
						const date = new Date(timestamp);
						return date
							.toLocaleDateString('en-us', { month: 'short' })
							.toUpperCase();
					},
				},
				offset: true,
				border: {
					display: false,
				},
				grid: {
					display: false,
				},
				type: 'time',
				time: {
					unit: 'month',
					displayFormats: {
						month: 'MMM',
					},
					tooltipFormat: 'MMM dd, yyyy',
				},
				title: {
					display: false,
				},
			},
			y: {
				min,
				max,
				offset: true,
				display: false,
				grid: {
					display: false,
				},
			},
		},
	});

export const generateChartData = (salesData: ISale[]) => {
	const result = salesData.reduce(
		(acc, data: ISale) => {
			acc.labels.push(data.weekEnding);
			acc.retailSales.push(data.retailSales);
			acc.wholesaleSales.push(data.wholesaleSales);

			acc.maxSales = Math.max(
				acc.maxSales,
				data.retailSales,
				data.wholesaleSales,
			);
			acc.minSales = Math.min(
				acc.minSales,
				data.retailSales,
				data.wholesaleSales,
			);

			return acc;
		},
		{
			labels: [],
			retailSales: [],
			wholesaleSales: [],
			maxSales: Number.MIN_VALUE,
			minSales: Number.MAX_VALUE,
		} as IChartData,
	);

	return result;
};
