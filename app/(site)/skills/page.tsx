import skills from '@/app/(site)/skills/skills.json';
import {ISkills} from '@/app/(site)/skills/interfaces';


export default function Skills() {
	const skillsList: ISkills[] = skills;
	return (
		<div id="skills">
			<h1 className={'titlePage'}>Skills</h1>
			{
				skillsList.map((skill: ISkills) => (
					<div key={skill.title}>
						<h1>{skill.title}</h1>
						<h2>{skill.subheader}</h2>
					</div>
				))
			}
		</div>
	)
}
