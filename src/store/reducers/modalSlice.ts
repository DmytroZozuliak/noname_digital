import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Modal {
  message?: string;
  isModalOpen: boolean;
}

const initialState: Modal = {
  isModalOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<string | undefined>) {
      state.message = action.payload;
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.message = '';
      state.isModalOpen = false;
    },
  },
});

export const { reducer: modalReducer, actions: modalActions } = modalSlice;
