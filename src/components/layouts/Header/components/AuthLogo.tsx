import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { stringAvatar } from '../../../../utils/functions';
import { useTypedDispatch, useTypedSelector } from '../../../../hooks/redux';
import { userActions } from '../../../../store/reducers/userSlice';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../../utils/constants/routes';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebase';

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

      await signOut(auth)
      //sign out successful
      console.log("sign out successful");
    } catch (error) {
      if (error instanceof Error) {
        // error happened

      }
    }

    navigate(RoutePath.Home);
    handleCloseUserMenu();
  };

  console.log("userPhoto", userPhoto);


  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={email}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {userPhoto ?
            <Avatar
              alt="logo"
              imgProps={{ referrerPolicy: "no-referrer" }}
              src={userPhoto}
            />
            :
            <Avatar>{email && stringAvatar(email)}</Avatar>
          }
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
            Log out
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AuthLogo;
