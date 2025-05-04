"use client";
import { Container} from '@mui/material';
import Services from '@/app/(site)/services/page';
import Projects from '@/app/(site)/projects/page';
import Skills from '@/app/(site)/skills/page';

export default function Home() {
    return (
        <Container className={'containerPage'}>
            <Services />
            <Projects />
            <Skills />
        </Container>
    )
}
