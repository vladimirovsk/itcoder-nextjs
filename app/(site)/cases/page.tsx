'use client';

import cases from './cases.json';
import {ICases} from './interfaces';
import {Box, Card, CardContent, CardHeader, Container, Grid, Pagination, Stack, Typography} from '@mui/material';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { palette, shadow, radius, cardHoverSx } from '@/app/theme/tokens';


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

const PER_PAGE = 3;

/** One case card — shared by the desktop paginated grid and the mobile scroll column. */
function CaseCard({ caseItem }: { caseItem: ICases }) {
	return (
		<Card sx={{
			display: 'flex',
			flexDirection: 'column',
			height: '100%',
			borderRadius: `${radius.lg}px`,
			border: `1px solid ${palette.slate[100]}`,
			boxShadow: shadow.card,
			overflow: 'hidden',
			...cardHoverSx,
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
			<CardHeader
				title={caseItem.title}
				sx={{
					mt: '1.5rem',
					minHeight: '3.5rem',
					backgroundColor: palette.slate[50],
					textAlign: 'center',
				}}
			/>
			<CardContent sx={{
				flexGrow: 1,
				backgroundColor: palette.slate[50],
				textAlign: 'left',
				color: palette.slate[600],
			}}>
				{caseItem.subheader}
			</CardContent>
			{caseItem.slug && (
				<Link
					href={`/cases/${caseItem.slug}`}
					style={{
						display: 'block',
						backgroundColor: palette.slate[50],
						borderTop: `1px solid ${palette.brand[50]}`,
						color: palette.brand[500],
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
	);
}

export default function Cases() {
	const casesList: ICases[] = cases.filter((caseItem) => caseItem.hidden !== true);

	const [page, setPage] = React.useState(1);
	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const pageCount = Math.ceil(casesList.length / PER_PAGE);
	const start = (page - 1) * PER_PAGE;
	const pageItems = casesList.slice(start, start + PER_PAGE);
	const rangeStart = casesList.length === 0 ? 0 : start + 1;
	const rangeEnd = Math.min(start + PER_PAGE, casesList.length);

	return (
		<section id="cases" style={{
			position: 'relative',
			width: '100%',
		}}>
			<h2 className={'titlePage'}>Cases</h2>
			<Container component='div' maxWidth={false} disableGutters={true} style={{ paddingBottom: '40px', width: '100%', margin: 0, padding: 0 }}>
				{/* Mobile (< sm): single scrollable column of ALL cases — no pagination tax. */}
				<Stack spacing={4} sx={{ display: { xs: 'flex', sm: 'none' }, width: '100%', mb: '3rem' }}>
					{casesList.map((caseItem, index) => (
						<CaseCard key={index} caseItem={caseItem} />
					))}
				</Stack>

				{/* Desktop (sm+): 3-up grid + brand pagination + count label. */}
				<Stack spacing={2} sx={{ display: { xs: 'none', sm: 'flex' }, width: '100%', alignItems: 'stretch' }}>
					<Grid container spacing={4} columns={12} style={{ width: '100%' }}>
						{pageItems.map((caseItem, index) => (
							<Grid size={{xs:12, sm:4}} key={index}>
								<CaseCard caseItem={caseItem} />
							</Grid>
						))}
					</Grid>
					<Box sx={{ mb: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, width: '100%' }}>
						<Pagination
							count={pageCount}
							page={page}
							onChange={handleChange}
							sx={{
								'& .MuiPaginationItem-root.Mui-selected': {
									backgroundColor: palette.brand[500],
									color: '#fff',
									'&:hover': { backgroundColor: palette.brand[600] },
								},
							}}
						/>
						<Typography variant="caption" sx={{ color: palette.slate[500] }}>
							Showing {rangeStart}–{rangeEnd} of {casesList.length}
						</Typography>
					</Box>
				</Stack>
			</Container>
		</section>
	)
}
