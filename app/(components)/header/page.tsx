'use client';
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';

export default function Headers() {
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const navItems = ['Home', 'Project', 'Contact'];

	console.log(mobileOpen)

	return (
		<React.Fragment>
		<AppBar component="nav">
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={handleDrawerToggle}
					sx={{ mr: 2, display: { sm: 'none' } }}
				>
				<MenuIcon />
				</IconButton>
				<Typography
					variant="h6"
					component="div"
					sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
				>
					ITCODER
				</Typography>
				<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
					{navItems.map((item) => (
						<Button key={item} sx={{ color: '#fff' }}>
							{item}
						</Button>
					))}
				</Box>

			</Toolbar>
		</AppBar>
		</React.Fragment>

	)
}
