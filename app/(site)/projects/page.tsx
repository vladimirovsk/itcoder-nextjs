"use client";

import { useState, useEffect } from 'react'
import {Project} from '@/app/(site)/projects/interfaces';

export default function Projects() {
	const [projects, setProject] = useState<Project[]>([])

		useEffect(() => {
			async function fetchProjects() {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API}/project`, {
					cache: 'force-cache',
				})
				const data: Project[] = await res.json();
				setProject(data);
			}

			fetchProjects()
		},
			[]);

	if (!projects) return <div>Loading...</div>;
	return (
		<div>PROJECTS
			{
				projects.map((project: Project) => (
				<div key={project._id}>
					<h2>{project.title}</h2>
				</div>
			))}
		</div>
	)
}
