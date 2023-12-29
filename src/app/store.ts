// eslint-disable-next-line import/named
import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import salesReducer from '../features/sales/salesSlice';

export const store = configureStore({
  reducer: {
    sales: salesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
