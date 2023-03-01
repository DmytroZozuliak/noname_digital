import { Container } from '@mui/material';
import AuthenticationForm from '../../components/Authentication/AuthenticationForm';
import ErrorBoundary from '../../components/ErrorBoundary';

const SignInPage = () => {
  return (
    <ErrorBoundary text="Something went wrong. Try to reload the page">
      <Container maxWidth="sm" sx={{ marginTop: 5 }}>
        <AuthenticationForm isLoginPage={true} />
      </Container>
    </ErrorBoundary>
  );
};

export default SignInPage;
