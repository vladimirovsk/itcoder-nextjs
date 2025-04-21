"use client";

import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeContextProvider, useTheme } from './ThemeContext';

// Inner component that uses the theme context
function ThemedContent({ children }: { children: React.ReactNode }) {
  const { mode } = useTheme();
  const currentTheme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

// Main wrapper that provides the theme context
export default function ThemeProviderWrapper({ children }: {
  children: React.ReactNode;
}) {
  return (
    <ThemeContextProvider>
      <ThemedContent>
        {children}
      </ThemedContent>
    </ThemeContextProvider>
  );
}
