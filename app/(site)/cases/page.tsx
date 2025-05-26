import cases from './cases.json';
import {ICases} from './interfaces';


export default function Cases() {
	const casesList: ICases[] = cases;
	return (
		<div id="cases" style={{
			position: 'relative',
			zIndex: 1, // Ensure Cases is above any potential overlapping elements
			marginTop: '2rem', // Add some top margin for spacing
		}}>
			<h1 className={'titlePage'}>Cases</h1>
			{
				casesList.map((caseItem: ICases) => (
					<div key={caseItem.title}>
						<h1>{caseItem.title}</h1>
						<h2>{caseItem.subheader}</h2>
					</div>
				))
			}
		</div>
	)
}
