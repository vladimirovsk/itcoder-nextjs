'use client';
import {AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Paper, Toolbar, Tooltip, Typography} from '@mui/material';
import React, { useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { palette, shadow, radius, type } from '../../theme/tokens';
import { useTheme } from '../../ThemeContext';


const toSectionId = (item: string) => item.toLowerCase().replace(/\s+/g, '-');

export default function Headers() {
	const [activeItem, setActiveItem] = React.useState('Home'); // Default active item
	const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [isManuallySet, setIsManuallySet] = React.useState(false);
	const [scrolled, setScrolled] = React.useState(false); // Track if activeItem was manually set by clicking
	const scrollTimerRef = React.useRef<NodeJS.Timeout | null>(null); // Ref to store the scroll timer
	const resetTimerRef = React.useRef<NodeJS.Timeout | null>(null); // Ref to store the reset timer
	const { mode, isHydrated, toggleTheme } = useTheme();
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

	// Handle scroll events
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
			setIsManuallySet(true); // Set the flag to indicate manual selection

			const toolbar = document.querySelector('nav');
			const toolbarHeight = toolbar ? toolbar.offsetHeight : 0;
			const offsetPosition = section.getBoundingClientRect().top + (window.pageYOffset - 10) - toolbarHeight;
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
	}, [handleScroll, checkActiveSection]);

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

	const themeIcon = !isHydrated || mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />;
	const tooltipTitle = !isHydrated || mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode';

	return (
		<React.Fragment>
			<Box sx={{ display: 'flex' }}>
				<AppBar component='nav' position="fixed" sx={{
					top: 'auto',
					border: 'none',
					backgroundColor: scrolled
						? (mode === 'light' ? 'rgba(243,244,246,0.82)' : 'rgba(26,29,36,0.92)')
						: (mode === 'light' ? palette.bg.default : palette.dark.surface),
					backdropFilter: scrolled ? 'blur(14px)' : 'none',
					WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
					boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.10)' : '0 1px 0 rgba(0,0,0,0.06)',
					transition: 'background-color 0.3s, box-shadow 0.3s, backdrop-filter 0.3s',
				}}>
					<Toolbar>
						{/* Mobile Navigation */}
						<Box className="mobile-menu-button" sx={{ display: { xs: 'flex', sm: 'flex', md: 'none' } }}>
							<Tooltip title="Menu">
								<IconButton
									color="inherit"
									aria-label="menu"
									aria-expanded={Boolean(anchorEl)}
									aria-controls="mobile-menu"
									onClick={handleMenuOpen}
									sx={{ color: mode === 'light' ? palette.slate[800] : palette.dark.text }}
								>
									<MenuIcon />
								</IconButton>
							</Tooltip>
						</Box>

						<Box sx={{ marginLeft: '1rem', display: 'flex', alignItems: 'center', backgroundColor: 'transparent' }}>
							<Link href="/" ariaia-label="IT CODER — home" style={{ display: 'flex' }}>
								<Image
									src="/imageLogo.png"
									alt={'IT Coder'}
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
										color: onHome && activeItem === item ? palette.brand[500] : palette.slate[600],
										fontWeight: onHome && activeItem === item ? 600 : 400,
										borderBottom: onHome && activeItem === item ? `2px solid ${palette.brand[500]}` : '2px solid transparent',
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
							{/* Blog — a real route, not an in-page section */}
							<Button
								className={`header-nav-button ${isBlog ? 'active' : ''}`}
								component={Link}
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

						{/* Mobile Menu */}
						<Menu
							id="mobile-menu"
							anchorEl={anchorEl}
							open={Boolean(anchorEl)}
							onClose={handleMenuClose}
							className="mobile-menu"
							sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}
							PaperProps={{
								style: {
									width: '100%',
									maxWidth: '300px',
									backgroundColor: mode === 'light' ? palette.bg.default : palette.dark.surface,
									color: mode === 'light' ? palette.slate[800] : palette.dark.text,
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
									sx={{ color: onHome && activeItem === item ? palette.brand[500] : palette.slate[600] }}
								>
									{item}
								</MenuItem>
							))}
							<MenuItem
								component={Link}
								href="/blog"
								onClick={handleMenuClose}
								selected={isBlog}
								sx={{ color: isBlog ? palette.brand[500] : palette.slate[600] }}
							>
								Blog
							</MenuItem>
						</Menu>

						<Box sx={{ flexShrink: 0, ml: 1 }}>
							<Tooltip title={tooltipTitle}>
								<IconButton onClick={toggleTheme} aria-label={tooltipTitle} sx={{ color: mode === 'light' ? palette.slate[800] : palette.dark.textMuted }}>
									{themeIcon}
								</IconButton>
							</Tooltip>
						</Box>
					</Toolbar>
				</AppBar>
			</Box>
			<Paper className={'mainFuturePost'}
					elevation={0}
					style={{
						border: 'none',
						backgroundColor: palette.slate[900],
						position: 'relative',
						boxShadow: 'none',
						minHeight: '30vh',
						display: 'flex',
						alignItems: 'center',
						paddingTop: '64px',
					}}
					sx={{
						backgroundImage: {
							xs: `linear-gradient(to bottom, rgba(15,23,36,0.68) 0%, rgba(15,23,36,0.85) 100%), url(${titleImageSmall.src})`,
							sm: `linear-gradient(to bottom, rgba(15,23,36,0.68) 0%, rgba(15,23,36,0.85) 100%), url(${titleImageSmall.src})`,
							md: `linear-gradient(to bottom, rgba(15,23,36,0.68) 0%, rgba(15,23,36,0.85) 100%), url(${titleImage.src})`
						},
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center',
					}}
				>
					<Container fixed style={{ border: 'none' }}>
						<Box display='flex' flexDirection='column' sx={{ position: 'relative', zIndex: 2, border: 'none', boxShadow: 'none' }}>
							<Box sx={{ paddingY: { xs: '4rem', md: '2rem' }, maxWidth: '48rem' }}>
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5, flexWrap: 'wrap' }}>
									<Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, backgroundColor: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: '100px', px: 1.5, py: 0.5 }}>
										<Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: palette.status.successBright, flexShr: 0 }} />
										<Typography sx={{ color: palette.status.successBright, fontSize: '0.8rem', fontWeight: 600, lineHeight: 1 }}>
											Available for hire
										</Typography>
									</Box>
									<Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem' }}>
										Calgary, AB, Canada
									</Typography>
								</Box>
								<Typography component="h1" sx={{
									fontSize: { xs: `${type.hero.size[1]}px`, md: `${type.hero.size[0]}px` },
									lineHeight: type.hero.lh,
									fontWeight: type.hero.weight,
									letterSpacing: type.hero.tracking,
									color: '#ffffff',
									mb: 2,
									textShadow: '0 2px 20px rgba(0,0,0,0.5)',
								}}>
									Backend & AI integrations, built to ship
								</Typography>
								<Typography variant="h6" component="p" sx={{ fontWeight: 400, color: 'rgba(255,255,255,0.85)', mb: 4, lineHeight: 1.6 }}>
									Senior backend engineer in Calgary. I build the APIs, payment systems and AI features behind SaaS, fintech and crypto products — from architecture to production.
								</Typography>
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
									<Button variant="contained" size="large" onClick={(e) => handleNavItemClick('Project Builder', e)} href="#project-builder" component="a" sx={{ backgroundColor: palette.accent[500], color: '#fff', fontWeight: 700, px: 4, py: 1.5, borderRadius: `${radius.sm}px`, textTransform: 'none', fontSize: '1rem', boxShadow: shadow.cta, '&:hover': { backgroundColor: palette.accent[600], boxShadow: shadow.ctaHover } }}>
										Build Your Project →
									Button
									</Button>
									<Button variant="text" size="large" onClick={(e) => handleNavItemClick('Contact', e)} href="#contact" component="a" sx={{ color: 'rgba(255,255,255,0.85)', fontWeight: 400, textTransform: 'none', fontSize: '0.95rem', '&:hover': { color: '#fff', backgroundColor: 'transparent' } }}>
										or contact directly
									Button
									</Button>
								</Box>
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap', mt: 3 }}>
									{[
										'NestJS & microservices',
										'AI / LLM integration',
										'10+ years experience',
										].map((item, i) => (
										<React.Fragment key={item}>
										{i > 0 && <Box sx={{ width: 3, height: 3, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.25)', mx: 1.5, flexShrink: 0 }} />}
										<Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem' }}>
											{item}
										</Typography>
										</React.Fragment>
									))}
								</Box>
							</Box>
						</Container>
					</Paper>
				</Box>
			</React.Fragment>
		)
	}
}
