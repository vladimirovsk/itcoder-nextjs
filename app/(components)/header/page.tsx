'use client';
import {AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Paper, Toolbar, Tooltip, Typography, useTheme} from '@mui/material';
import React, { useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import titleImage from '../../../public/it-coder-title.png';
import imageLogo from '../../../public/imageLogo.png';
import MenuIcon from '@mui/icons-material/Menu';

export default function Headers() {
	const [activeItem, setActiveItem] = React.useState('Home'); // Default active item
	const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [isManuallySet, setIsManuallySet] = React.useState(false); // Track if activeItem was manually set by clicking
	const scrollTimerRef = React.useRef<NodeJS.Timeout | null>(null); // Ref to store the scroll timer
	const resetTimerRef = React.useRef<NodeJS.Timeout | null>(null); // Ref to store the reset timer
	const { logo } = useTheme();
	const navItems = useMemo(() => ['Services', 'Advantages', 'Skills', 'Cases', 'Projects', 'Contact'], []);

	// Function to check which section is currently in view
	const checkActiveSection = useCallback(() => {
		// If activeItem was manually set, don't override it
		if (isManuallySet) return;

		// Get all sections
		const sections = navItems.map(item => document.getElementById(item.toLowerCase())).filter(Boolean);

		// If no sections found, return
		if (sections.length === 0) return;

		// Get the current scroll position
		const scrollPosition = window.scrollY + window.innerHeight / 3;

		// Find the section that is currently in view
		for (let i = sections.length - 1; i >= 0; i--) {
			const section = sections[i];
			if (!section) continue;

			const sectionTop = section.offsetTop;
			const sectionHeight = section.offsetHeight;

			if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
				// Found the active section
				setActiveItem(section.id.charAt(0).toUpperCase() + section.id.slice(1));
				return;
			}
		}

		// If we're at the top of the page, set Home as active
		if (scrollPosition < (sections[0]?.offsetTop || 0)) {
			setActiveItem('Home');
		}
	}, [navItems, isManuallySet]);

	// Function to handle scroll events
	const handleScroll = useCallback(() => {
		// If the user is manually scrolling and isManuallySet is true, reset it
		if (isManuallySet) {
			// Clear any existing timer
			if (scrollTimerRef.current) {
				clearTimeout(scrollTimerRef.current);
			}

			// We use a small delay to ensure the scroll is intentional
			scrollTimerRef.current = setTimeout(() => {
				setIsManuallySet(false);
				scrollTimerRef.current = null;
			}, 1000); // Reset after 1 second of scrolling
		} else {
			// Call the checkActiveSection function
			checkActiveSection();
		}
	}, [checkActiveSection, isManuallySet]);

	// Handle direct URL navigation with hash fragments
	useEffect(() => {
		// Check if there's a hash fragment in the URL
		if (typeof window !== 'undefined' && window.location.hash) {
			// Get the section ID from the hash fragment
			const sectionId = window.location.hash.substring(1); // Remove the # character
			const section = document.getElementById(sectionId);

			if (section) {
				// Set the active item
				setActiveItem(sectionId.charAt(0).toUpperCase() + sectionId.slice(1));
				setIsManuallySet(true);

				// Get the toolbar height to offset the scroll position
				const toolbar = document.querySelector('nav');
				const toolbarHeight = toolbar ? toolbar.offsetHeight : 0;

				// Wait a bit for the page to fully load
				setTimeout(() => {
					// Calculate the position to scroll to (section's top position minus toolbar height)
					const offsetPosition = section.getBoundingClientRect().top + window.pageYOffset - toolbarHeight;

					// Scroll to the calculated position
					window.scrollTo({
						top: offsetPosition,
						behavior: 'smooth'
					});
				}, 100);
			}
		}
	}, []); // Empty dependency array means this effect runs once on mount

	// Add scroll event listener
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		// Initial check
		checkActiveSection();

		// Animate the title of the active section on initial load
		setTimeout(() => {
			const activeSection = document.getElementById(activeItem.toLowerCase());
			if (activeSection) {
				const titleElement = activeSection.querySelector('.titlePage');
				if (titleElement) {
					titleElement.classList.add('animate__animated', 'animate__rubberBand');
				}
			}
		}, 300);

		// Cleanup
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [handleScroll, checkActiveSection, activeItem]);

	// Reset isManuallySet after a delay
	useEffect(() => {
		if (isManuallySet) {
			// Clear any existing timer
			if (resetTimerRef.current) {
				clearTimeout(resetTimerRef.current);
			}

			// Set a new timer
			resetTimerRef.current = setTimeout(() => {
				setIsManuallySet(false);
				resetTimerRef.current = null;
			}, 5000); // Reset after 5 seconds

			// Cleanup function
			return () => {
				if (resetTimerRef.current) {
					clearTimeout(resetTimerRef.current);
					resetTimerRef.current = null;
				}
			};
		}
	}, [isManuallySet]);

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
		setMobileMenuOpen(true);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		setMobileMenuOpen(false);
	};

	const handleNavItemClick = (item: string, event?: React.MouseEvent) => {
		// Prevent default anchor link behavior if event is provided
		if (event) {
			event.preventDefault();
		}

		setActiveItem(item);
		setIsManuallySet(true); // Set the flag to indicate manual selection
		setMobileMenuOpen(false);
		setAnchorEl(null); // Close the mobile menu

		// Scroll to the section with the corresponding ID
		const sectionId = item.toLowerCase();
		const section = document.getElementById(sectionId);
		if (section) {
			// Get the toolbar height to offset the scroll position
			const toolbar = document.querySelector('nav');
			const toolbarHeight = toolbar ? toolbar.offsetHeight : 0;

			// Calculate the position to scroll to (section's top position minus toolbar height)
			const offsetPosition = section.getBoundingClientRect().top + (window.pageYOffset - 10) - toolbarHeight;

			// Scroll to the calculated position
			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			});

			// Find the titlePage element in the section and animate it
			setTimeout(() => {
				const titleElement = section.querySelector('.titlePage');
				if (titleElement) {
					// Remove the animation classes first to reset the animation
					titleElement.classList.remove('animate__animated', 'animate__rubberBand');

					// Force a reflow to ensure the animation restarts
					void (titleElement as HTMLElement).offsetWidth;

					// Add the animation classes from animate.css
					titleElement.classList.add('animate__animated', 'animate__rubberBand');
				}
			}, 500); // Wait for the scroll to complete
		}
	};

	// Use a consistent icon for server rendering and initial client render
	// Only switch based on theme after client-side hydration is complete and safe
	// const themeIcon = !isHydrated || mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />;
	// const tooltipTitle = !isHydrated || mode === 'light' ? 'Switch to dark mode': 'Switch to light mode';

	return (
		<React.Fragment>
			<Box sx={{ display: 'flex' }}>
			<AppBar component='nav' position="fixed" sx={{ top: 'auto' }}>
			<Toolbar>
				{/* Mobile Navigation */}
				<Box className="mobile-menu-button" sx={{ display: { xs: 'flex', sm: 'flex', md: 'none' } }}>
					<Tooltip title="Menu">
						<IconButton 
							color="inherit" 
							aria-label="menu"
							onClick={handleMenuOpen}
						>
							<MenuIcon />
						</IconButton>
					</Tooltip>
				</Box>

				<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Image
							src={imageLogo}
							// src={logo.logoPath}
							alt={logo?.logoAlt || 'IT Coder'}
							className="header-logo"
							width={logo?.logoWidth || 60}
							height={logo?.logoHeight || 60}
						/>
				</Box>

				{/* Desktop Navigation */}
				<Box className="header-nav-box" sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
					{navItems.map((item) => (
						<Button
							key={item}
							className={`header-nav-button ${activeItem === item ? 'active' : ''}`}
							onClick={(e) => handleNavItemClick(item, e)}
							href={`#${item.toLowerCase()}`}
							component="a"
						>
							{item}
						</Button>
					))}
				</Box>

				{/* Mobile Menu */}
				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={handleMenuClose}
					className="mobile-menu"
					sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}
					PaperProps={{
						style: {
							width: '100%',
							maxWidth: '300px',
						},
					}}
				>
					{navItems.map((item) => (
						<MenuItem 
							key={item} 
							onClick={(e) => handleNavItemClick(item, e)}
							selected={activeItem === item}
						>
							{item}
						</MenuItem>
					))}
				</Menu>

				<Box>
				{/*	<Tooltip title={tooltipTitle}>*/}
				{/*		<IconButton onClick={toggleTheme} color="inherit">*/}
				{/*			{themeIcon}*/}
				{/*		</IconButton>*/}
				{/*	</Tooltip>*/}
				</Box>
			</Toolbar>
			</AppBar>
			</Box>
			<Paper className={'mainFuturePost'}
			       style={{backgroundImage: `url(${titleImage.src})`}}>
				<Container fixed>
					<div className='overlay'/>
						<Box display='flex' flexDirection='column' sx={{ position: 'relative', zIndex: 2 }}>
							<div className={'mainFuturePostContent'}>
								<Typography variant="h3" component="h1" color="inherit">
									Software development
								</Typography>
								<Typography variant="h6" component="h2" color="inherit" paragraph>
									Application and database architecture development
								</Typography>
							</div>
						</Box>
				</Container>
			</Paper>
		</React.Fragment>
	)
}
