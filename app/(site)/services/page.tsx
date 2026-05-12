import {IService} from '@/app/(site)/services/interfaces';
import services from '@/app/(site)/services/services.json';
import {Box, Card, CardActions, CardContent, CardHeader} from '@mui/material';
import Image from 'next/image';
import imageApi from './images/api.png';
import imageDB from './images/databases.png';
import imageSrv from './images/servers.png';
import imageWeb from './images/web.png';
import ServicesFAQ from './ServicesFAQ';

// Map icon identifiers to imported images
const iconMap: {[key: string]: { src: string, width: number, height: number }} = {
	'api': imageApi,
	'db': imageDB,
	'srv': imageSrv,
	'web': imageWeb
};

export default function Services () {
	const servicesList: IService[] = services
	return (
		<section id="services" className={'containerPage'}>
			<h2 className={'titlePage'}>Services</h2>
			<Box
				sx={{
					width: '100%',
					display: 'grid',
					gridTemplateColumns: {
						xs: 'repeat(1, 1fr)', // 1 column on extra small devices (mobile phones)
						sm: 'repeat(2, 1fr)', // 2 columns on small devices (larger phones/small tablets)
						md: 'repeat(4, 1fr)', // 4 columns on medium devices and up (tablets and desktops)
					},
					gridAutoRows: 'auto',
					gap: 3,
				}}
			>
				{servicesList.map((service: IService) => (
					<Card key={`Card${service.name}`} sx={{
						display: 'flex',
						flexDirection: 'column',
						height: '100%',
						boxShadow: '0px 1px 4px rgba(0,0,0,0.07)',
						borderRadius: '14px',
						border: '1px solid #F1F5F9',
						transition: 'box-shadow 0.25s, transform 0.25s',
						"&:hover": {
							boxShadow: '0px 8px 24px rgba(59,91,219,0.12)',
							transform: 'translateY(-3px)',
						}
					}}>
						<div className="cardImageContainer">
							<Image
								src={iconMap[service.icon].src}
								alt={service.name}
								className="cardImage"
								width={iconMap[service.icon].width}
								height={iconMap[service.icon].height}
								loading="lazy"
							/>
						</div>
						<CardHeader title={service.name} style={{
							marginTop: '2rem',
							height: '5rem',
							backgroundColor: '#FAFBFF',
							textAlign: 'center',
						}}>
							{service.name}
						</CardHeader>
						<CardContent key={`CardContent${service.name}`} sx={{
							flexGrow: 1,
							backgroundColor: '#FAFBFF',
							textAlign: 'justify',
						}}>
								{service.description}
						</CardContent>
						<CardActions key={`CardActions${service.name}`} sx={{ display: 'flex', justifyContent: 'center' }}>
						</CardActions>
					</Card>
				))}
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
	)
}
