import {IService} from '@/app/(site)/services/interfaces';
import services from '@/app/(site)/services/services.json';

export default function Services () {
	const servicesList: IService[] = services
	return (
		<div id="services">
			<h1 className={'titlePage'}>Services</h1>
			<p>We offer a wide range of services to help you with your IT needs.</p>
			{
				servicesList.map((service: IService) => (
					<div key={service.name}>
						<h1>{service.name}</h1>
						<h2>{service.description}</h2>
					</div>
				))
			}
		</div>
	)
}
