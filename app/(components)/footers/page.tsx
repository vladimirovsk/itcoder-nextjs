"use client";

import { Box } from '@mui/material';
import { useTheme } from '@/app/ThemeContext';

export default function Footer() {
	const { mode } = useTheme();

	return (
		<Box className={'footer'} data-theme={mode}>
			2025 © All rights reserved. <br />
		</Box>
	)
}
