import { Box, Container } from '@mui/material';
import { MedicalForm } from 'src/modules/MedicalForm';

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <MedicalForm />
      </Box>
    </Container>
  );
};

export default HomePage;
