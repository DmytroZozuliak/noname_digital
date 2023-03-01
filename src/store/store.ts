import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userSlice';
import { settingsReducer } from './reducers/settingsSlice';
import { goodsReducer } from './reducers/goodsSlice';
import { snackReducer } from './reducers/snackSlice';
import { modalReducer } from './reducers/modalSlice';

const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  goods: goodsReducer,
  snack: snackReducer,
  modal: modalReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
