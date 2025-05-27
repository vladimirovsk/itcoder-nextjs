"use client";
import { Container} from '@mui/material';
import Services from '@/app/(site)/services/page';
import Skills from '@/app/(site)/skills/page';
import Advantages from '@/app/(site)/advantages/page';
import Cases from '@/app/(site)/cases/page';
import Contact from '@/app/(site)/contact/page';

export default function Home() {
    return (
        <Container className={'containerPage'}>
            <Services />
            <Advantages />
            <Skills />
            {/*<Cases />*/}
            <Contact />
        </Container>
    )
}
