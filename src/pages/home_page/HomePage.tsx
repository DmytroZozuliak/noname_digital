import { Box, Stack, Typography } from '@mui/material';
import picture from '../../assets/images/2.png';
import { useTranslation } from 'react-i18next';
import ErrorBoundary from '../../components/ErrorBoundary';
import { mockFormData } from '../../utils/constants/auth';
import { developer } from '../../utils/constants/developer';
import Link from '@mui/material/Link';

const Home = () => {
  const { t } = useTranslation();
  const { password, username } = mockFormData;

  return (
    <ErrorBoundary text={t('errors.default')}>
      <Stack marginTop={3}>
        <Typography variant="h3" fontSize={{ xs: 30, sm: 40, md: 50 }}>
          {t('welcome_page.project')}
        </Typography>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack sx={{ order: { xs: 2, md: 1 } }}>
            <Typography variant="body2" fontSize={22}>
              {t('welcome_page.about')}
            </Typography>
            <Typography color="warning.main" fontSize={22}>
              {t('forms.auth.username')} - {username}
            </Typography>
            <Typography color="warning.main" fontSize={22}>
              {t('forms.auth.password')} - {password}
            </Typography>
          </Stack>
          <Box width={{ xs: '100%', md: '700px' }} sx={{ order: { xs: 1, md: 2 } }}>
            <img style={{ width: '100%' }} src={picture} alt="main_picture" />
          </Box>
        </Stack>
        <Typography mt={3} variant="body1">
          {t('welcome_page.repository')}
          <Link
            href={developer.currentTaskRepository}
            target="_blank"
            rel="noreferrer"
            underline="none"
          >
            {t('welcome_page.repository_name')}
          </Link>
        </Typography>
        <Typography mt={2} variant="body1">
          {t('welcome_page.cv')}
          <Link href={developer.cv} target="_blank" rel="noreferrer" underline="none">
            {t('welcome_page.cv_name')}
          </Link>
        </Typography>
      </Stack>
    </ErrorBoundary>
  );
};

export default Home;
