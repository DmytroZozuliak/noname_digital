import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import Root from './pages/Root';
import Footer from './components/layouts/Footer/';
import Header from './components/layouts/Header/';
import Main from './components/layouts/Main/';
import { useTypedSelector } from './hooks/redux';
import { darkTheme, lightTheme, themeMode } from './theme/theme';

function App() {
  const theme = useTypedSelector((state) => state.settings.theme);

  return (
    <ThemeProvider theme={theme === themeMode.dark ? darkTheme : lightTheme}>
      <CssBaseline />
      <Header />
      <Main>
        <Root />
      </Main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
