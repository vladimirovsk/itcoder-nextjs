"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PaletteMode } from '@mui/material';

type ThemeContextType = {
  mode: PaletteMode;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize theme from localStorage if available, otherwise default to 'light'
  const [mode, setMode] = useState<PaletteMode>('light');

  // Load theme preference from localStorage on initial render
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme-mode');
    if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
      setMode(storedTheme);
    }
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme-mode', newMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
