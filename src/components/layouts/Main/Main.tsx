import { Container } from '@mui/material';
import Modal from '../../Modal';
import SnackPopup from '../../SnackPopup';

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Container maxWidth={false} component="main" sx={{ flex: '1 1 auto' }}>
      <Container maxWidth="xl">{children}</Container>
      <SnackPopup />
      <Modal />
    </Container>
  );
};

export default Main;
