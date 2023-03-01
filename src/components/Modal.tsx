import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
  const handleRedirectLogIn = () => {
    dispatch(modalActions.closeModal());
    navigate(RoutePath.SignIn);
  };
  const handleRedirectSignUp = () => {
    dispatch(modalActions.closeModal());
    navigate(RoutePath.SignUp);
  };

  return (
    <Dialog onClose={handleClose} open={isModalOpen} sx={{ padding: 15 }}>
      <CloseIcon
        onClick={() => dispatch(modalActions.closeModal())}
        sx={{ position: 'absolute', right: 0, top: 0, cursor: 'pointer' }}
        fontSize="large"
      />
      <DialogTitle>We are sorry!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You cannot add products to your cart, because you are not logged in
        </DialogContentText>
        <DialogContentText>{message}</DialogContentText>

        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRedirectLogIn}>Log in</Button>
        <Button onClick={handleRedirectSignUp}>Sign up</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
