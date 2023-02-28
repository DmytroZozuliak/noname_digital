import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Snack {
  message: string;
  isSnackBarOpen: boolean;
  severity: 'error' | 'success';
}

const initialState: Snack = {
  message: '',
  isSnackBarOpen: false,
  severity: 'success',
};

const snackSlice = createSlice({
  name: 'snack',
  initialState,
  reducers: {
    openSuccessSnack(state, action: PayloadAction<string>) {
      state.message = action.payload;
      state.severity = 'success';
      state.isSnackBarOpen = true;
    },
    openErrorSnack(state, action: PayloadAction<string>) {
      state.message = action.payload;
      state.severity = 'error';
      state.isSnackBarOpen = true;
    },
    closeSnack(state) {
      state.message = '';
      state.isSnackBarOpen = false;
    },
  },
});

export const { reducer: snackReducer, actions: snackActions } = snackSlice;
