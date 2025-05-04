import cases from './cases.json';
import {ICases} from './interfaces';


export default function Cases() {
	const casesList: ICases[] = cases;
	return (
		<div id="cases">
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
