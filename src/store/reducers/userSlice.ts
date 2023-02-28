import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userStorage } from '../../utils/localStorageModels';

export interface User {
  isLogged: boolean;
  userName: string | null;
}

const initialState: User = {
  isLogged: !!userStorage.getItem(),
  userName: userStorage.getItem(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<{ name: string }>) => {
      state.isLogged = true;
      state.userName = action.payload.name;
      userStorage.setItem(action.payload.name);
    },
    logOut: (state) => {
      state.isLogged = false;
      state.userName = null;
      userStorage.removeItem();
    },
  },
});

export const { reducer: userReducer, actions: userActions } = userSlice;
