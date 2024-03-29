import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';

interface IMuiWrapperProps {
  children: JSX.Element;
}

export default function MuiWrapper({
  children,
}: IMuiWrapperProps): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
