import { Container, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import AuthenticationForm from '../../components/Authentication/AuthenticationForm';
import SignInGoogleButton from '../../components/Authentication/SignInGoogleButton';
import ErrorBoundary from '../../components/ErrorBoundary';
import { useTypedSelector } from '../../hooks/redux';
import { RoutePath } from '../../utils/constants/routes';

const SignUpPage = () => {
  const isLogged = useTypedSelector((state) => state.user.isLogged);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (isLogged) {
      navigate(RoutePath.Goods);
    }
  }, [isLogged, navigate]);

  return (
    <ErrorBoundary text={t('errors.default')}>
      <Container maxWidth="sm" sx={{ marginTop: 5 }}>
        <AuthenticationForm />
      </Container>
    </ErrorBoundary>
  );
};

export default SignUpPage;
