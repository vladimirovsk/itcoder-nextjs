"use client";

import { createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import imageLogo from './(components)/header/images/imageLogo.png';

// Logo configuration for themes
export interface ThemeLogoConfig {
  logoPath: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
}

declare module '@mui/material/styles' {
  interface Theme {
    logo?: ThemeLogoConfig;
  }
  interface ThemeOptions {
    logo?: ThemeLogoConfig;
  }
}

// Common design tokens and responsive breakpoints
const getDesignTokens = (mode: PaletteMode) => ({
  typography: {
    fontFamily: 'Geist, Roboto, sans-serif',
    // Responsive font sizes
    h1: {
      fontSize: '2.5rem',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontSize: '2rem',
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    h3: {
      fontSize: '1.75rem',
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    body1: {
      fontSize: '1rem',
      '@media (max-width:600px)': {
        fontSize: '0.875rem',
      },
    },
  },
  components: {
    // Layout container styles (moved from layout.tsx)
    MuiContainer: {
      styleOverrides: {
        root: {
          variants: {
            paddingTop: 'calc(64px + 2rem)',
            paddingBottom: 'calc(64px + 2rem)',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            boxSizing: 'border-box',
            overflowX: 'hidden',
            '@media (max-width:600px)': {
              paddingTop: 'calc(56px + 1rem)', // Smaller padding on mobile
              paddingBottom: 'calc(56px + 1rem)',
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
            },
          },
        },
      },
    },
    // Header styles
    MuiBox: {
      styleOverrides: {
        root: {
          // Common box styles can go here
        },
      },
      variants: [
        {
          props: { className: 'header-nav-box' },
          style: {
            variants: {
              display: 'flex',
              justifyContent: 'center',
              flexGrow: 1,
              flexWrap: 'nowrap',
              overflow: 'auto',
              '@media (max-width:900px)': {
                display: 'none', // Hide on mobile, will be replaced by mobile menu
              },
            },
          },
        },
        {
          props: { className: 'mobile-menu' },
          style: {
            variants: {
              display: 'none', // Hidden by default
              '@media (max-width:900px)': {
                display: 'flex', // Show on mobile
                flexDirection: 'column',
                width: '100%',
              },
            },
          },
        },
        {
          props: { className: 'mobile-menu-button' },
          style: {
            variants: {
              display: 'none', // Hidden by default
              '@media (max-width:900px)': {
                display: 'flex', // Show on mobile
              },
            },
          },
        },
        {
          props: { className: 'HomeHeader' },
          style: {
            variants: {
              backgroundPosition: 'center',
              backgroundSize: 'cover', // Changed from 100% auto to cover for better mobile display
              backgroundRepeat: 'no-repeat',
              backgroundOrigin: 'initial',
              backgroundClip: 'initial',
              backgroundColor: mode === 'light' ? 'white' : '#121212',
              height: '546px',
              width: '100vw',
              padding: 0,
              maxWidth: 'none',
              left: 0,
              right: 0,
              position: 'relative',
              boxSizing: 'border-box',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              '@media (max-width:900px)': {
                height: '400px', // Smaller height on mobile
              },
              '@media (max-width:600px)': {
                height: '300px', // Even smaller on very small screens
              },
            },
          },
        },
        {
          props: { className: 'header-title-box' },
          style: {
            variants: {
              width: '100%',
              maxWidth: '1288px',
              height: 'auto', // Changed from fixed height to auto
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 800,
              fontSize: '60px',
              lineHeight: '60px',
              textAlign: 'center',
              letterSpacing: '-0.025em',
              color: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 auto',
              padding: '0 1rem',
              '@media (max-width:900px)': {
                fontSize: '40px',
                lineHeight: '40px',
              },
              '@media (max-width:600px)': {
                fontSize: '30px',
                lineHeight: '30px',
              },
            },
          },
        },
        {
          props: { className: 'header-subtitle-box' },
          style: {
            variants: {
              width: '100%',
              maxWidth: '768px',
              height: 'auto', // Changed from fixed height to auto
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '24px',
              lineHeight: '28px',
              textAlign: 'center',
              color: '#FFFFFF',
              flex: 'none',
              order: 0,
              flexGrow: 0,
              marginTop: '30px',
              padding: '0 1rem',
              '@media (max-width:900px)': {
                fontSize: '20px',
                lineHeight: '24px',
                marginTop: '20px',
              },
              '@media (max-width:600px)': {
                fontSize: '16px',
                lineHeight: '20px',
                marginTop: '15px',
              },
            },
          },
        },
      ],
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          display: 'flex',
          justifyContent: 'space-between',
          '@media (max-width:600px)': {
            padding: '0 8px', // Less padding on mobile
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' ? '#F3F4F6' : '#121212',
          color: mode === 'light' ? '#000000' : '#FFFFFF',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          // Common icon button styles can go here
        },
      },
      variants: [
        {
          props: { className: 'header-menu-button' },
          style: {
            variants: {
              color: mode === 'light' ? '#000000' : '#FFFFFF',
              marginRight: 2,
            },
          },
        },
      ],
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          // Common typography styles can go here
        },
      },
      variants: [
        {
          props: { className: 'header-title' },
          style: {
            variants: {
              color: mode === 'light' ? '#000000' : '#FFFFFF',
              marginLeft: '1rem',
              '@media (max-width:600px)': {
                display: 'none',
              },
              '@media (min-width:601px)': {
                display: 'block',
              },
            },
          },
        },
      ],
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // Common button styles can go here
        },
      },
      variants: [
        {
          props: { className: 'header-nav-button' },
          style: {
            variants: {
              alignItems: 'center',
              color: mode === 'light' ? '#000000' : '#FFFFFF',
              '@media (max-width:600px)': {
                padding: '6px 8px',
                fontSize: '0.8rem',
                width: '100%', // Full width in mobile menu
                justifyContent: 'center',
              },
              '@media (min-width:601px)': {
                padding: '8px 11px',
                fontSize: '0.875rem',
              },
            },
          },
        },
        {
          props: { className: 'header-nav-button active' },
          style: {
            variants: {
              alignItems: 'center',
              color: mode === 'light' ? '#000000' : '#FFFFFF',
              borderBottom: '2px solid #F97316',
              borderLeft: 'none',
              borderRight: 'none',
              borderTop: 'none',
              width: 'auto',
              '@media (max-width:600px)': {
                width: '100%', // Full width in mobile menu
                justifyContent: 'center',
              },
            },
          },
        },
        {
          props: { className: 'get-started-button' },
          style: {
            variants: {
              marginTop: '30px',
              fontSize: '18px',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
              backgroundColor: '#FFFFFF',
              color: mode === 'light' ? '#000000' : '#1E3A8A',
              width: '200px',
              '@media (max-width:600px)': {
                marginTop: '20px',
                fontSize: '16px',
                width: '180px',
              },
            },
          },
        },
      ],
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
  // Logo configuration for light theme
  logo: {
    logoPath: imageLogo.src.toString(),
    logoAlt: 'ITCODER',
    logoWidth: 100,
    logoHeight: 80,
  },
  ...getDesignTokens('light'),
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
  // Logo configuration for dark theme
  logo: {
    logoPath: imageLogo.src.toString(),
    logoAlt: 'ITCODER',
    logoWidth: 100,
    logoHeight: 80,
  },
  ...getDesignTokens('dark'),
});

// Default theme (for backward compatibility)
export const theme = lightTheme;
