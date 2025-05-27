"use client";

import {Box, Grid, useMediaQuery, useTheme as useMuiTheme, Link} from '@mui/material';
import { useTheme } from '@/app/ThemeContext';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function Footer() {
	const { mode } = useTheme();
	const muiTheme = useMuiTheme();
	const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

	return (
		<Box className={'footer'} data-theme={mode}>
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
				<Grid 
					container 
					direction={isMobile ? 'column' : 'row'}
					spacing={2}
					alignItems="center"
				>
					<Grid>
						<Link 
							href="https://wa.me/15879689089" 
							target="_blank" 
							rel="noopener noreferrer"
							className="footer-link"
							style={{ 
								display: 'flex', 
								alignItems: 'center',
								color: 'inherit'
							}}
						>
							<WhatsAppIcon style={{ marginRight: '5px' }} />
							5879689089
						</Link>
					</Grid>
					<Grid>
						<Link 
							href="mailto:support@itcoder.ca" 
							target="_blank" 
							rel="noopener noreferrer"
							className="footer-link"
							style={{ 
								display: 'flex', 
								alignItems: 'center',
								color: 'inherit'
							}}
						>
							<EmailIcon style={{ marginRight: '5px' }} />
							support@itcoder.ca
						</Link>
					</Grid>
					<Grid>
						<Link 
							href="https://www.facebook.com/61575213251739" 
							target="_blank" 
							rel="noopener noreferrer"
							className="footer-link"
							style={{ 
								display: 'flex', 
								alignItems: 'center',
								color: 'inherit'
							}}
						>
							<FacebookIcon style={{ marginRight: '5px' }} />
							itcoder
						</Link>
					</Grid>
				</Grid>
				<div style={{ marginTop: '20px', width: '100%', textAlign: 'center' }}>
					2025 © All rights reserved.
				</div>
			</div>
		</Box>
	)
}
