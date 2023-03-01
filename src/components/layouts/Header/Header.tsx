import { AppBar, Box, Button, Container, IconButton, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthLogo from './components/AuthLogo';
import ThemeSwitcher from './components/ThemeSwitcher';
import Burger from './components/Burger';
import { useTypedSelector } from '../../../hooks/redux';
import { RoutePath } from '../../../utils/constants/routes';

const Header = () => {
  const isLogged = useTypedSelector((state) => state.user.isLogged);
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToGoods = () => navigate(RoutePath.Goods);
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

              <IconButton onClick={navigateToGoods} className={btnNavigationClass(RoutePath.Goods)}>
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
                Home
              </Button>
              <Button
                className={btnNavigationClass(RoutePath.Goods)}
                onClick={navigateToGoods}
                startIcon={<DashboardIcon />}
                color="inherit"
              >
                Goods
              </Button>
              {isLogged && (
                <Button
                  className={btnNavigationClass(RoutePath.Profile)}
                  onClick={navigateToProfile}
                  startIcon={<AccountBoxIcon />}
                  color="inherit"
                >
                  Personal cabinet
                </Button>
              )}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '20px', ml: 'auto' }}>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, columnGap: '20px' }}>
                <ThemeSwitcher />
              </Box>
              {isLogged ? (
                <AuthLogo />
              ) : (
                <Button
                  onClick={() => navigate(RoutePath.SignIn)}
                  color="inherit"
                  className={'header-btn'}
                >
                  Log in
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
