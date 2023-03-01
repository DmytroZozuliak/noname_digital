import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormValues } from '../../../interfaces/formInterfaces';
import { useTypedDispatch, useTypedSelector } from '../../../hooks/redux';
import { userActions } from '../../../store/reducers/userSlice';
import { snackActions } from '../../../store/reducers/snackSlice';
import { RoutePath } from '../../../utils/constants/routes';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useValidationSchema } from '../../../hooks/useValidationSchema';
import { mockFormData } from '../../../utils/constants/auth';
import GoogleButton from 'react-google-button';
import { themeMode } from '../../../theme/theme';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import SignInGoogleButton from '../SignInGoogleButton';

const AuthenticationForm = () => {
  const { pathname } = useLocation()
  const [login] = useState(pathname.includes('in'))

  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTypedSelector(state => state.settings.theme)

  const validationSchema = useValidationSchema();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {

    // if (email !== mockFormData.email || password !== mockFormData.password) {
    //   dispatch(snackActions.openErrorSnack(t('snack_message.failed_user')));
    //   return;
    // }

    // dispatch(userActions.logIn({ name: email }));
    // dispatch(snackActions.openSuccessSnack(t('snack_message.success_user')));
    // navigate(RoutePath.Profile, { replace: true });

    try {
      if (login) {
        // Log in (sign in)
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        // Sign up
        await createUserWithEmailAndPassword(auth, email, password)
      }
      navigate(RoutePath.Profile, { replace: true });

    } catch (error) {
      if (error instanceof Error) {
        dispatch(snackActions.openErrorSnack(error.message));
      }
    }

  };

  return (
    <Stack
      component="form"
      justifyContent="space-between"
      alignItems="center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Avatar
        alt="auth-logo"
        color="primary"
        sx={{ backgroundColor: 'rgb(185, 172, 190)', my: '10px' }}
      >
        <LockOutlinedIcon />
      </Avatar>
      <Typography fontSize={26} variant="h5" mb={5}>
        {/* {t('forms.auth.title_sin')} */}
        {login ? 'LOG IN' : "SIGN UP"}
      </Typography>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            sx={{ mb: '10px', minHeight: '80px' }}
            label="Email"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            sx={{ mb: '10px', minHeight: '80px' }}
            autoComplete="on"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <IconButton
                  sx={{ position: 'absolute', right: '12px', top: '8px' }}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
        )}
      />
      <LoadingButton type="submit" sx={{ mt: 2, px: 5, fontSize: '18px' }} variant="contained">
        Submit
      </LoadingButton>

      <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
        {
          login ?
            <Link to={RoutePath.SignUp}>Don't have an account yet? Sign up!</Link>
            :
            <Link to={RoutePath.SignIn}>Already has an account? Sign in!</Link>
        }
        <SignInGoogleButton />
      </Stack>
    </Stack>
  );
};

export default AuthenticationForm;
