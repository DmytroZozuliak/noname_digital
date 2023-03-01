import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { stringAvatar } from '../../../../utils/functions';
import { useTypedDispatch, useTypedSelector } from '../../../../hooks/redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../../utils/constants/routes';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebase';
import { snackActions } from '../../../../store/reducers/snackSlice';

const AuthLogo = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const email = useTypedSelector((state) => state.user.email);
  const userPhoto = useTypedSelector((state) => state.user.userPhoto);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      if (error instanceof Error) {
        dispatch(snackActions.openErrorSnack(error.message));
      }
    }

    navigate(RoutePath.Home);
    handleCloseUserMenu();
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={email}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {userPhoto ? (
            <Avatar alt="logo" imgProps={{ referrerPolicy: 'no-referrer' }} src={userPhoto} />
          ) : (
            <Avatar>{email && stringAvatar(email)}</Avatar>
          )}
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
        <MenuItem
          onClick={() => {
            navigate(RoutePath.Profile);
            handleCloseUserMenu();
          }}
        >
          <ShoppingCartIcon fontSize="small" />
          <Typography marginLeft={2} textAlign="center">
            Shopping Cart
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          <LogoutIcon fontSize="small" />
          <Typography marginLeft={2} textAlign="center">
            Log out
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AuthLogo;
