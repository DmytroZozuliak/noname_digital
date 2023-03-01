import { Stack, Typography } from '@mui/material';
import ErrorBoundary from '../../components/ErrorBoundary';
import { useTypedSelector } from '../../hooks/redux';

const Profile = () => {
  const email = useTypedSelector((state) => state.user.email);

  return (
    <ErrorBoundary text="Something went wrong. Try to reload the page">
      <Stack
        position="relative"
        my="20px"
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Typography variant="h6" align="center" fontSize={{ xs: 26, md: 34 }}>
          You entered as {email}
        </Typography>
      </Stack>
    </ErrorBoundary>
  );
};

export default Profile;
