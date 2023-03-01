import { Button, Dialog, DialogTitle, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from '../hooks/redux';
import { modalActions } from '../store/reducers/modalSlice';
import { RoutePath } from '../utils/constants/routes';

const Modal = () => {
  const navigate = useNavigate();
  const { message, isModalOpen } = useTypedSelector((state) => state.modal);
  const dispatch = useTypedDispatch();

  const handleClose = () => {
    dispatch(modalActions.closeModal());
  };
  const handleRedirect = () => {
    dispatch(modalActions.closeModal());
    navigate(RoutePath.SignIn);
  };

  return (
    <Dialog onClose={handleClose} open={isModalOpen}>
      <DialogTitle>We are sorry!</DialogTitle>
      <Typography>You cannot add products to your cart, because you are not sign in</Typography>
      <Button onClick={handleRedirect}>Sign in</Button>
      <Typography>{message}</Typography>
    </Dialog>
  );
};

export default Modal;
