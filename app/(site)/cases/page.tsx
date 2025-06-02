'use client';

import cases from './cases.json';
import {ICases} from './interfaces';
import {Card, CardContent, CardHeader, Container, Grid, Pagination, Stack} from '@mui/material';
import React from 'react';
import Image from 'next/image';


import webPages from './images/webPages.png';
import restApi from './images/restApi.png';
import payTerminal from './images/payTerminal.png';
import cryptoData from './images/cryptoData.png';
import mobileApp from './images/mobileApp.png';
import counterData from './images/counterData.png';

const imageMap: {[key: string]: { src: string, width: number, height: number }} = {
	'webPages': webPages,
	'restApi': restApi,
	'payTerminal': payTerminal,
	'cryptoData': cryptoData,
	'mobileApp': mobileApp,
	'counterData': counterData,
};

export default function Cases() {
	const casesList: ICases[] = cases.filter((caseItem) => caseItem.hidden !== true);

	const [page, setPage] = React.useState(1);
	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	// Group cases into sets of 3
	const groupedCases = [];
	for (let i = 0; i < casesList.length; i += 3) {
		groupedCases.push(casesList.slice(i, i + 3));
	}

	return (
		<div id="cases" style={{
			position: 'relative',
			width: '100%',
		}}>
			<h1 className={'titlePage'}>Cases</h1>
			<Container component='div' maxWidth={false} disableGutters={true} style={{ paddingBottom: '40px', width: '100%', margin: 0, padding: 0 }}>
				<Stack spacing={2} style={{ width: '100%', display: 'flex', alignItems: 'stretch' }}>
					<Grid container spacing={4} columns={12} style={{ width: '100%' }}>
						{groupedCases[page-1].map((caseItem, index) => (
							<Grid size={{xs:12, sm:4}} key={index}>
								<Card sx={{
									display: 'flex',
									flexDirection: 'column',
									height: '100%',
								}}>
									<div className="cardImageContainer">
										<Image
											src={imageMap[caseItem.image].src}
											alt={caseItem.title}
											className="cardImage"
											width={imageMap[caseItem.image].width}
											height={imageMap[caseItem.image].height}
										/>
									</div>
									<CardHeader title={caseItem.title} style={{
										marginTop: '2rem',
										height: '5rem',
										backgroundColor: '#f5f5f5',
										textAlign: 'center',
									}} />
									<CardContent sx={{
										flexGrow: 1,
										backgroundColor: '#f5f5f5',
										textAlign: 'justify',
									}}>
										{caseItem.subheader}
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
					<div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'center', width: '100%' }}>
						<Pagination count={groupedCases.length} page={page} onChange={handleChange} />
					</div>
				</Stack>
			</Container>
		</div>
	)
}
