import skills from '@/app/data/skills.json';
import {ISkills} from '@/app/(site)/skills/interfaces';


export default function Skills() {
	const skillsList: ISkills[] = skills;
	return (
		<div>
			{
				skillsList.map((skill: ISkills) => (
					<div key={skill.title}>
						<h1>{skill.title}</h1>
						<h2>{skill.subheader}</h2>
					</div>
				))}
		</div>
	)
}
