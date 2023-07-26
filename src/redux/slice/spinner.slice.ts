import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: false,
  success: false,
  message: null,
  data: null,
};

export const spinnerSlice = createSlice({
  name: 'spinner',
  initialState,
  reducers: {
    startSpinner: state => {
      state.loading = true;
    },
    stopSpinner: state => {
      state.loading = false;
    },
  },
});

export const {startSpinner, stopSpinner} = spinnerSlice.actions;

export default spinnerSlice.reducer;
