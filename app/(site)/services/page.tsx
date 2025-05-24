import {IService} from '@/app/(site)/services/interfaces';
import services from '@/app/(site)/services/services.json';
import {Box, Card, CardActions, CardContent, Typography} from '@mui/material';
import OrangeButton from '@/app/(components)/buttons/button';
import Image from 'next/image';
import imageApi from './images/api.png';
import imageDB from './images/databases.png';
import imageSrv from './images/servers.png';
import imageWeb from './images/web.png';

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
		<div id="services" className={'containerPage'}>
			<h1 className={'titlePage'}>Services</h1>
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
					<Card key={`Card${service.name}`} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
						<div className="cardImageContainer">
							<Image 
								src={iconMap[service.icon].src} 
								alt={service.name} 
								className="cardImage"
								width={iconMap[service.icon].width}
								height={iconMap[service.icon].height}
							/>
						</div>
						<CardContent key={`CardContent${service.name}`} sx={{ flexGrow: 1 }}>
							<Typography variant="h5" component="div">
								{service.name}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								{service.description}
							</Typography>
							<Typography variant="body2" >
								Other text sample
							</Typography>
						</CardContent>
						<CardActions key={`CardActions${service.name}`} sx={{ display: 'flex', justifyContent: 'center' }}>
							<OrangeButton size="small">Learn More</OrangeButton>
						</CardActions>
					</Card>
				))}
			</Box>
		</div>
	)
}
