'use client';
import {AppBar, Box, Button, IconButton, Toolbar, Typography, Tooltip} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import React from 'react';
import { useTheme } from '@/app/ThemeContext';

export default function Headers() {
	const [, setMobileOpen] = React.useState(false);
	const [activeItem, setActiveItem] = React.useState('Home'); // Default active item
	const { mode, toggleTheme } = useTheme();

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const handleNavItemClick = (item: string) => {
		setActiveItem(item);
	};

	const navItems = ['Home', 'Project', 'Contact'];

	return (
		<React.Fragment>
		<AppBar component="nav">
			<Toolbar>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className="header-menu-button"
					>
					<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						className="header-title"
					>
						ITCODER
					</Typography>
				</Box>

				<Box className="header-nav-box">
					{navItems.map((item) => (
						<Button 
							key={item} 
							className={`header-nav-button ${activeItem === item ? 'active' : ''}`}
							onClick={() => handleNavItemClick(item)}
						>
							{item}
						</Button>
					))}
				</Box>

				<Box>
					<Tooltip title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
						<IconButton onClick={toggleTheme} color="inherit">
							{mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
						</IconButton>
					</Tooltip>
				</Box>
			</Toolbar>
		</AppBar>
		</React.Fragment>
	)
}
