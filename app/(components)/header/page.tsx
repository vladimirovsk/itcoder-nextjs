'use client';
import {AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Paper, Toolbar, Tooltip, Typography} from '@mui/material';
import React, { useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import titleImage from '../../../public/it-coder-title.png';
import titleImageSmall from './images/titleImageSmall.png';
import imageLogo from '../../../public/imageLogo.png';
import MenuIcon from '@mui/icons-material/Menu';


const toSectionId = (item: string) => item.toLowerCase().replace(/\s+/g, '-');

export default function Headers() {
	const [activeItem, setActiveItem] = React.useState('Home'); // Default active item
	const [,setMobileMenuOpen] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [isManuallySet, setIsManuallySet] = React.useState(false);
	const [scrolled, setScrolled] = React.useState(false); // Track if activeItem was manually set by clicking
	const scrollTimerRef = React.useRef<NodeJS.Timeout | null>(null); // Ref to store the scroll timer
	const resetTimerRef = React.useRef<NodeJS.Timeout | null>(null); // Ref to store the reset timer
	const pathname = usePathname(); // Current route — used to highlight the Blog link (a real route, not a section)
	const isBlog = pathname?.startsWith('/blog') ?? false;
	const onHome = pathname === '/'; // Section nav items only highlight on the home page;
	// off-home the scroll-spy never runs, so a stale activeItem must not stay underlined.
	// const navItems = useMemo(() => ['Services', 'Advantages', 'Skills', 'Cases', 'Contact'], []);
	const navItems = useMemo(() => ['Services', 'Advantages', 'Skills', 'Projects', 'Project Builder', 'Contact'], []);

	const fromSectionId = useCallback((id: string) =>
		navItems.find(i => toSectionId(i) === id) ?? (id.charAt(0).toUpperCase() + id.slice(1)),
	[navItems]);

	// Function to check which section is currently in view
	const checkActiveSection = useCallback(() => {
		// If activeItem was manually set, don't override it
		if (isManuallySet) return;

		// Get all sections
		const sections = navItems.map(item => document.getElementById(toSectionId(item))).filter(Boolean);

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
				setActiveItem(fromSectionId(section.id));
				return;
			}
		}

		// If we're at the top of the page, set Home as active
		if (scrollPosition < (sections[0]?.offsetTop || 0)) {
			setActiveItem('Home');
		}
	}, [navItems, isManuallySet, fromSectionId]);

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

	// Handle direct URL navigation with hash fragments (e.g. arriving at /#contact
	// after clicking a section link from /blog). One simple smooth scroll — same
	// behaviour as the in-page nav items, no extra positioning logic.
	useEffect(() => {
		if (typeof window === 'undefined' || !window.location.hash) return;

		const sectionId = window.location.hash.substring(1);
		const timer = setTimeout(() => {
			const section = document.getElementById(sectionId);
			if (!section) return;

			setActiveItem(fromSectionId(sectionId));
			setIsManuallySet(true);

			const toolbar = document.querySelector('nav');
			const toolbarHeight = toolbar ? toolbar.offsetHeight : 0;
			const offsetPosition = section.getBoundingClientRect().top + window.pageYOffset - toolbarHeight;
			window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
		}, 100);

		return () => clearTimeout(timer);
	}, [fromSectionId, pathname]);

	// Add scroll event listener
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		// Initial check
		checkActiveSection();

		// Cleanup
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [handleScroll, checkActiveSection, activeItem]);

	// Blur effect on scroll
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

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
		// Scroll to the section with the corresponding ID
		const sectionId = toSectionId(item);
		const section = document.getElementById(sectionId);

		// If the section isn't on the current page (e.g. we're on /blog), let the
		// browser follow the `/#section` href to the home page instead of trapping the click.
		if (!section) {
			return;
		}

		// Section is present — handle the scroll ourselves.
		if (event) {
			event.preventDefault();
		}

		setActiveItem(item);
		setIsManuallySet(true); // Set the flag to indicate manual selection
		setMobileMenuOpen(false);
		setAnchorEl(null); // Close the mobile menu

		{
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

		}
	};

	// Use a consistent icon for server rendering and initial client render
	// Only switch based on theme after client-side hydration is complete and safe
	// const themeIcon = !isHydrated || mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />;
	// const tooltipTitle = !isHydrated || mode === 'light' ? 'Switch to dark mode': 'Switch to light mode';

	return (
		<React.Fragment>
			<Box sx={{ display: 'flex' }}>
			<AppBar component='nav' position="fixed" sx={{
				top: 'auto',
				border: 'none',
				backgroundColor: scrolled ? 'rgba(243,244,246,0.82)' : '#F3F4F6',
				backdropFilter: scrolled ? 'blur(14px)' : 'none',
				WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
				boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.10)' : '0 1px 0 rgba(0,0,0,0.06)',
				transition: 'background-color 0.3s, box-shadow 0.3s, backdrop-filter 0.3s',
				}}
			>
			<Toolbar>
				{/* Mobile Navigation */}
				<Box className="mobile-menu-button" sx={{ display: { xs: 'flex', sm: 'flex', md: 'none' } }}>
					<Tooltip title="Menu">
						<IconButton
							color="inherit"
							aria-label="menu"
							onClick={handleMenuOpen}
							sx={{ color: '#1e293b' }}
						>
							<MenuIcon />
						</IconButton>
					</Tooltip>
				</Box>

				<Box sx={{ marginLeft: '1rem', display: 'flex', alignItems: 'center', backgroundColor: 'transparent' }}>
						<Link href="/" aria-label="IT CODER — home" style={{ display: 'flex' }}>
							<Image
								src={imageLogo}
								alt={'IT Coder'}
								className="header-logo"
								width={120}
								height={35}
								priority
							/>
						</Link>
				</Box>

				{/* Desktop Navigation */}
				<Box className="header-nav-box" sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
					{navItems.map((item) => (
						<Button
							key={item}
							className={`header-nav-button ${onHome && activeItem === item ? 'active' : ''}`}
							onClick={(e) => handleNavItemClick(item, e)}
							href={`/#${toSectionId(item)}`}
							sx={{
								marginLeft: '1rem',
								color: onHome && activeItem === item ? '#3B5BDB' : '#475569',
								fontWeight: onHome && activeItem === item ? 600 : 400,
								borderBottom: onHome && activeItem === item ? '2px solid #3B5BDB' : '2px solid transparent',
								borderRadius: 0,
								fontSize: '0.9rem',
								letterSpacing: '0.01em',
								'&:hover': { color: '#1e293b', backgroundColor: 'transparent' },
							}}
							component="a"
						>
							{item}
						</Button>
					))}
					{/* Blog — a real route, not an in-page section */}
					<Button
						className={`header-nav-button ${isBlog ? 'active' : ''}`}
						component={Link}
						href="/blog"
						sx={{
							marginLeft: '1rem',
							color: isBlog ? '#3B5BDB' : '#475569',
							fontWeight: isBlog ? 600 : 400,
							borderBottom: isBlog ? '2px solid #3B5BDB' : '2px solid transparent',
							borderRadius: 0,
							fontSize: '0.9rem',
							letterSpacing: '0.01em',
							'&:hover': { color: '#1e293b', backgroundColor: 'transparent' },
						}}
					>
						Blog
					</Button>
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
							backgroundColor: '#F3F4F6',
							color: '#1e293b',
						},
					}}
				>
					{navItems.map((item) => (
						<MenuItem
							key={item}
							component="a"
							href={`/#${toSectionId(item)}`}
							onClick={(e) => handleNavItemClick(item, e)}
							selected={onHome && activeItem === item}
							sx={{ color: onHome && activeItem === item ? '#3B5BDB' : '#475569' }}
						>
							{item}
						</MenuItem>
					))}
					{/* Blog — a real route, not an in-page section */}
					<MenuItem
						component={Link}
						href="/blog"
						onClick={handleMenuClose}
						selected={isBlog}
						sx={{ color: isBlog ? '#3B5BDB' : '#475569' }}
					>
						Blog
					</MenuItem>
				</Menu>
				<Box>
				</Box>
			</Toolbar>
			</AppBar>
			</Box>
			<Paper className={'mainFuturePost'}
			       elevation={0}
			       style={{
					   border: 'none',
			       	   backgroundColor: '#0f1724',
			       	   position: 'relative',
			       	   boxShadow: 'none',
					   minHeight: '30vh',
					   display: 'flex',
					   alignItems: 'center',
					   paddingTop: '64px',
					}}
				   sx={{
					   backgroundImage: {
						   xs: `linear-gradient(to bottom, rgba(15,23,36,0.55) 0%, rgba(15,23,36,0.75) 100%), url(${titleImageSmall.src})`,
						   sm: `linear-gradient(to bottom, rgba(15,23,36,0.55) 0%, rgba(15,23,36,0.75) 100%), url(${titleImageSmall.src})`,
						   md: `linear-gradient(to bottom, rgba(15,23,36,0.45) 0%, rgba(15,23,36,0.8) 100%), url(${titleImage.src})`
					   },
					   backgroundSize: 'cover',
					   backgroundRepeat: 'no-repeat',
					   backgroundPosition: 'center',
				   }}
			>
				<Container fixed style={{ border: 'none' }}>
					<Box display='flex' flexDirection='column' sx={{
						position: 'relative', zIndex: 2, border: 'none', boxShadow: 'none'}}>
						<Box sx={{
							paddingY: { xs: '6rem', md: '2rem' },
							maxWidth: '48rem',
						}}>
							{/* Availability badge */}
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5, flexWrap: 'wrap' }}>
								<Box sx={{
									display: 'inline-flex', alignItems: 'center', gap: 0.75,
									backgroundColor: 'rgba(74,222,128,0.12)',
									border: '1px solid rgba(74,222,128,0.3)',
									borderRadius: '100px',
									px: 1.5, py: 0.5,
								}}>
									<Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#4ade80', flexShrink: 0 }} />
									<Typography sx={{ color: '#4ade80', fontSize: '0.8rem', fontWeight: 600, lineHeight: 1 }}>
										Available for hire
									</Typography>
								</Box>
								<Typography sx={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.8rem' }}>
									Calgary, AB, Canada
								</Typography>
							</Box>

							<Typography variant="h3" component="h1" sx={{
								fontWeight: 800,
								color: '#ffffff',
								lineHeight: 1.2,
								mb: 2,
								textShadow: '0 2px 20px rgba(0,0,0,0.5)',
							}}>
								Backend &amp; AI integrations, built to ship
							</Typography>
							<Typography variant="h6" component="p" sx={{
								fontWeight: 400,
								color: 'rgba(255,255,255,0.75)',
								mb: 4,
								lineHeight: 1.6,
							}}>
								Senior backend engineer in Calgary. I build the APIs, payment systems and AI features behind SaaS, fintech and crypto products — from architecture to production.
							</Typography>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
								<Button
									variant="contained"
									size="large"
									onClick={(e) => handleNavItemClick('Project Builder', e)}
									href="#project-builder"
									component="a"
									sx={{
										backgroundColor: '#F97316',
										color: '#fff',
										fontWeight: 700,
										px: 4,
										py: 1.5,
										borderRadius: '8px',
										textTransform: 'none',
										fontSize: '1rem',
										boxShadow: '0 4px 14px rgba(249,115,22,0.32)',
										'&:hover': { backgroundColor: '#e0620a', boxShadow: '0 6px 18px rgba(249,115,22,0.42)' },
									}}
								>
									Build Your Project →
								</Button>
								<Button
									variant="text"
									size="large"
									onClick={(e) => handleNavItemClick('Contact', e)}
									href="#contact"
									component="a"
									sx={{
										color: 'rgba(255,255,255,0.7)',
										fontWeight: 400,
										textTransform: 'none',
										fontSize: '0.95rem',
										'&:hover': { color: '#fff', backgroundColor: 'transparent' },
									}}
								>
									or contact directly
								</Button>
							</Box>

							{/* Trust row */}
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap', mt: 3 }}>
								{[
									'NestJS & microservices',
									'AI / LLM integration',
									'10+ years experience',
								].map((item, i) => (
									<React.Fragment key={item}>
										{i > 0 && (
											<Box sx={{ width: 3, height: 3, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.25)', mx: 1.5, flexShrink: 0 }} />
										)}
										<Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem' }}>
											{item}
										</Typography>
									</React.Fragment>
								))}
							</Box>
						</Box>
					</Box>
				</Container>
			</Paper>
		</React.Fragment>
	)
}









