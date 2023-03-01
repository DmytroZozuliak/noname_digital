import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  categoryGoodsStorage,
  searchGoodsStorage,
  shoppingCartStorage,
  sortGoodsStorage,
  userStorage,
} from '../../utils/localStorageModels';

export interface User {
  isLogged: boolean;
  userName: string | null;
  userPhoto: string | null;
  email: string | null;
}

const initialState: User = {
  isLogged: !!userStorage.getItem(),
  email: userStorage.getItem(),
  userName: userStorage.getItem(),
  userPhoto: userStorage.getItem(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<Omit<User, 'isLogged'>>) => {
      state.isLogged = true;
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.userPhoto = action.payload.userPhoto;
      userStorage.setItem(action.payload.userName);
    },
    logOut: (state) => {
      state.isLogged = false;
      state.email = null;
      state.userName = null;
      state.userPhoto = null;
      userStorage.removeItem();
      searchGoodsStorage.removeItem();
      categoryGoodsStorage.removeItem();
      sortGoodsStorage.removeItem();
      shoppingCartStorage.removeItem();
    },
  },
});

export const { reducer: userReducer, actions: userActions } = userSlice;
