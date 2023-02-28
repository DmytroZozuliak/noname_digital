import { PaletteMode } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { themeMode } from '../../theme/theme';
import { Language } from '../../utils/constants/enums';
import { languageStorage, themeStorage } from '../../utils/localStorageModels';

export interface Settings {
  theme: PaletteMode;
  language: Language;
}

const initialState: Settings = {
  theme: (themeStorage.getItem() as PaletteMode | null) || themeMode.dark,
  language: (languageStorage.getItem() as Language | null) || Language.En,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    settingsToggleTheme(state) {
      state.theme = state.theme === themeMode.dark ? themeMode.light : themeMode.dark;
      themeStorage.setItem(state.theme);
    },
    settingsToggleLanguage(state, action: PayloadAction<Language>) {
      state.language = action.payload;
    },
  },
});

export const { reducer: settingsReducer, actions: settingsActions } = settingsSlice;
