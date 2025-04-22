"use client";

import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeContextProvider, useTheme } from './ThemeContext';
import React from 'react';

// Inner component that uses the theme context
function ThemedContent({ children }: { children: React.ReactNode }) {
  const { mode, isHydrated } = useTheme();

  // Always use light theme for server rendering and initial client render
  // Only use the actual theme mode after client-side hydration is complete and safe to switch
  const currentTheme = !isHydrated || mode === 'light' ? lightTheme : darkTheme;

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
