import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTypedDispatch, useTypedSelector } from '../../../../hooks/redux';
import { Stack, Switch } from '@mui/material';
import { settingsActions } from '../../../../store/reducers/settingsSlice';
import { themeMode } from '../../../../theme/theme';

const ThemeSwitcher = () => {
  const theme = useTypedSelector((state) => state.settings.theme);
  const dispatch = useTypedDispatch();

  return (
    <Stack direction="row" justifyContent="center" alignItems="center">
      <LightModeIcon fontSize="small" />
      <Switch
        color="info"
        checked={theme === themeMode.dark}
        onChange={() => dispatch(settingsActions.settingsToggleTheme())}
      />
      <DarkModeIcon fontSize="small" />
    </Stack>
  );
};

export default ThemeSwitcher;
