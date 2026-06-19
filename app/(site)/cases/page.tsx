'use client';

import cases from './cases.json';
import {ICases} from './interfaces';
import {Card, CardContent, CardHeader, Container, Grid, Pagination, Stack} from '@mui/material';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


import webPages from './images/webPages.png';
import restApi from './images/restApi.png';
import payTerminal from './images/payTerminal.png';
import cryptoData from './images/cryptoData.png';
import mobileApp from './images/mobileApp.png';
import counterData from './images/counterData.png';
import blockchainBackend from './images/blockchainBackend.png';

const imageMap: {[key: string]: { src: string, width: number, height: number }} = {
	'webPages': webPages,
	'restApi': restApi,
	'payTerminal': payTerminal,
	'cryptoData': cryptoData,
	'mobileApp': mobileApp,
	'counterData': counterData,
	'blockchainBackend': blockchainBackend
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
		<section id="cases" style={{
			position: 'relative',
			width: '100%',
		}}>
			<h2 className={'titlePage'}>Cases</h2>
			<Container component='div' maxWidth={false} disableGutters={true} style={{ paddingBottom: '40px', width: '100%', margin: 0, padding: 0 }}>
				<Stack spacing={2} style={{ width: '100%', display: 'flex', alignItems: 'stretch' }}>
					<Grid container spacing={4} columns={12} style={{ width: '100%' }}>
						{groupedCases[page-1].map((caseItem, index) => (
							<Grid size={{xs:12, sm:4}} key={index}>
								<Card sx={{
									display: 'flex',
									flexDirection: 'column',
									height: '100%',
									borderRadius: '14px',
									border: '1px solid #F1F5F9',
									boxShadow: '0px 1px 4px rgba(0,0,0,0.07)',
									overflow: 'hidden',
									transition: 'box-shadow 0.25s, transform 0.25s',
									'&:hover': {
										boxShadow: '0px 8px 24px rgba(59,91,219,0.12)',
										transform: 'translateY(-3px)',
									},
								}}>
									<div className="cardImageContainer">
										<Image
											src={imageMap[caseItem.image].src}
											alt={caseItem.title}
											className="cardImage"
											width={imageMap[caseItem.image].width}
											height={imageMap[caseItem.image].height}
											loading="lazy"
										/>
									</div>
									<CardHeader title={caseItem.title} style={{
										marginTop: '2rem',
										height: '5rem',
										backgroundColor: '#FAFBFF',
										textAlign: 'center',
									}} />
									<CardContent sx={{
										flexGrow: 1,
										backgroundColor: '#FAFBFF',
										textAlign: 'justify',
										color: '#475569',
									}}>
										{caseItem.subheader}
									</CardContent>
									{caseItem.slug && (
										<Link
											href={`/cases/${caseItem.slug}`}
											style={{
												display: 'block',
												backgroundColor: '#FAFBFF',
												borderTop: '1px solid #eef2ff',
												color: '#3B5BDB',
												fontWeight: 700,
												fontSize: '0.9rem',
												textAlign: 'center',
												padding: '14px',
												textDecoration: 'none',
											}}
										>
											Read case study →
										</Link>
									)}
								</Card>
							</Grid>
						))}
					</Grid>
					<div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'center', width: '100%' }}>
						<Pagination count={groupedCases.length} page={page} onChange={handleChange} />
					</div>
				</Stack>
			</Container>
		</section>
	)
}
