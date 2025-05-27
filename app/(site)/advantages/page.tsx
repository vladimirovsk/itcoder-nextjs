import advantages from './advantages.json';
import {IAdvantages} from '@/app/(site)/advantages/interfaces';
import {Box, Card, CardContent, CardHeader} from '@mui/material';
import Image from 'next/image';
import imageBrand from './images/Brand.png';
import imageCommand from './images/Command.png';
import imageProject from './images/Project.png';
import imageRocket from './images/Rocket.png';
import imageStar from './images/Star.png';
import imageWorld from './images/World.png';

export default function Advantages () {
	const advantagesList: IAdvantages[] = advantages

	const iconMap: {[key: string]: { src: string }} = {
		'Brand': imageBrand,
		'Command': imageCommand,
		'Project': imageProject,
		'Rocket': imageRocket,
		'Star': imageStar,
		'World': imageWorld
	};

	// Custom image component with fallback
	const IconImage = ({ icon, alt }: { icon: string, alt: string }) => {
		return (
			<div style={{
				position: 'absolute',
				top: '-30px',
				left: '50%',
				transform: 'translateX(-50%)',
				width: '82px',
				height: '82px',
				borderRadius: '8px',
				zIndex: 1,
				padding: 0,
				margin: 0,
				overflow: 'hidden'
			}}>
				<Image
					src={icon}
					alt={alt}
					width={82}
					height={82}
					style={{
						objectFit: 'cover',
						borderRadius: '8px'
					}}
				/>
			</div>
		);
	};

	return (
		<div id="advantages">
			<h1 className={'titlePage'}>Advantages of working with me</h1>
			<h2 className='subTitlePage' style={{
				fontSize: '1.2rem',
				textAlign: 'center',
				marginTop: '1rem',
				fontWeight: 500,
				lineHeight: 1.5,
				maxWidth: '800px',
				marginLeft: 'auto',
				marginRight: 'auto',
			}}>Work for results.</h2>
			<Box
				sx={{
					width: '100%',
					display: 'grid',
					marginTop: '2rem',
					spacing: 20,
					gridTemplateColumns: {
						xs: 'repeat(1, 1fr)', // 1 column on mobile
						sm: 'repeat(2, 1fr)', // 2 columns on tablets
						md: 'repeat(3, 1fr)', // 3 columns on desktop
					},
					gap: 3,
					columnGap: 8, // Increased column spacing
					rowGap: 6, // Increased row spacing
				}}
			>
				{
					advantagesList.map((advantage: IAdvantages, index) => (
						<Card key={`${advantage.name}-${index}`} sx={{
							width: '100%',
							position: 'relative',
							mt: 6,
							overflow: 'visible',
							borderRadius: '16px',
							boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
						 }}>
							<IconImage key={`Image=${advantage.name}`} icon={iconMap[advantage.icon].src} alt={advantage.name} />
							<CardHeader title={advantage.name}
							            key={`${advantage.name}-header-${index}`}
							            slotProps={{
							                title: { sx: {
												fontSize: '1rem',
									            fontWeight:  800,
											}}
							            }}
							            sx={{
											height: '4rem',
								            textAlign: 'center',
								            marginTop: '50px',
							            }}
							>
								{advantage.name}
							</CardHeader>
							<CardContent
								key={`${advantage.name}-content-${index}`}
								sx={{
									backgroundColor: 'white',
									fontSize: '1rem',
									textAlign: 'justify',
									borderBottomLeftRadius: '16px',
									borderBottomRightRadius: '16px',
								}}
								>
								<h2>{advantage.description}</h2>
							</CardContent>
						</Card>
					))
				}
			</Box>
		</div>
	)
}
