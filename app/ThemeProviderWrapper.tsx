"use client";

import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import CssBaseline from '@mui/material/CssBaseline';
export default function ThemeProviderWrapper({children}: {
	children: React.ReactNode;
}) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline /> {/* Опционально */}
			{children}
		</ThemeProvider>
	);
}
