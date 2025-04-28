'use client';
import {AppBar, Box, Button, IconButton, Toolbar, Tooltip} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import React from 'react';
import { useTheme } from '@/app/ThemeContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import imageTitle from './images/Image.png';
import imageLogo from './images/imageLogo.png';

export default function Headers() {
	const [activeItem, setActiveItem] = React.useState('Home'); // Default active item
	const [,setMobileMenuOpen] = React.useState(false); // State for mobile menu
	const { mode, toggleTheme, isHydrated, logo } = useTheme();
	const router = useRouter();

	const handleNavItemClick = (item: string) => {
		setActiveItem(item);
		setMobileMenuOpen(false); // Close mobile menu when an item is clicked

		// Navigate to the appropriate route based on the clicked item
		if (item === 'Home') {
			router.push('/');
		}
		if (item === 'Project') {
			router.push('/projects');
		}
	};

	const navItems = ['Services', 'Advantages', 'Skills', 'Cases', 'Project', 'Contact'];

	// Use a consistent icon for server rendering and initial client render
	// Only switch based on theme after client-side hydration is complete and safe
	const themeIcon = !isHydrated || mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />;
	const tooltipTitle = !isHydrated || mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode';

	return (
		<React.Fragment>
		<AppBar component="nav">
			<Toolbar>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Image
							src={imageLogo.src}
							// src={logo.logoPath}
							alt={logo.logoAlt} 
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
					<Tooltip title={tooltipTitle}>
						<IconButton onClick={toggleTheme} color="inherit">
							{themeIcon}
						</IconButton>
					</Tooltip>
				</Box>
			</Toolbar>
		</AppBar>
		<Box sx={{ 
			width: '100%', 
			overflow: 'hidden',
			margin: 0,
			padding: 0,
			position: 'relative'
		}}>
			<Box className='HomeHeader' style={{
				backgroundImage: `url(${imageTitle.src})`,
				backgroundPosition: 'center',
				backgroundSize: '100% auto', /* Make image stretch to width while maintaining height */
				backgroundRepeat: 'no-repeat',
				backgroundOrigin: "initial",
				backgroundClip: "initial",
				backgroundColor: "white",
				height: '540px',
				width: '100vw',
				padding: 0,
				maxWidth: 'none', /* Override any max-width constraints */
				left: 0,
				right: 0,
				position: 'relative',
				boxSizing: 'border-box',
				overflow: 'hidden',
				display: 'flex',
				flexDirection: 'column', /* Changed to column layout to position elements vertically */
				justifyContent: 'center',
				alignItems: 'center'
			}}>
				<Box sx={{
					marginTop: '30px',
					width: '1288px',
					height: '120px', /* Increased height to accommodate two lines */
					fontFamily: 'Inter',
					fontStyle: 'normal',
					fontWeight: 800,
					fontSize: '60px',
					lineHeight: '60px',
					textAlign: 'center',
					letterSpacing: '-0.025em',
					color: '#F2F4FF',
					innerShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',
					display: 'flex',
					flexDirection: 'column', /* Changed to column layout */
					justifyContent: 'center',
					alignItems: 'center',
					margin: '0 auto'
				}}>
					<div>Make your business with the help of</div>
					<div>individual IT solutions</div>
				</Box>
				{/* Supporting text */}
				<Box sx={{
					width: '768px',
					height: '84px',
					fontFamily: 'Inter',
					fontStyle: 'normal',
					fontWeight: 400,
					fontSize: '24px',
					lineHeight: '28px',
					textAlign: 'center',
					innerShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',
					color: '#F2F4FF',
					flex: 'none',
					order: 0,
					flexGrow: 0,
					marginTop: '20px' /* Added margin to separate from the title */
				}}>
					I develop reliable, scalable and efficient web products that solve real-world problems. From idea to release, turnkey
				</Box>
				{/* Button below the supporting text */}
				<Box>
				<Button
					variant="outlined"
					color="secondary"
					sx={{
						marginTop: '30px',
						fontSize: '18px',
						fontWeight: 600,
						textTransform: 'none',
						boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
						backgroundColor: '#FFFFFF',
						width: '200px',
					}}
				>
					Get Started
				</Button>
				</Box>
			</Box>
		</Box>
		</React.Fragment>
	)
}
