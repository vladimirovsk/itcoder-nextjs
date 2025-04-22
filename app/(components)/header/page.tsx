'use client';
import {AppBar, Box, Button, IconButton, Toolbar, Typography, Tooltip} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import React from 'react';
import { useTheme } from '@/app/ThemeContext';
import { useRouter } from 'next/navigation';

export default function Headers() {
	const [, setMobileOpen] = React.useState(false);
	const [activeItem, setActiveItem] = React.useState('Home'); // Default active item
	const { mode, toggleTheme, isHydrated } = useTheme();
	const router = useRouter();

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const handleNavItemClick = (item: string) => {
		setActiveItem(item);

		// Navigate to the appropriate route based on the clicked item
		if (item === 'Home') {
			router.push('/');
		}
		if (item === 'Project') {
			router.push('/projects');
		}
	};

	const navItems = ['Home', 'Project', 'Contact'];

	// Use a consistent icon for server rendering and initial client render
	// Only switch based on theme after client-side hydration is complete and safe
	const themeIcon = !isHydrated || mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />;
	const tooltipTitle = !isHydrated || mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode';

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
						{process.env.NEXT_PUBLIC_NEXT_TITLE}
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
					<Tooltip title={tooltipTitle}>
						<IconButton onClick={toggleTheme} color="inherit">
							{themeIcon}
						</IconButton>
					</Tooltip>
				</Box>
			</Toolbar>
		</AppBar>
		</React.Fragment>
	)
}
