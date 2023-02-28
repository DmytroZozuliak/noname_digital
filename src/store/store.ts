import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userSlice';
import { settingsReducer } from './reducers/settingsSlice';
import { newsReducer } from './reducers/newsSlice';
import { snackReducer } from './reducers/snackSlice';

const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  news: newsReducer,
  snack: snackReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
