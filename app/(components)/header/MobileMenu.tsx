'use client';

import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import { palette } from '../../theme/tokens';

interface MobileMenuProps {
    anchorEl: null | HTMLElement;
    open: boolean;
    onClose: () => void;
    navItems: string[];
    activeItem: string;
    isHome: boolean;
    isBlog: boolean;
    handleNavItemClick: (item: string, event?: React.MouseEvent) => void;
    themeMode: 'light' | 'dark';
}

export default function MobileMenu({
    anchorEl,
    open,
    onClose,
    navItems,
    activeItem,
    isHome,
    isBlog,
    handleNavItemClick,
    themeMode
}: MobileMenuProps) {
    return (
        <Menu
            id="mobile-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            className="mobile-menu"
            sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}
            PaperProps={{
                style: {
                    width: '100%',
                    maxWidth: '300px',
                    backgroundColor: themeMode === 'light' ? palette.bg.default : palette.dark.surface,
                    color: themeMode === 'light' ? palette.slate[800] : palette.dark.text,
                },
            }}
        >
            {navItems.map((item) => (
                <MenuItem
                    key={item}
                    component="a"
                    href={`/#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={(e) => handleNavItemClick(item, e)}
                    selected={isHome && activeItem === item}
                    sx={{ color: isHome && activeItem === item ? palette.brand[500] : palette.slate[600] }}
                >
                    {item}
                </MenuItem>
            ))}
            <MenuItem
                component="a"
                href="/blog"
                onClick={onClose}
                sx={{ color: isBlog ? palette.brand[500] : palette.slate[600] }}
            >
                Blog
            </MenuItem>
        </Menu>
    );
}
