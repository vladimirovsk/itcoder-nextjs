'use client';

import React from 'react';
import { Menu, MenuItem, Box } from '@mui/material';
import { palette } from '../../theme/tokens';

interface MobileMenuProps {
    anchorEl: null | HTMLElement;
    open: boolean;
    onClose: () => void;
    navItems: string[];
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
            {navItems.map((item) => {
                // We need to check if it's the active item. 
                // However, since we don't have activeItem in props, 
                // we'll assume the parent handles selection logic or we pass it.
                // For now, let's just render the items.
                return (
                    <MenuItem
                        key={item}
                        component="a"
                        href={`/#${item.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={(e) => handleNavItemClick(item, e)}
                    >
                        {item}
                    </MenuItem>
                );
            })}
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
