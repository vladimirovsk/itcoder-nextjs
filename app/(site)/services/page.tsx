export { metadata } from './metadata';
import { IService } from '@/app/(site)/services/interfaces';
import services from '@/app/(site)/services/services.json';
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import DnsIcon from '@mui/icons-material/Dns';
import ApiIcon from '@mui/icons-material/Api';
import WebIcon from '@mui/icons-material/Web';
import { SvgIconComponent } from '@mui/icons-material';
import ServicesFAQ from './ServicesFAQ';

const ICON_MAP: Record<string, SvgIconComponent> = {
	Storage: StorageIcon,
	Dns: DnsIcon,
	Api: ApiIcon,
	Web: WebIcon,
};

const ICON_COLORS: Record<string, { bg: string; color: string }> = {
	Storage: { bg: '#EEF2FF', color: '#3B5BDB' },
	Dns:     { bg: '#F0FDF4', color: '#16A34A' },
	Api:     { bg: '#FFF7ED', color: '#EA580C' },
	Web:     { bg: '#F0F9FF', color: '#0284C7' },
};

export default function Services() {
	const servicesList: IService[] = services;
	return (
		<section id="services" className={'containerPage'}>
			<h2 className={'titlePage'}>Services</h2>
			<Box
				sx={{
					width: '100%',
					display: 'grid',
					gridTemplateColumns: {
						xs: 'repeat(1, 1fr)',
						sm: 'repeat(2, 1fr)',
						md: 'repeat(4, 1fr)',
					},
					gap: 3,
				}}
			>
				{servicesList.map((service: IService) => {
					const Icon = ICON_MAP[service.icon] ?? WebIcon;
					const colors = ICON_COLORS[service.icon] ?? { bg: '#EEF2FF', color: '#3B5BDB' };
					return (
						<Card key={service.name} sx={{
							display: 'flex',
							flexDirection: 'column',
							height: '100%',
							boxShadow: '0px 1px 4px rgba(0,0,0,0.07)',
							borderRadius: '14px',
							border: '1px solid #F1F5F9',
							transition: 'box-shadow 0.25s, transform 0.25s',
							'&:hover': {
								boxShadow: '0px 8px 24px rgba(59,91,219,0.12)',
								transform: 'translateY(-3px)',
							},
						}}>
							{/* Icon block */}
							<Box sx={{ display: 'flex', justifyContent: 'center', pt: 3.5, pb: 1 }}>
								<Box sx={{
									width: 64, height: 64,
									borderRadius: '16px',
									backgroundColor: colors.bg,
									display: 'flex', alignItems: 'center', justifyContent: 'center',
								}}>
									<Icon sx={{ fontSize: 32, color: colors.color }} />
								</Box>
							</Box>

							<CardHeader
								title={service.name}
								slotProps={{ title: { sx: { fontSize: '1rem', fontWeight: 700, textAlign: 'center', color: '#1e293b' } } }}
								sx={{ pb: 0.5, pt: 1 }}
							/>
							<CardContent sx={{
								flexGrow: 1,
								backgroundColor: 'white',
								pt: 0.5,
							}}>
								<Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.6, textAlign: 'center' }}>
									{service.description}
								</Typography>
							</CardContent>
						</Card>
					);
				})}
			</Box>

			{/* Portal CTA */}
		<Box component="a" href="https://portal.it-coder.com" target="_blank" rel="noopener noreferrer" sx={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			mt: 4,
			px: { xs: 2.5, sm: 4 },
			py: 2.5,
			borderRadius: '14px',
			background: 'linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%)',
			textDecoration: 'none',
			cursor: 'pointer',
			transition: 'transform 0.2s, box-shadow 0.2s',
			boxShadow: '0 4px 20px rgba(2,132,199,0.25)',
			'&:hover': {
				transform: 'translateY(-2px)',
				boxShadow: '0 8px 28px rgba(2,132,199,0.35)',
			},
		}}>
			<Box>
				<Box component="p" sx={{ m: 0, color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', mb: 0.25 }}>
					Need a dedicated Windows server?
				</Box>
				<Box component="p" sx={{ m: 0, color: '#fff', fontWeight: 700, fontSize: { xs: '0.95rem', sm: '1.05rem' } }}>
					Rent a ready-to-use RDP server — manage it from your personal portal
				</Box>
			</Box>
			<Box sx={{
				flexShrink: 0, ml: 2,
				backgroundColor: '#fff',
				color: '#0284c7',
				fontWeight: 700,
				fontSize: '0.85rem',
				px: 2.5, py: 1,
				borderRadius: '8px',
				whiteSpace: 'nowrap',
			}}>
				Open Portal →
			</Box>
		</Box>

		<ServicesFAQ />

			<Box component="a" href="#project-builder" sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				mt: 4,
				px: { xs: 2.5, sm: 4 },
				py: 2.5,
				borderRadius: '14px',
				background: 'linear-gradient(135deg, #0f1724 0%, #1a2d5a 100%)',
				textDecoration: 'none',
				cursor: 'pointer',
				transition: 'transform 0.2s, box-shadow 0.2s',
				boxShadow: '0 4px 20px rgba(15,23,36,0.25)',
				'&:hover': {
					transform: 'translateY(-2px)',
					boxShadow: '0 8px 28px rgba(15,23,36,0.35)',
				},
			}}>
				<Box>
					<Box component="p" sx={{ m: 0, color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', mb: 0.25 }}>
						Not sure where to start?
					</Box>
					<Box component="p" sx={{ m: 0, color: '#fff', fontWeight: 700, fontSize: { xs: '0.95rem', sm: '1.05rem' } }}>
						Configure your project in 3 steps — get a plan within 24 hours
					</Box>
				</Box>
				<Box sx={{
					flexShrink: 0, ml: 2,
					backgroundColor: '#F97316',
					color: '#fff',
					fontWeight: 700,
					fontSize: '0.85rem',
					px: 2.5, py: 1,
					borderRadius: '8px',
					whiteSpace: 'nowrap',
				}}>
					Start →
				</Box>
			</Box>
		</section>
	);
}
