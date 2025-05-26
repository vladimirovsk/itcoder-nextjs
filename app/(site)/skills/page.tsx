'use client';
import skills from '@/app/(site)/skills/skills.json';
import {ISkills} from '@/app/(site)/skills/interfaces';
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	CardActions,
	IconButton,
	Collapse,
	List,
	ListItem,
	ListItemIcon, ListItemText, Divider, Container
} from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckIcon from '@mui/icons-material/Check';
import imageFlutter from './images/Flutter.png';
import imageNestJs from './images/Nestjs.png';
import imageNextJs from './images/Reactjs.png';
import imageDB from './images/Database.png';
import imageDelphi from './images/Delphi.png';
import imageServerSetup from './images/ServerSetup.png';
import imageMicrocontroller from './images/Microcontroller.png';
import imageBoard from './images/Board.png';
import backgroundImage from './images/bakgroundImage.png';
import Image from 'next/image';
import {useState} from 'react';

export default function Skills() {
	const skillsList: ISkills[] = skills;
	const [expanded, setExpanded] = useState<number | null>(null);

	const handleExpandClick = (index: number) => {
		setExpanded(prev => prev === index ? null : index);
	};

	const iconMap: {[key: string]: { src: string, width: number, height: number }} = {
		'Flutter': imageFlutter,
		'NestJS': imageNestJs,
		'NextJS': imageNextJs,
		'Database': imageDB,
		'Delphi': imageDelphi,
		'ServerSetup': imageServerSetup,
		'Microcontroller': imageMicrocontroller,
		'Board': imageBoard
	};

	// Custom image component with fallback
	const IconImage = ({ icon, alt }: { icon: string, alt: string }) => {
		return (
			<div style={{
				position: 'absolute',
				width: '62px',
				height: '62px',
				borderRadius: '50%',
				zIndex: 1,
				padding: 0,
				margin: 0,
				overflow: 'hidden',
				left: '4rem',
				top: '-41px',
				transform: 'translateX(-50%)',
				boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.4)',
			}}>

				<Image
					src={icon}
					alt={alt}
					width={82}
					height={82}
					style={{
						objectFit: 'cover',
						borderRadius: '50%'
					}}
				/>
			</div>
		);
	};


	return (
		<Container className="containerPage" maxWidth={false} style={{
			width: '100vw',

			marginLeft: 'calc(-50vw + 50%)',
			marginRight: 0,

			// height: '25rem',
			// position: 'relative',
			// marginBottom: '50vh', // Use viewport height units for more responsive spacing
		}}>
			<Box
				sx={{
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.9)), url(${backgroundImage.src})`,
					backgroundRepeat: 'no-repeat',
					width: '100vw',
					height: '30rem',
					position: 'absolute',
					overflow: 'hidden',
					zIndex: -10, // Ensure proper stacking with Cases component
				}} />
		<Container id="skills" style={{
				maxWidth: '1200px',
				margin: '0 auto',
				padding: '0 1rem',
			}}>
			<h1 className={'titlePage'} style={{
				marginTop: '4rem',
				paddingTop: '4rem',
				color: 'white',
			}}
			>Skills</h1>
			<h3 className={'subTitlePage'} style={{
				color: 'white',
				fontSize: '1.2rem',
				textAlign: 'left',
				marginTop: '1rem',
				fontWeight: 500,
				lineHeight: 1.5,
				maxWidth: '800px',
				marginLeft: 'auto',
				marginRight: 'auto',
				marginBottom: '2rem',
			}}>
				Modern languages and tools enable the creation of fast, reliable, and scalable solutions. Effective development environments for clean code and rapid CI/CD iteration. Application of cloud solutions for system scaling.
			</h3>
			<Box
				sx={{
					width: '100%',
					display: 'grid',
					marginTop: '2rem',
					gridTemplateColumns: {
						xs: 'repeat(1, 1fr)', // 1 column on mobile
						sm: 'repeat(2, 1fr)', // 2 columns on tablets
						md: 'repeat(4, 1fr)', // 4 columns on desktop
					},
					gap: 4,
					rowGap: 6, // Increased row spacing
					columnGap: 8, // Increased column spacing
					alignItems: 'start', // Prevent cards from stretching to match the tallest card
				}}
			>
			{
				skillsList.map((skill: ISkills, index: number  ) => (
					<Card key={`${skill.title}-${index}`}
					      sx={{
						position: 'relative',
						overflow: 'visible',
						width: '100%',
						mt: 6,
						borderRadius: '16px',
						boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
					}}>
						<IconImage key={`Image=${skill.title}`} icon={iconMap[skill.icon].src} alt={skill.title} />
						<CardHeader
							key={`${skill.title}-header-${index}`}
							slotProps={{
								title: { sx: {
										fontSize: '1rem',
										fontWeight:  800,
									}}
							}}
							sx={{
								height: '4rem',
								textAlign: 'center',
								marginTop: '1rem',
							}}
							title={skill.title}
						>
						</CardHeader>
						<Divider key={`${skill.title}-divider-${index}`} />
						<CardContent key={`${skill.title}-content-${index}`}
						             sx={{
							             height: '8rem',
							             backgroundColor: 'white',
							             fontSize: '1rem',
							             textAlign: 'justify',
							             borderBottomLeftRadius: '16px',
							             borderBottomRightRadius: '16px',
						             }}>
							{skill.subheader}
						</CardContent>
						<CardActions 
							disableSpacing 
							sx={{
								display: 'flex',
								justifyContent: 'flex-end',
								backgroundColor: 'transparent',
								margin: '0',
								padding: '0'
							}}
						>
							<IconButton
								id={`Button-${index}`}
								aria-label="show more"
								hidden = {skill.hidden}
								disabled={skill.disabled}
								onClick={() => handleExpandClick(index)}
								style={{ 
									transform: expanded === index ? 'rotate(180deg)' : 'rotate(0deg)',
									transition: 'transform 0.3s'
								}}
							>
								<ExpandMoreIcon />
							</IconButton>
						</CardActions>
						<Collapse in={expanded === index} timeout="auto" unmountOnExit>
							<CardContent sx={{
								backgroundColor: 'white',
								fontSize: '1rem',
								textAlign: 'justify',
								borderBottomLeftRadius: '16px',
								borderBottomRightRadius: '16px',
							}}>
								<List key={'list_'+skill.title}  style={{backgroundColor:'transparent'}}>
									{skill.frameworks.map(fw=>(
										<ListItem key={'list_item'+fw} component="button" dense={true}>
											<ListItemIcon key={'list_item_icon'+fw}><CheckIcon/></ListItemIcon>
											<ListItemText key={'list_item_text'+fw}>
												{fw}
											</ListItemText>
										</ListItem>
									))}
								</List>
							</CardContent>
						</Collapse>
					</Card>
				))
			}
			</Box>
		</Container>
		</Container>
	)
}
