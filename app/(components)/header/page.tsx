'use client';
import { AppBar, Box, Button, Container, IconButton, Paper, Toolbar, Tooltip, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { palette, shadow, radius, type } from '../../theme/tokens';
import { useHeader, NAV_ITEMS } from './useHeader';
import MobileMenu from './MobileMenu';
import titleImage from '@/public/it-coder-title.png';
import titleImageSmall from './images/titleImageSmall.png';

const toSectionId = (item: string) => item.toLowerCase().replace(/\s+/g, '-');

export default function Headers() {
	const {
		activeItem,
		anchorEl,
		mobileMenuOpen,
		scrolled,
		mode,
		isHydrated,
		toggleTheme,
		isBlog,
		isHome,
		handleMenuOpen,
		handleMenuClose,
		handleNavItemClick,
	} = useHeader();

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
							<Link href="/" aria-label="IT CODER — home" style={{ display: 'flex' }}>
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
							{NAV_ITEMS.map((item) => (
								<Button
									key={item}
									className={`header-nav-button ${isHome && activeItem === item ? 'active' : ''}`}
									onClick={(e) => handleNavItemClick(item, e)}
									href={`/#${toSectionId(item)}`}
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
						<MobileMenu
							anchorEl={anchorEl}
							open={mobileMenuOpen}
							onClose={handleMenuClose}
							navItems={NAV_ITEMS}
							activeItem={activeItem}
							isHome={isHome}
							isBlog={isBlog}
							handleNavItemClick={handleNavItemClick}
							themeMode={mode}
						/>

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
										<Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: palette.status.successBright, flexShrink: 0 }} />
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
									</Button>
									<Button variant="text" size="large" onClick={(e) => handleNavItemClick('Contact', e)} href="#contact" component="a" sx={{ color: 'rgba(255,255,255,0.85)', fontWeight: 400, textTransform: 'none', fontSize: '0.95rem', '&:hover': { color: '#fff', backgroundColor: 'transparent' } }}>
										or contact directly
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
						</Box>
					</Container>
				</Paper>
		</React.Fragment>
	)
}
