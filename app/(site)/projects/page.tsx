export { metadata } from './metadata';
import { IProject, IProjectLink } from './interfaces';
import projects from './projects.json';
import { Box, Card, Chip, Typography } from '@mui/material';
import { palette, shadow, radius, cardHoverSx } from '@/app/theme/tokens';
import FacebookIcon from '@mui/icons-material/Facebook';

function StatusBadge({ live, label }: { live: boolean; label: string }) {
	return (
		<Box sx={{
			display: 'inline-flex',
			alignItems: 'center',
			gap: 0.75,
			backgroundColor: live ? 'rgba(74,222,128,0.15)' : 'rgba(251,191,36,0.15)',
			border: `1px solid ${live ? 'rgba(74,222,128,0.35)' : 'rgba(251,191,36,0.35)'}`,
			borderRadius: '100px',
			px: 1.25,
			py: 0.4,
		}}>
			<Box sx={{
				width: 7,
				height: 7,
				borderRadius: '50%',
				backgroundColor: live ? palette.status.successBright : '#fbbf24',
				flexShrink: 0,
				animation: live ? 'none' : undefined,
			}} />
			<Typography sx={{
				fontSize: '0.72rem',
				fontWeight: 600,
				color: live ? palette.status.successBright : '#fbbf24',
				lineHeight: 1,
				letterSpacing: '0.03em',
			}}>
				{label}
			</Typography>
		</Box>
	);
}

function ProjectCard({ project }: { project: IProject }) {
	return (
		<Card sx={{
			display: 'flex',
			flexDirection: { xs: 'column', md: 'row' },
			borderRadius: `${radius.lg}px`,
			border: `1px solid ${palette.slate[100]}`,
			boxShadow: shadow.card,
			overflow: 'hidden',
			...cardHoverSx,
		}}>
			{/* Brand panel */}
			<Box sx={{
				width: { xs: '100%', md: '280px' },
				minWidth: { md: '280px' },
				minHeight: { xs: '160px', md: 'auto' },
				background: `linear-gradient(145deg, ${project.brandBg} 0%, color-mix(in srgb, ${project.brandBg} 70%, ${project.accentColor}) 100%)`,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				p: { xs: 3, md: 3.5 },
				position: 'relative',
				overflow: 'hidden',
			}}>
				{/* Decorative circle */}
				<Box sx={{
					position: 'absolute',
					width: 180,
					height: 180,
					borderRadius: '50%',
					border: `1px solid ${project.accentColor}22`,
					bottom: -50,
					right: -50,
					pointerEvents: 'none',
				}} />
				<Box sx={{
					position: 'absolute',
					width: 120,
					height: 120,
					borderRadius: '50%',
					border: `1px solid ${project.accentColor}15`,
					bottom: -20,
					right: 20,
					pointerEvents: 'none',
				}} />

				<Box>
					{/* Accent line */}
					<Box sx={{
						width: 36,
						height: 3,
						backgroundColor: project.accentColor,
						borderRadius: 2,
						mb: 2.5,
					}} />
					<Typography sx={{
						fontWeight: 800,
						fontSize: { xs: '1.75rem', md: '2rem' },
						color: '#ffffff',
						lineHeight: 1.1,
						letterSpacing: '-0.03em',
						mb: 1.5,
						textShadow: '0 2px 16px rgba(0,0,0,0.3)',
					}}>
						{project.name}
					</Typography>
					<Typography sx={{
						fontSize: '0.82rem',
						color: 'rgba(255,255,255,0.6)',
						lineHeight: 1.5,
						mb: 2,
					}}>
						{project.tagline}
					</Typography>
				</Box>

				<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 'auto' }}>
					<StatusBadge live={project.statusLive} label={project.status} />
					{project.categories.map((cat) => (
						<Box key={cat} sx={{
							fontSize: '0.72rem',
							fontWeight: 600,
							color: project.accentColor,
							backgroundColor: `${project.accentColor}18`,
							border: `1px solid ${project.accentColor}35`,
							borderRadius: '100px',
							px: 1.25,
							py: 0.4,
							lineHeight: 1.4,
							letterSpacing: '0.02em',
						}}>
							{cat}
						</Box>
					))}
				</Box>
			</Box>

			{/* Content panel */}
			<Box sx={{
				flex: 1,
				backgroundColor: '#FAFBFF',
				p: { xs: 3, md: 4 },
				display: 'flex',
				flexDirection: 'column',
				gap: 2.5,
			}}>
				<Typography sx={{
					fontSize: '0.95rem',
					color: palette.slate[600],
					lineHeight: 1.75,
				}}>
					{project.description}
				</Typography>

				{project.currentWork && (
					<Box sx={{
						display: 'flex',
						alignItems: 'flex-start',
						gap: 1.25,
						backgroundColor: `${project.accentColor}0D`,
						border: `1px solid ${project.accentColor}30`,
						borderRadius: '8px',
						px: 1.75,
						py: 1.25,
					}}>
						<Box sx={{
							width: 8,
							height: 8,
							borderRadius: '50%',
							backgroundColor: project.accentColor,
							flexShrink: 0,
							mt: '5px',
							boxShadow: `0 0 0 3px ${project.accentColor}25`,
							animation: 'pulse 2s ease-in-out infinite',
							'@keyframes pulse': {
								'0%, 100%': { boxShadow: `0 0 0 3px ${project.accentColor}25` },
								'50%': { boxShadow: `0 0 0 6px ${project.accentColor}10` },
							},
						}} />
						<Box>
							<Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: project.accentColor, letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1, mb: 0.5 }}>
								Currently working on
							</Typography>
							<Typography sx={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
								{project.currentWork}
							</Typography>
						</Box>
					</Box>
				)}

				{/* Features */}
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
					{project.features.map((feature) => (
						<Box key={feature} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}>
							<Box sx={{
								width: 6,
								height: 6,
								borderRadius: '50%',
								backgroundColor: project.accentColor,
								flexShrink: 0,
								mt: '7px',
							}} />
							<Typography sx={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.6 }}>
								{feature}
							</Typography>
						</Box>
					))}
				</Box>

				{/* Footer: tech chips + button */}
				<Box sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					flexWrap: 'wrap',
					gap: 2,
					mt: 'auto',
					pt: 1.5,
					borderTop: `1px solid ${palette.slate[200]}`,
				}}>
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
						{project.tech.map((t) => (
							<Chip
								key={t}
								label={t}
								size="small"
								sx={{
									fontSize: '0.75rem',
									fontWeight: 500,
									backgroundColor: palette.brand[50],
									color: palette.brand[500],
									border: '1px solid #C7D2FE',
									height: '24px',
									'& .MuiChip-label': { px: 1.25 },
								}}
							/>
						))}
					</Box>

					<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
						{project.links.map((link: IProjectLink) => (
							<Box
								key={link.url}
								component="a"
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								sx={{
									display: 'inline-flex',
									alignItems: 'center',
									gap: 0.75,
									fontSize: '0.85rem',
									fontWeight: 600,
									textDecoration: 'none',
									borderRadius: '8px',
									px: 2,
									py: 0.75,
									transition: 'background-color 0.2s, color 0.2s',
									flexShrink: 0,
									...(link.primary ? {
										backgroundColor: project.accentColor,
										color: '#ffffff',
										'&:hover': { filter: 'brightness(1.1)' },
									} : {
										color: project.accentColor,
										border: `1.5px solid ${project.accentColor}`,
										backgroundColor: 'transparent',
										'&:hover': { backgroundColor: `${project.accentColor}12` },
									}),
								}}
							>
								{link.label} →
							</Box>
						))}
					</Box>
				</Box>
			</Box>
		</Card>
	);
}

export default function Projects() {
	const projectsList: IProject[] = projects;

	return (
		<section id="projects" style={{ width: '100%' }}>
			<h2 className="titlePage">Our Products</h2>
			<p className="subTitlePage" style={{ textAlign: 'center', marginBottom: '2.5rem', maxWidth: '540px', margin: '0 auto 2.5rem' }}>
				Real products built from concept to production — spanning web, mobile, IoT hardware, and embedded firmware
			</p>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
				{projectsList.map((project) => (
					<ProjectCard key={project.name} project={project} />
				))}
			</Box>

			{/* Facebook development updates */}
			<Box sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 1.5,
				py: 2.5,
				pb: 5,
				borderTop: `1px solid ${palette.slate[200]}`,
			}}>
				<FacebookIcon sx={{ color: '#1877F2', fontSize: '1.3rem' }} />
				<Typography sx={{ fontSize: '0.875rem', color: palette.slate[500] }}>
					Follow development updates on{' '}
					<Box
						component="a"
						href="https://www.facebook.com/profile.php?id=61575213251739"
						target="_blank"
						rel="noopener noreferrer"
						sx={{
							color: '#1877F2',
							fontWeight: 600,
							textDecoration: 'none',
							'&:hover': { textDecoration: 'underline' },
						}}
					>
						our Facebook page
					</Box>
				</Typography>
			</Box>
		</section>
	);
}