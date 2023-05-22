import {
  createTheme,
  TypographyVariantsOptions,
  PaletteOptions,
  Components,
  Theme,
} from '@mui/material';
import { BreakpointsOptions } from '@mui/material/styles';

const typography: TypographyVariantsOptions = {
  fontFamily: 'Roboto',
};

const palette: PaletteOptions = {
  mode: 'dark',
  background: {
    default: '#222b36',
    paper: '#222b36',
  },
};

const breakpoints: BreakpointsOptions = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};

const components: Components<Omit<Theme, 'components'>> = {
  MuiCssBaseline: {
    styleOverrides: {
      '*': {
        boxSizing: 'border-box',
      },
      html: {
        height: '100%',
        width: '100%',
      },
      body: {
        height: '100%',
      },
      '#root': {
        height: '100%',
      },
    },
  },
};

const theme = createTheme({
  typography,
  palette,
  components,
  breakpoints,
});

export default theme;
