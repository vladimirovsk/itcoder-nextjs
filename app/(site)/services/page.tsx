export { metadata } from './metadata';
import { IService } from '@/app/(site)/services/interfaces';
import services from '@/app/(site)/services/services.json';
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import ApiIcon from '@mui/icons-material/Api';
import PsychologyIcon from '@mui/icons-material/Psychology';
import PaymentsIcon from '@mui/icons-material/Payments';
import WebIcon from '@mui/icons-material/Web';
import { SvgIconComponent } from '@mui/icons-material';
import ServicesFAQ from './ServicesFAQ';
import { palette, gradients, shadow, radius, cardHoverSx, motion, type } from '@/app/theme/tokens';

const ICON_MAP: Record<string, SvgIconComponent> = {
	Api:        ApiIcon,
	Psychology: PsychologyIcon,
	Payments:   PaymentsIcon,
	Storage:    StorageIcon,
	Web:        WebIcon,
};

/** Map the JSON icon key onto the canonical per-service accent in tokens. */
const ICON_TOKEN: Record<string, keyof typeof palette.serviceIcons> = {
	Api:        'api',
	Psychology: 'ai',
	Payments:   'payments',
	Storage:    'storage',
	Web:        'web',
};

interface BannerCTAProps {
	href: string;
	external?: boolean;
	gradient: string;
	shadow: string;
	shadowHover: string;
	kicker: string;
	headline: string;
	cta: string;
	pillBg: string;
	pillColor: string;
	ariaLabel: string;
}

/** Single gradient banner-CTA, used twice (portal + project builder). */
function BannerCTA({ href, external, gradient, shadow, shadowHover, kicker, headline, cta, pillBg, pillColor, ariaLabel }: BannerCTAProps) {
	return (
		<Box
			component="a"
			href={href}
			aria-label={ariaLabel}
			{...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
			sx={{
				display: 'flex',
				flexDirection: { xs: 'column', sm: 'row' },
				alignItems: { xs: 'flex-start', sm: 'center' },
				justifyContent: 'space-between',
				gap: { xs: 2, sm: 0 },
				mt: 4,
				px: { xs: 2.5, sm: 4 },
				py: 2.5,
				borderRadius: `${radius.lg}px`,
				background: gradient,
				textDecoration: 'none',
				cursor: 'pointer',
				transition: `transform ${motion.fast}, box-shadow ${motion.fast}`,
				boxShadow: shadow,
				'&:hover': {
					transform: 'translateY(-2px)',
					boxShadow: shadowHover,
				},
			}}
		>
			<Box>
				<Box component="p" sx={{ m: 0, color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', mb: 0.25 }}>
					{kicker}
				</Box>
				<Box component="p" sx={{ m: 0, color: '#fff', fontWeight: 700, fontSize: { xs: '0.95rem', sm: '1.05rem' } }}>
					{headline}
				</Box>
			</Box>
			<Box sx={{
				flexShrink: 0,
				ml: { xs: 0, sm: 2 },
				width: { xs: '100%', sm: 'auto' },
				minHeight: 44,
				display: 'flex', alignItems: 'center', justifyContent: 'center',
				backgroundColor: pillBg,
				color: pillColor,
				fontWeight: 700,
				fontSize: '0.85rem',
				px: 2.5, py: 1,
				borderRadius: `${radius.sm}px`,
				whiteSpace: 'nowrap',
			}}>
				{cta}
			</Box>
		</Box>
	);
}

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
					const colors = palette.serviceIcons[ICON_TOKEN[service.icon] ?? 'storage'];
					return (
						<Card key={service.name} sx={{
							display: 'flex',
							flexDirection: 'column',
							height: '100%',
							boxShadow: shadow.card,
							borderRadius: `${radius.lg}px`,
							border: '1px solid',
							borderColor: 'cardBorder',
							...cardHoverSx,
						}}>
							{/* Icon block */}
							<Box sx={{ display: 'flex', justifyContent: 'center', pt: 3.5, pb: 1 }}>
								<Box sx={{
									width: 64, height: 64,
									borderRadius: `${radius.lg}px`,
									backgroundColor: colors.bg,
									display: 'flex', alignItems: 'center', justifyContent: 'center',
								}}>
									<Icon aria-hidden sx={{ fontSize: 32, color: colors.color }} />
								</Box>
							</Box>

							<CardHeader
								title={service.name}
								slotProps={{ title: { sx: {
									fontSize: { xs: `${type.h3.size[1]}px`, md: `${type.h3.size[0]}px` },
									fontWeight: type.h3.weight,
									lineHeight: type.h3.lh,
									textAlign: 'center',
									color: 'heading',
								} } }}
								sx={{ pb: 0.5, pt: 1 }}
							/>
							<CardContent sx={{
								flexGrow: 1,
								pt: 0.5,
							}}>
								<Typography sx={{
									fontSize: { xs: `${type.body.size[1]}px`, md: `${type.body.size[0]}px` },
									lineHeight: type.body.lh,
									color: 'muted',
									textAlign: 'center',
								}}>
									{service.description}
								</Typography>
							</CardContent>
						</Card>
					);
				})}
			</Box>

			{/* Portal CTA */}
			<BannerCTA
				href="https://portal.it-coder.com"
				external
				gradient={gradients.portal}
				shadow="0 4px 20px rgba(2,132,199,0.25)"
				shadowHover="0 8px 28px rgba(2,132,199,0.35)"
				kicker="Need a dedicated Windows server?"
				headline="Rent a ready-to-use RDP server — manage it from your personal portal"
				cta="Open Portal →"
				pillBg="#fff"
				pillColor="#0284c7"
				ariaLabel="Open the ITCODER portal to rent a ready-to-use Windows RDP server"
			/>

			<ServicesFAQ />

			{/* Project builder CTA */}
			<BannerCTA
				href="#project-builder"
				gradient={gradients.ctaDark}
				shadow="0 4px 20px rgba(15,23,36,0.25)"
				shadowHover="0 8px 28px rgba(15,23,36,0.35)"
				kicker="Not sure where to start?"
				headline="Configure your project in 3 steps — get a plan within 24 hours"
				cta="Start →"
				pillBg={palette.accent[500]}
				pillColor="#fff"
				ariaLabel="Configure your project in the project builder and get a plan within 24 hours"
			/>
		</section>
	);
}
