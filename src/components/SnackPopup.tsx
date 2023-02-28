import { Alert, Snackbar } from '@mui/material';
import { useTypedDispatch, useTypedSelector } from '../hooks/redux';
import { snackActions } from '../store/reducers/snackSlice';

const SnackPopup = () => {
  const { isSnackBarOpen, severity, message } = useTypedSelector((state) => state.snack);
  const dispatch = useTypedDispatch();

  const handleClose = () => {
    dispatch(snackActions.closeSnack());
  };

  return (
    <Snackbar open={isSnackBarOpen} autoHideDuration={2000} onClose={handleClose}>
      <Alert severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackPopup;
