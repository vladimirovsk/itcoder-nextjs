"use client";
import {useEffect, useState} from 'react';

interface ISkills {
    _id?: string,
    title: string,
    subheader: string,
    hidden: boolean,
    disabled: boolean,
    frameworks: {name: string}[]
}
export default function Home() {
    const [skills, setSkills] = useState<ISkills[]>([])
    useEffect(() => {
            async function fetchSkills() {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API}/skills`, {
                    cache: 'force-cache',
                })
                const data: ISkills[] = await res.json();
                setSkills(data);
            }
            fetchSkills()
        },
        []);

    if (!skills) return <div>Loading...</div>;

    return (
        <div>
            Skills:
            {
                skills.map((skill: ISkills) => (
                    <div key={skill._id}>
                        <h2>{skill.title}</h2>
                    </div>
                ))}
        </div>
    )
}
