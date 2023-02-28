import {
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Box } from '@mui/system';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitch from './LanguageSwitch';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from '../../../../hooks/redux';

const Burger = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const { t } = useTranslation();
  const theme = useTypedSelector((state) => state.settings.theme);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setIsOpenDrawer(open);
  };

  const renderList = () => (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography sx={{ ml: '10px' }}>{t(`header.burgerMenu`)}</Typography>
        <Button onClick={() => setIsOpenDrawer(false)}>
          <CloseIcon sx={{ color: theme === 'dark' ? 'white' : 'black' }} />
        </Button>
      </Stack>
      <List>
        <ListItem>
          <LanguageSwitch />
        </ListItem>
        <ListItem>
          <ThemeSwitcher />
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      <IconButton size="large" onClick={toggleDrawer(true)} color="inherit" className="header-btn">
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isOpenDrawer} onClose={toggleDrawer(false)}>
        {renderList()}
      </Drawer>
    </>
  );
};

export default Burger;
