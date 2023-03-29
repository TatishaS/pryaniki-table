import { configureStore } from '@reduxjs/toolkit';
import rows from './rows/slice';

export const store = configureStore({
  reducer: {
    rows,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
