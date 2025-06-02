import {Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';

export default function FAQ() {

	const [expandedAccordion, setAccordionExpanded] = React.useState<string | false>(false);

	const handleAccordionChange =
		(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
			setAccordionExpanded(isExpanded ? panel : false);
		};

	const accordionData = [
		{
			id: 'panel1',
			title: 'How much does development cost?',
			details: [
				'The price depends on the complexity of the project. A simple website starts at $500. Applications start at $1,500. Let\'s discuss it in person.'
			]
		},
		{
			id: 'panel2',
			title: 'How long does the project take?',
			details: [
				'It all depends on the scope and complexity of the task. Small projects can be completed in a few days, larger ones in a few weeks. After discussing the requirements, I will be able to give you an exact timeframe.'
			]
		},
		{
			id: 'panel3',
			title: 'Are you working alone?',
			details: [
				'Yes, I work independently, but thanks to my experience in team development, I build processes to ensure stable, high-quality, and timely results—just like a whole team does.'
			]
		},
		{
			id: 'panel4',
			title: 'What distinguishes your service from other companies?',
			details: [
				'Our service is distinguished by deep technical expertise, an individual approach to each project, and high quality implementation. We don\'t just complete tasks — we offer optimal architectural solutions that ensure scalability, security, and stable operation of products.',
			]
		},
		{
			id: 'panel5',
			title: 'Is it possible to modify someone else\'s code?',
			details: [
				'Yes, the code can be changed. It can be adapted to suit your needs, transferred to another version of the framework, or even rewritten in another programming language.'
			]
		}
	]

	return (
		<div className="containerPage">
			{
				accordionData.map(item=>(
					<Accordion key={item.id} className={'accordion'}
					           defaultExpanded={expandedAccordion === 'panel1'}
					           expanded={expandedAccordion === item.id}
					           onChange={handleAccordionChange(item.id)}
					           style={{
						           backgroundColor: 'white' , color: 'black',
						           borderBottomWidth: '2px',
						           borderBottomStyle: 'solid',
						           borderBottomColor: '#dad9d9',
					           }}
					>

						<AccordionSummary key={`Summary-${item.id}`} className={'accordionSummary'}
						                  expandIcon={<ExpandMoreIcon style={{color: 'black'}}/>}
						>
							<Typography key={`Typography-${item.id}`} component="span" className={'title-accordion'} style={{fontSize: '1.2rem'}}>
								{item.title}
							</Typography>
						</AccordionSummary>
						<AccordionDetails key={`Details-${item.id}`} style={{
							fontSize: '0.9rem', lineHeight: 1.5,
						}}>
							{item.details.map((row, index)=>(
								<div key={`DetailsRow-${index}-${item.id}`} style={{marginBottom: '1rem'}}>{row}</div>
							))}
						</AccordionDetails>
					</Accordion>

				))
			}
		</div>
	);
}
