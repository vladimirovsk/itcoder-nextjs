"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { PaletteMode } from '@mui/material';

type ThemeContextType = {
  mode: PaletteMode;
  toggleTheme: () => void;
  isClient: boolean;
  isHydrated: boolean;
};

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleTheme: () => {},
  isClient: false,
  isHydrated: false
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Always start with light theme for server rendering
  const [mode, setMode] = useState<PaletteMode>('light');
  const [isClient, setIsClient] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const initialRenderComplete = useRef(false);

  // First useEffect: Mark that we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Second useEffect: Handle theme loading from localStorage
  // This runs after hydration is complete
  useEffect(() => {
    // Mark that hydration is complete immediately on client
    setIsHydrated(true);

    // Skip on first render to avoid hydration mismatch
    if (!initialRenderComplete.current) {
      initialRenderComplete.current = true;
      return;
    }

    // Now it's safe to load from localStorage and update state
    const storedTheme = localStorage.getItem('theme-mode');
    if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
      setMode(storedTheme);
    }
  }, [isClient]);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    if (isClient) {
      localStorage.setItem('theme-mode', newMode);
    }
  };

  // Always use the same mode for both server and client initial render
  const contextValue = {
    mode,
    toggleTheme,
    isClient,
    isHydrated,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
