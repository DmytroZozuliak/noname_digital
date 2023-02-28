import { Container, Link, Stack, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { developer } from '../../../utils/constants/developer';

const Footer = () => {
  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <Container
      maxWidth={false}
      component="footer"
      sx={{ backgroundColor: 'primary.main', paddingY: { xs: 1, md: 2 } }}
    >
      <Container maxWidth="xl">
        <Stack
          justifyContent="space-between"
          alignItems="center"
          sx={{ height: '100%' }}
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, md: 2 }}
        >
          <Link href={developer.github} rel="noreferrer" target="_blank" underline="none">
            <Stack direction="row" spacing={2} alignItems="center">
              <GitHubIcon
                sx={{
                  width: '30px',
                  height: '30px',
                  color: (theme) => theme.typography.body1.color,
                }}
              />
              <Typography fontSize={{ xs: 18, md: 20 }} lineHeight={{ xs: 1.2, md: 1.5 }}>
                {developer.name}
              </Typography>
            </Stack>
          </Link>
          <Typography fontSize={{ xs: 18, md: 20 }} fontWeight={600} color="inherit">
            {currentYear}
          </Typography>
        </Stack>
      </Container>
    </Container>
  );
};

export default Footer;
