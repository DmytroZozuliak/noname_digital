import { Box, Stack, Typography } from '@mui/material';
import picture from '../../assets/images/2.png';
import ErrorBoundary from '../../components/ErrorBoundary';
import { developer } from '../../utils/constants/developer';
import Link from '@mui/material/Link';

const Home = () => {
  return (
    <ErrorBoundary text="Something went wrong. Try to reload the page">
      <Stack marginTop={3}>
        <Typography variant="h1" fontSize={{ xs: 30, sm: 40, md: 50 }}>
          Welcome to NONAME DIGITAL
        </Typography>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack sx={{ order: { xs: 2, md: 1 } }}>
            <Typography variant="body2" fontSize={22}>
              about
            </Typography>
          </Stack>
          <Box width={{ xs: '100%', md: '700px' }} sx={{ order: { xs: 1, md: 2 } }}>
            <img style={{ width: '100%' }} src={picture} alt="main_picture" />
          </Box>
        </Stack>
        <Typography mt={3} variant="body1">
          Repository of current work:
          <Link
            href={developer.currentTaskRepository}
            target="_blank"
            rel="noreferrer"
            underline="none"
          >
            link
          </Link>
        </Typography>
        <Typography mt={2} variant="body1">
          To learn more about me you can visit my
          <Link href={developer.cv} target="_blank" rel="noreferrer" underline="none">
            CV
          </Link>
        </Typography>
      </Stack>
    </ErrorBoundary>
  );
};

export default Home;
