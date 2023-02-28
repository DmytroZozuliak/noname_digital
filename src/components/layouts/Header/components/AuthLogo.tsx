import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { stringAvatar } from '../../../../utils/functions';
import { useTypedDispatch, useTypedSelector } from '../../../../hooks/redux';
import { userActions } from '../../../../store/reducers/userSlice';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../../utils/constants/routes';

const AuthLogo = () => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const userName = useTypedSelector((state) => state.user.userName);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    dispatch(userActions.logOut());
    navigate(RoutePath.Home);
    handleCloseUserMenu();
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={userName}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar>{userName && stringAvatar(userName)}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appBar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleLogOut}>
          <LogoutIcon fontSize="small" />
          <Typography marginLeft={2} textAlign="center">
            {t('header.logOutProfile')}
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AuthLogo;
