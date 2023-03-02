import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormValues } from '../../../interfaces/formInterfaces';
import { useTypedDispatch, useTypedSelector } from '../../../hooks/redux';
import { snackActions } from '../../../store/reducers/snackSlice';
import { RoutePath } from '../../../utils/constants/routes';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useValidationSchema } from '../../../hooks/useValidationSchema';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import SignInGoogleButton from '../SignInGoogleButton';

interface AuthenticationFormProps {
  isLoginPage: boolean;
}

const AuthenticationForm = ({ isLoginPage }: AuthenticationFormProps) => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const isLogged = useTypedSelector((state) => state.user.isLogged);

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

  useEffect(() => {
    if (isLogged) {
      navigate(RoutePath.Goods);
    }
  }, [isLogged, navigate]);

  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
    try {
      if (isLoginPage) {
        // Log in (sign in)
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Sign up
        await createUserWithEmailAndPassword(auth, email, password);
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
        {isLoginPage ? 'LOG IN' : 'SIGN UP'}
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

      <Stack
        flexDirection={{ md: 'row', xs: 'column' }}
        gap={3}
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        mt={5}
      >
        <Link to={isLoginPage ? RoutePath.SignUp : RoutePath.SignIn}>
          <Button>
            {isLoginPage
              ? "Don't have an account yet? Sign up!"
              : 'Already has an account? Sign in!'}
          </Button>
        </Link>
        <SignInGoogleButton />
      </Stack>
    </Stack>
  );
};

export default AuthenticationForm;
