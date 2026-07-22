'use client';

import React from 'react';
import { Box, Button } from '@mui/material';
import { palette } from '../../theme/tokens';

interface DesktopNavProps {
    navItems: string[];
    isHome: boolean;
    isBlog: boolean;
    activeItem: string;
    handleNavItemClick: (item: string, event?: React.MouseEvent) => void;
}

export default function DesktopNav({ 
    navItems, 
    isHome, 
    isBlog, 
    activeItem, 
    handleNavItemClick 
}: DesktopNavProps) {
    return (
        <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
            {navItems.map((item) => (
                <Button
                    key={item}
                    className={`header-nav-button ${isHome && activeItem === item ? 'active' : ''}`}
                    onClick={(e) => handleNavItemClick(item, e)}
                    href={`/#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    sx={{
                        marginLeft: '1rem',
                        color: isHome && activeItem === item ? palette.brand[500] : palette.slate[600],
                        fontWeight: isHome && activeItem === item ? 600 : 400,
                        borderBottom: isHome && activeItem === item ? `2px solid ${palette.brand[500]}` : '2px solid transparent',
                        borderRadius: 0,
                        fontSize: '0.9rem',
                        letterSpacing: '0.01em',
                        '&:hover': { color: palette.slate[800], backgroundColor: 'transparent' },
                    }}
                    component="a"
                >
                    {item}
                </Button>
            ))}
            <Button
                className={`header-nav-button ${isBlog ? 'active' : ''}`}
                component="a"
                href="/blog"
                sx={{
                    marginLeft: '1rem',
                    color: isBlog ? palette.brand[500] : palette.slate[600],
                    fontWeight: isBlog ? 600 : 400,
                    borderBottom: isBlog ? `2px solid ${palette.brand[500]}` : '2px solid transparent',
                    borderRadius: 0,
                    fontSize: '0.9rem',
                    letterSpacing: '0.01em',
                    '&:hover': { color: palette.slate[800], backgroundColor: 'transparent' },
                }}
            >
                Blog
            </Button>
        </Box>
    );
}
