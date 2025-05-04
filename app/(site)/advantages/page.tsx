import advantages from './advantages.json';
import {IAdvantages} from '@/app/(site)/advantages/interfaces';

export default function Advantages () {
	const advantagesList: IAdvantages[] = advantages
	return (
		<div id="advantages">
			<h1 className={'titlePage'}>Advantages</h1>
			<p>We offer a wide range of services to help you with your IT needs.</p>
			{
				advantagesList.map((advantage: IAdvantages) => (
					<div key={advantage.name}>
						<h1>{advantage.name}</h1>
						<h2>{advantage.description}</h2>
					</div>
				))
			}
		</div>
	)
}
