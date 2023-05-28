import { Box, styled } from '@mui/material';

const CustomScrollContainer = styled(Box)(() => ({
  position: 'relative',
  overflow: 'auto',
  maxWidth: '550px',
  width: '100%',
  maxHeight: '550px',
  scrollbarWidth: 'thin',
  '&::-webkit-scrollbar': {
    width: '0.4em',
  },
  '&::-webkit-scrollbar-track': {
    background: '#323c41',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555',
  },
}));

export default CustomScrollContainer;
