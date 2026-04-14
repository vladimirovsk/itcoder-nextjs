// Server Component — no 'use client'.
// Services and Advantages are server components: their HTML is in the initial response → fast LCP.
// Client-heavy sections (Skills, Cases, Contact) are wrapped in Suspense so the browser
// can paint above-the-fold content immediately while their JS bundles are downloaded.
// FAQ is rendered inside the Services section (IT Services FAQ — Canada).
import { Suspense } from 'react';
import { Container } from '@mui/material';
import Services from '@/app/(site)/services/page';
import Advantages from '@/app/(site)/advantages/page';
import Skills from '@/app/(site)/skills/page';
import Cases from '@/app/(site)/cases/page';
import Contact from '@/app/(site)/contact/page';
import SectionSkeleton from '@/app/components/SectionSkeleton';

export default function Home() {
    return (
        <Container className={'containerPage'}>
            {/* ── Above the fold ─────────────────────────────────────────────────
                Server components → HTML lands in initial response.
                No Suspense needed; they never suspend.                          */}
            <Services />
            <Advantages />

            {/* ── Below the fold ─────────────────────────────────────────────────
                Client components wrapped in Suspense.
                The skeleton fallback renders server-side and is visible while the
                JS chunk for each section downloads and hydrates.                */}
            <Suspense fallback={<SectionSkeleton cols={4} cardHeight={260} />}>
                <Skills />
            </Suspense>

            <Suspense fallback={<SectionSkeleton cols={3} cardHeight={240} />}>
                <Cases />
            </Suspense>

            <Suspense fallback={<SectionSkeleton cols={2} cardHeight={300} withTitle={false} />}>
                <Contact />
            </Suspense>
        </Container>
    );
}
