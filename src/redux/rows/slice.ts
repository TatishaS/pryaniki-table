import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';
import { RowsSliceState, Status, ITableItem, INewItem } from './types';

const initialState: RowsSliceState = {
  rows: [],
  status: Status.LOADING,
  error: null,
};

export const fetchTableData = createAsyncThunk<ITableItem[]>(
  'rows/fetchTableData',
  async () => {
    const response = await axiosInstance.get(
      '/ru/data/v3/testmethods/docs/userdocs/get'
    );
    return response.data.data;
  }
);

export const deleteRow = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('rows/deleteRow', async (id: string) => {
  const data = await axiosInstance.post(
    `/ru/data/v3/testmethods/docs/userdocs/delete/${id}`
  );
  console.log(data);
  return id;
});

export const addRow = createAsyncThunk('rows/addRow', async (obj: INewItem) => {
  const jsonItem = JSON.stringify(obj);
  const response = await axiosInstance.post(
    `/ru/data/v3/testmethods/docs/userdocs/create`,

    jsonItem,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-auth': window.localStorage.getItem('pryaniki-token'),
      },
    }
  );

  const newObj = response.data.data;
  return newObj;
  console.log(response.data.data);
});

export const editRow = createAsyncThunk(
  'rows/editRow',
  async (obj: ITableItem) => {
    const jsonItem = JSON.stringify(obj);
    const id = obj.id;
    const response = await axiosInstance.post(
      `/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
      jsonItem,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-auth': window.localStorage.getItem('pryaniki-token'),
        },
      }
    );

    const newObj = response.data.data;
    return newObj;
  }
);

export const rowsSlice = createSlice({
  name: 'rows',
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<ITableItem[]>) => {
      state.rows = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTableData.pending, state => {
        state.rows = [];
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(fetchTableData.fulfilled, (state, action) => {
        state.rows = action.payload;
        state.status = Status.SUCCESS;
        state.error = null;
      })
      .addCase(fetchTableData.rejected, state => {
        state.rows = [];
        state.status = Status.ERROR;
      })
      .addCase(deleteRow.pending, state => {
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(deleteRow.fulfilled, (state, action) => {
        state.rows = state.rows.filter(row => row.id !== action.payload);
        state.status = Status.SUCCESS;
        state.error = null;
      })
      .addCase(deleteRow.rejected, state => {
        state.status = Status.ERROR;
        state.error = 'Ошибка сервера. Повторите операцию позже.';
      })
      .addCase(addRow.pending, state => {
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(addRow.fulfilled, (state, action) => {
        state.rows = [...state.rows, action.payload];
        state.status = Status.SUCCESS;
        state.error = null;
      })
      .addCase(addRow.rejected, state => {
        state.status = Status.ERROR;
        state.error = 'Ошибка сервера. Повторите операцию позже.';
      })
      .addCase(editRow.pending, state => {
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(editRow.fulfilled, (state, action) => {
        state.rows = state.rows.map(obj =>
          obj.id === action.payload.id ? action.payload : obj
        );
        //state.rows = state.rows;
        state.status = Status.SUCCESS;
        state.error = null;
      })
      .addCase(editRow.rejected, state => {
        state.status = Status.ERROR;
        state.error = 'Ошибка сервера. Повторите операцию позже.';
      });
  },
});

export const { setRows } = rowsSlice.actions;

export default rowsSlice.reducer;
