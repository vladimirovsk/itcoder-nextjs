import projects from '@/app/data/projects.json';
import { IProject } from './interfaces';


export default function Projects() {
	const projectList: IProject[] = projects;

	if (!projectList) return <div>Loading...</div>;
	return (
		<div>
			{
				projectList.map((project: IProject) => (
				<div key={project.name}>
					<h1>{project.name}</h1>
					<h2>{project.description}</h2>
				</div>
			))}
		</div>
	)
}
