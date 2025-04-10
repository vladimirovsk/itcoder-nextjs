import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	palette: {
		primary: {
			main: '#1E3A8A',
		},
		secondary: {
			main: '#F97316',
		},
	},
	typography: {
		fontFamily: 'Geist, Roboto, sans-serif', // Убедитесь, что шрифт соответствует вашему проекту
	},
});
