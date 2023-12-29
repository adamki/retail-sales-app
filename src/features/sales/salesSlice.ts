import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { produce } from 'immer';

import { generateChartData } from '../../utils/chart-utils';

interface IReview {
  customer: string;
  review: string;
  score: number;
}

export interface ISale {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
}

interface IProduct {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  brand: string;
  reviews: IReview[];
  retailer: string;
  details: string[];
  tags: string[];
  sales: ISale[];
}

export interface IChartData {
  labels: string[];
  retailSales: number[];
  wholesaleSales: number[];
  minSales: number;
  maxSales: number;
}

export interface ISalesState {
  data: IProduct | null;
  chart: IChartData;
  loading: boolean;
  error: string | undefined;
}

const initialState: ISalesState = {
  data: null,
  chart: {
    labels: [],
    retailSales: [],
    wholesaleSales: [],
    minSales: Number.MAX_VALUE,
    maxSales: Number.MIN_VALUE,
  },
  loading: false,
  error: undefined,
};

export const fetchSales = createAsyncThunk('sales/fetchSales', async () => {
  const response = await fetch('sales.json');
  const data = await response.json();

  return data[0];
});

export const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSales.pending, state => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        const { labels, retailSales, wholesaleSales, maxSales, minSales } =
          generateChartData(action.payload.sales);

        return produce(state, draftState => {
          draftState.loading = false;
          draftState.chart.labels = labels;
          draftState.chart.retailSales = retailSales;
          draftState.chart.wholesaleSales = wholesaleSales;
          draftState.chart.minSales = minSales;
          draftState.chart.maxSales = maxSales;
          draftState.data = action.payload;
        });
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default salesSlice.reducer;
