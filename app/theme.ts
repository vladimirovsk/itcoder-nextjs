import { createTheme } from '@mui/material/styles';

const getDesignTokens = () => ({
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
            overflow: 'auto',
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
  ...getDesignTokens(),
  components: {
    ...getDesignTokens().components,
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#F3F4F6',
          color: '#000000',
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
          },
        },
      ],
    },
    MuiTypography: {
      variants: [
        {
          props: { className: 'header-title' },
          style: ({ theme }) => ({
            color: '#000000',
            marginLeft: '1rem',
            [theme.breakpoints.down('xs')]: {
              display: 'none',
            },
            [theme.breakpoints.up('sm')]: {
              display: 'block',
            },
          }),
        },
      ],
    },
    MuiButton: {
      variants: [
        {
          props: { className: 'header-nav-button' },
          style: ({ theme }) => ({
            alignItems: 'center',
            color: '#000000',
            [theme.breakpoints.down('xs')]: {
              padding: '6px 8px',
              fontSize: '0.8rem',
            },
            [theme.breakpoints.up('sm')]: {
              padding: '8px 11px',
              fontSize: '0.875rem',
            },
          }),
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
  ...getDesignTokens(),
  components: {
    ...getDesignTokens().components,
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#121212',
          color: '#FFFFFF',
        },
      },
    },
    MuiIconButton: {
      variants: [
        {
          props: { className: 'header-menu-button' },
          style: {
            color: '#FFFFFF',
            marginRight: 2,
          },
        },
      ],
    },
    MuiTypography: {
      variants: [
        {
          props: { className: 'header-title' },
          style: ({ theme }) => ({
            color: '#FFFFFF',
            marginLeft: '1rem',
            [theme.breakpoints.down('xs')]: {
              display: 'none',
            },
            [theme.breakpoints.up('sm')]: {
              display: 'block',
            },
          }),
        },
      ],
    },
    MuiButton: {
      variants: [
        {
          props: { className: 'header-nav-button' },
          style: ({ theme }) => ({
            alignItems: 'center',
            color: '#FFFFFF',
            [theme.breakpoints.down('xs')]: {
              padding: '6px 8px',
              fontSize: '0.8rem',
            },
            [theme.breakpoints.up('sm')]: {
              padding: '8px 11px',
              fontSize: '0.875rem',
            },
          }),
        },
        {
          props: { className: 'header-nav-button active' },
          style: {
            alignItems: 'center',
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
