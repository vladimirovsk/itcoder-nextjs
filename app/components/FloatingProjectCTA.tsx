'use client';

import { useEffect, useState } from 'react';

export default function FloatingProjectCTA() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const heroHeight = window.innerHeight * 0.8;
            const section = document.getElementById('project-builder');
            const sectionTop = section?.getBoundingClientRect().top ?? Infinity;

            // Show after scrolling past 80% of hero, hide when project-builder is in view
            const pastHero = window.scrollY > heroHeight;
            const builderVisible = sectionTop < window.innerHeight * 0.6;

            setVisible(pastHero && !builderVisible);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = () => {
        const section = document.getElementById('project-builder');
        if (!section) return;
        const toolbar = document.querySelector('nav');
        const offset = toolbar ? toolbar.offsetHeight : 0;
        window.scrollTo({
            top: section.getBoundingClientRect().top + window.scrollY - offset - 10,
            behavior: 'smooth',
        });
    };

    return (
        <button
            onClick={handleClick}
            aria-label="Build your project"
            style={{
                position: 'fixed',
                bottom: '7rem',
                right: '1.25rem',
                zIndex: 1200,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#F97316',
                color: '#fff',
                border: 'none',
                borderRadius: '999px',
                padding: '10px 18px',
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(249,115,22,0.45)',
                transition: 'opacity 0.3s, transform 0.3s',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                pointerEvents: visible ? 'auto' : 'none',
                fontFamily: 'inherit',
            }}
        >
            <span style={{ fontSize: '1rem' }}>🛠</span>
            Build Your Project
        </button>
    );
}
