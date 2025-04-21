import { createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

const getDesignTokens = (mode: PaletteMode) => ({
  typography: {
    fontFamily: 'Geist, Roboto, sans-serif',
  },
  components: {
    MuiBox: {
      variants: [
        {
          props: { className: 'header-nav-box' },
          style: {
            display: 'flex',
            justifyContent: 'center',
            flexGrow: 1,
            flexWrap: 'nowrap',
            overflow: 'auto'
          },
        },
      ],
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          display: 'flex',
          justifyContent: 'space-between',
        },
      },
    },
  },
});

// Light theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#F3F4F6',
    },
    primary: {
      main: '#1E3A8A',
    },
    secondary: {
      main: '#F97316',
    },
  },
  ...getDesignTokens('light'),
  components: {
    ...getDesignTokens('light').components,
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#F3F4F6',
          color: '#000000'
        },
      },
    },
    MuiIconButton: {
      variants: [
        {
          props: { className: 'header-menu-button' },
          style: {
            color: '#000000',
            marginRight: 2,
          }
        },
      ],
    },
    MuiTypography: {
      variants: [
        {
          props: { className: 'header-title' },
          style: {
            color: '#000000',
            marginLeft: '1rem'
          },
        },
      ],
    },
    MuiButton: {
      variants: [
        {
          props: { className: 'header-nav-button' },
          style: {
            alignItems: 'center',
            color: '#000000',
            padding: { xs: '6px 8px', sm: '8px 11px' },
            fontSize: { xs: '0.8rem', sm: '0.875rem' },
          },
        },
        {
          props: { className: 'header-nav-button active' },
          style: {
            alignItems: 'center',
            color: '#000000',
            borderBottom: '2px solid #F97316',
            borderLeft: 'none',
            borderRight: 'none',
            borderTop: 'none',
            width: 'auto',
          },
        },
      ],
    },
  },
});

// Dark theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
    },
    primary: {
      main: '#90CAF9',
    },
    secondary: {
      main: '#F97316',
    },
  },
  ...getDesignTokens('dark'),
  components: {
    ...getDesignTokens('dark').components,
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#121212',
          color: '#FFFFFF'
        },
      },
    },
    MuiIconButton: {
      variants: [
        {
          props: { className: 'header-menu-button' },
          style: {
            color: '#FFFFFF',
            marginRight: 2
          },
        },
      ],
    },
    MuiTypography: {
      variants: [
        {
          props: { className: 'header-title' },
          style: {
            color: '#FFFFFF',
            marginLeft: '1rem',
            display: { xs:'none', sm: 'block' },
          },
        },
      ],
    },
    MuiButton: {
      variants: [
        {
          props: { className: 'header-nav-button' },
          style: {
            color: '#FFFFFF',
            padding: { xs: '6px 8px', sm: '8px 11px' },
            fontSize: { xs: '0.8rem', sm: '0.875rem' },
          },
        },
        {
          props: { className: 'header-nav-button active' },
          style: {
            color: '#FFFFFF',
            borderBottom: '2px solid #F97316',
            borderLeft: 'none',
            borderRight: 'none',
            borderTop: 'none',
            width: 'auto',
          },
        },
      ],
    },
  },
});

// Default theme (for backward compatibility)
export const theme = lightTheme;
