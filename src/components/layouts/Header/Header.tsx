import { AppBar, Box, Button, Container, IconButton, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitch from './components/LanguageSwitch';
import AuthLogo from './components/AuthLogo';
import ThemeSwitcher from './components/ThemeSwitcher';
import Burger from './components/Burger';
import { useTypedSelector } from '../../../hooks/redux';
import { RoutePath } from '../../../utils/constants/routes';

const Header = () => {
  const isLogged = useTypedSelector((state) => state.user.isLogged);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToNews = () => navigate(RoutePath.Goods);
  const navigateToProfile = () => navigate(RoutePath.Profile);
  const navigateToHome = () => navigate(RoutePath.Home);
  const btnNavigationClass = (btnLocation: string) => {
    return btnLocation === location.pathname ? 'header-btn active' : 'header-btn';
  };

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, columnGap: '10px' }}>
              <Burger />

              <IconButton className={btnNavigationClass(RoutePath.Home)} onClick={navigateToHome}>
                <HomeIcon />
              </IconButton>

              <IconButton onClick={navigateToNews} className={btnNavigationClass(RoutePath.Goods)}>
                <DashboardIcon />
              </IconButton>

              {isLogged && (
                <IconButton
                  onClick={navigateToProfile}
                  className={btnNavigationClass(RoutePath.Profile)}
                >
                  <AccountBoxIcon />
                </IconButton>
              )}
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, columnGap: '10px' }}>
              <Button
                className={btnNavigationClass(RoutePath.Home)}
                onClick={navigateToHome}
                startIcon={<HomeIcon />}
                color="inherit"
              >
                {t(`buttons.home`)}
              </Button>
              <Button
                className={btnNavigationClass(RoutePath.Goods)}
                onClick={navigateToNews}
                startIcon={<DashboardIcon />}
                color="inherit"
              >
                {t(`buttons.goods`)}
              </Button>
              {isLogged && (
                <Button
                  className={btnNavigationClass(RoutePath.Profile)}
                  onClick={navigateToProfile}
                  startIcon={<AccountBoxIcon />}
                  color="inherit"
                >
                  {t(`buttons.profile`)}
                </Button>
              )}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '20px', ml: 'auto' }}>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, columnGap: '20px' }}>
                <ThemeSwitcher />
                <LanguageSwitch />
              </Box>
              {isLogged ? (
                <AuthLogo />
              ) : (
                <Button
                  onClick={() => navigate(RoutePath.SignIn)}
                  color="inherit"
                  className={'header-btn'}
                >
                  {t('buttons.login')}
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Header;
