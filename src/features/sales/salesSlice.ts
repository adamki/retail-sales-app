import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface IReview {
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

export interface IProduct {
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

export interface ISalesState {
  data: IProduct[] | null;
  loading: boolean;
  error: string | undefined;
}

const initialState: ISalesState = {
  data: null,
  loading: false,
  error: undefined,
};

export const fetchSales = createAsyncThunk('sales/fetchSales', async () => {
  const response = await fetch('src/data/sales.json');
  const data = await response.json();

  return data;
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
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default salesSlice.reducer;
