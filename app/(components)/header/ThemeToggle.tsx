'use client';

import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface ThemeToggleProps {
    mode: 'light' | 'dark';
    isHydrated: boolean;
    toggleTheme: () => void;
}

export default function ThemeToggle({ mode, isHydrated, toggleTheme }: ThemeToggleProps) {
    const themeIcon = !isHydrated || mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />;
    const tooltipTitle = !isHydrated || mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode';

    return (
        <Tooltip title={tooltipTitle}>
            <IconButton onClick={toggleTheme} aria-label={tooltipTitle}>
                {themeIcon}
            </IconButton>
        </Tooltip>
    );
}
