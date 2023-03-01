import { PaletteMode } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { themeMode } from '../../theme/theme';
import { themeStorage } from '../../utils/localStorageModels';

export interface Settings {
  theme: PaletteMode;
}

const initialState: Settings = {
  theme: (themeStorage.getItem() as PaletteMode | null) || themeMode.dark,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    settingsToggleTheme(state) {
      state.theme = state.theme === themeMode.dark ? themeMode.light : themeMode.dark;
      themeStorage.setItem(state.theme);
    },
  },
});

export const { reducer: settingsReducer, actions: settingsActions } = settingsSlice;
