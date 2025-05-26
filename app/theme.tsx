"use client";

import { createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

// Common design tokens and responsive breakpoints
const getDesignTokens = (mode: PaletteMode) => ({
  typography: {
    fontFamily: 'Geist, Roboto, sans-serif',
    // Responsive font sizes
  },
  components: {
    // CardContent styling
    MuiCardContent: {
      styleOverrides: {
        root: {
          backgroundColor: '#F2F4FF',
        },
      },
    },
    // CardActions styling
    MuiCardActions: {
      styleOverrides: {
        root: {
          backgroundColor: '#F2F4FF',
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          // Common grid styles
        },
      },
      variants: [
        {
          props: { className: 'grid-container' },
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '24px',
            width: '100%',
            '@media (max-width:1200px)': {
              gridTemplateColumns: 'repeat(8, 1fr)',
              gap: '16px',
            },
            '@media (max-width:900px)': {
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '16px',
            },
            '@media (max-width:600px)': {
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '8px',
            },
          },
        },
        {
          props: { className: 'grid-item-full' },
          style: {
            gridColumn: 'span 12',
            '@media (max-width:1200px)': {
              gridColumn: 'span 8',
            },
            '@media (max-width:900px)': {
              gridColumn: 'span 6',
            },
            '@media (max-width:600px)': {
              gridColumn: 'span 4',
            },
          },
        },
        {
          props: { className: 'grid-item-half' },
          style: {
            gridColumn: 'span 6',
            '@media (max-width:900px)': {
              gridColumn: 'span 6',
            },
            '@media (max-width:600px)': {
              gridColumn: 'span 4',
            },
          },
        },
        {
          props: { className: 'grid-item-third' },
          style: {
            gridColumn: 'span 4',
            '@media (max-width:900px)': {
              gridColumn: 'span 3',
            },
            '@media (max-width:600px)': {
              gridColumn: 'span 4',
            },
          },
        },
        {
          props: { className: 'grid-item-quarter' },
          style: {
            gridColumn: 'span 3',
            '@media (max-width:900px)': {
              gridColumn: 'span 3',
            },
            '@media (max-width:600px)': {
              gridColumn: 'span 2',
            },
          },
        },
        {
          props: { className: 'grid-container-2-cols' },
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
            width: '100%',
            '@media (max-width:600px)': {
              gridTemplateColumns: '1fr',
              gap: '16px',
            },
          },
        },
        {
          props: { className: 'grid-container-3-cols' },
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            width: '100%',
            '@media (max-width:900px)': {
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
            },
            '@media (max-width:600px)': {
              gridTemplateColumns: '1fr',
              gap: '16px',
            },
          },
        },
        {
          props: { className: 'grid-container-4-cols' },
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            width: '100%',
            '@media (max-width:1200px)': {
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
            },
            '@media (max-width:900px)': {
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
            },
            '@media (max-width:600px)': {
              gridTemplateColumns: '1fr',
              gap: '8px',
            },
          },
        },
        {
          props: { className: 'grid-container-auto-fill' },
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '24px',
            width: '100%',
            '@media (max-width:600px)': {
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '16px',
            },
          },
        },
        {
          props: { className: 'grid-container-cards' },
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '32px',
            width: '100%',
            '@media (max-width:600px)': {
              gridTemplateColumns: '1fr',
              gap: '24px',
            },
          },
        },
        // Grid alignment variants
        {
          props: { className: 'grid-align-center' },
          style: {
            alignItems: 'center',
            justifyItems: 'center',
          },
        },
        {
          props: { className: 'grid-align-start' },
          style: {
            alignItems: 'start',
            justifyItems: 'start',
          },
        },
        {
          props: { className: 'grid-align-end' },
          style: {
            alignItems: 'end',
            justifyItems: 'end',
          },
        },
        {
          props: { className: 'grid-align-stretch' },
          style: {
            alignItems: 'stretch',
            justifyItems: 'stretch',
          },
        },
        // Grid spacing variants
        {
          props: { className: 'grid-gap-small' },
          style: {
            gap: '8px',
          },
        },
        {
          props: { className: 'grid-gap-medium' },
          style: {
            gap: '16px',
          },
        },
        {
          props: { className: 'grid-gap-large' },
          style: {
            gap: '32px',
          },
        },
        // Grid area templates for common layouts
        {
          props: { className: 'grid-layout-sidebar' },
          style: {
            display: 'grid',
            gridTemplateColumns: '250px 1fr',
            gridTemplateAreas: '"sidebar main"',
            gap: '24px',
            width: '100%',
            '@media (max-width:900px)': {
              gridTemplateColumns: '1fr',
              gridTemplateAreas: '"sidebar" "main"',
              gap: '16px',
            },
          },
        },
        {
          props: { className: 'grid-layout-header-content-footer' },
          style: {
            display: 'grid',
            gridTemplateRows: 'auto 1fr auto',
            gridTemplateAreas: '"header" "content" "footer"',
            minHeight: '100vh',
            gap: '24px',
            width: '100%',
          },
        },
      ],
    },
    // Layout container styles (moved from layout.tsx)
    MuiContainer: {
      styleOverrides: {
        root: {
          marginTop: '20px', // Reduced space below the fixed AppBar
          paddingBottom: '60px', // Add padding to prevent content from being hidden behind the fixed footer
          // Other container styles
          // paddingTop: '1rem',
          // paddingLeft: '1rem',
          // paddingRight: '1rem',
          // minHeight: '100vh',
          // display: 'flex',
          // flexDirection: 'column',
          // width: '100%',
          // boxSizing: 'border-box',
          // overflowX: 'hidden',
        },
      },
      variants: [
        {
          props: { className: 'containerPage' },
          style: {
            paddingBottom: '60px', // Add padding to prevent content from being hidden behind the fixed footer
          },
        },
      ],
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
          props: { className: 'footer' },
          style: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            textAlign: 'center',
            padding: '10px 0',
            backgroundColor: mode === 'light' ? '#f5f5f5' : '#333',
            borderTop: `1px solid ${mode === 'light' ? '#e0e0e0' : '#444'}`,
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
        },
        {
          props: { className: 'header-nav-box' },
          style: {
            display: 'flex',
            justifyContent: 'center',
            flexGrow: 1,
            flexWrap: 'nowrap',
            overflow: 'auto',
            '@media (max-width:900px)': {
              display: 'none',
            },
          },
        },
        {
          props: { className: 'mobile-menu' },
          style: {
            display: 'none', // Hidden by default
            '@media (max-width:900px)': {
              display: 'flex', // Show on mobile
              flexDirection: 'column',
              width: '100%',
            },
          },
        },
        {
          props: { className: 'mobile-menu-button' },
          style: {
            display: 'none', // Hidden by default
            '@media (max-width:900px)': {
              display: 'flex', // Show on mobile
            },
          },
        },
        {
          props: { className: 'HomeHeader' },
          style: {
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
        {
          props: { className: 'header-title-box' },
          style: {
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
        {
          props: { className: 'header-subtitle-box' },
          style: {
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
            marginTop: '20px',
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
              marginLeft: '1rem'
            },
          },
        },
        {
          props: { className: 'titlePage' },
          style: {
            fontWeight: 'bold',
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
            alignItems: 'center',
            color: mode === 'light' ? '#000000' : '#FFFFFF',
          },
        },
        {
          props: { className: 'header-nav-button active' },
          style: {
            alignItems: 'center',
            color: mode === 'light' ? '#000000' : '#FFFFFF',
            borderBottom: '2px solid #F97316',
            borderLeft: 'none',
            borderRight: 'none',
            borderTop: 'none',
            width: 'auto',
            '@media (max-width:600px)': {
              width: '100%',
              justifyContent: 'center',
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
  ...getDesignTokens('dark'),
});

// Default theme (for backward compatibility)
export const theme = lightTheme;
