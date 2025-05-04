'use client';
import {AppBar, Box, Button, Toolbar, useTheme} from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
// import imageTitle from './images/Image.png';
import imageLogo from './images/imageLogo.png';

export default function Headers() {
	const [activeItem, setActiveItem] = React.useState('Home'); // Default active item
	const [,setMobileMenuOpen] = React.useState(false); // State for mobile menu
	// const { mode, toggleTheme, isHydrated, logo } = useTheme();
	const { logo } = useTheme();
	const router = useRouter();

	const handleNavItemClick = (item: string) => {
		setActiveItem(item);
		setMobileMenuOpen(false); // Close mobile menu when an item is clicked

		// Navigate to the appropriate route based on the clicked item
		if (item === 'Skills') {
			router.push('/');
		}
		if (item === 'Project') {
			router.push('/projects');
		}
	};

	const navItems = ['Services', 'Advantages', 'Skills', 'Cases', 'Project', 'Contact'];

	// Use a consistent icon for server rendering and initial client render
	// Only switch based on theme after client-side hydration is complete and safe
	// const themeIcon = !isHydrated || mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />;
	// const tooltipTitle = !isHydrated || mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode';

	return (
		<React.Fragment>
			<Box sx={{ display: 'flex' }}>
			<AppBar component='nav'>
			<Toolbar>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Image
							src={imageLogo.src}
							// src={logo.logoPath}
							alt={logo.logoAlt ?? 'IT CODER'}
							className="header-logo"
							width={logo.logoWidth}
							height={logo.logoHeight}
						/>
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
					{/*<Tooltip title={tooltipTitle}>*/}
					{/*	<IconButton onClick={toggleTheme} color="inherit">*/}
					{/*		{themeIcon}*/}
					{/*	</IconButton>*/}
					{/*</Tooltip>*/}
				</Box>
			</Toolbar>
			</AppBar>
			</Box>
		</React.Fragment>
	)
}
