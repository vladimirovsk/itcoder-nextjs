import { useCallback, useRef, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from '../../ThemeContext';

const toSectionId = (item: string) => item.toLowerCase().replace(/\s+/g, '-');

export const NAV_ITEMS = ['Services', 'Advantages', 'Skills', 'Projects', 'Project Builder', 'Contact'];

export function useHeader() {
    const [activeItem, setActiveItem] = useState('Home');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isManuallySet, setIsManuallySet] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);
    const resetTimerRef = useRef<NodeJS.Timeout | null>(null);
    
    const { mode, isHydrated, toggleTheme } = useTheme();
    const pathname = usePathname();
    const isBlog = pathname?.startsWith('/blog') ?? false;
    const isHome = pathname === '/';

    const fromSectionId = useCallback((id: string) =>
        NAV_ITEMS.find(i => toSectionId(i) === id) ?? (id.charAt(0).toUpperCase() + id.slice(1)),
    []);

    const checkActiveSection = useCallback(() => {
        if (isManuallySet) return;
        const sections = NAV_ITEMS.map(item => document.getElementById(toSectionId(item))).filter(Boolean);
        if (sections.length === 0) return;

        const scrollPosition = window.scrollY + window.innerHeight / 3;
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            if (!section) continue;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                setActiveItem(fromSectionId(section.id));
                return;
            }
        }
        if (scrollPosition < (sections[0]?.offsetTop || 0)) {
            setActiveItem('Home');
        }
    }, [isManuallySet, fromSectionId]);

    const handleScroll = useCallback(() => {
        if (isManuallySet) {
            if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
            scrollTimerRef.current = setTimeout(() => {
                setIsManuallySet(false);
                scrollTimerRef.current = null;
            }, 1000);
        } else {
            checkActiveSection();
        }
    }, [checkActiveSection, isManuallySet]);

    useEffect(() => {
        if (typeof window === 'undefined' || !window.location.hash) return;
        const sectionId = window.location.hash.substring(1);
        const timer = setTimeout(() => {
            const section = document.getElementById(sectionId);
            if (!section) return;
            setActiveItem(fromSectionId(sectionId));
            setIsManuallySet(true);
            const toolbar = document.querySelector('nav');
            const toolbarHeight = toolbar ? toolbar.offsetHeight : 0;
            const offsetPosition = section.getBoundingClientRect().top + window.pageYOffset - toolbarHeight;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timer);
    }, [fromSectionId, pathname]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        checkActiveSection();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll, checkActiveSection]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (isManuallySet) {
            if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
            resetTimerRef.current = setTimeout(() => {
                setIsManuallySet(false);
                resetTimerRef.current = null;
            }, 5000);
        }
    }, [isManuallySet]);

    return {
        activeItem,
        anchorEl,
        setAnchorEl,
        mobileMenuOpen,
        setMobileMenuOpen,
        isManuallySet,
        setIsManuallySet,
        scrolled,
        mode,
        toggleTheme,
        isHydrated,
        isBlog,
        isHome,
        handleMenuOpen: (e: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(e.currentTarget);
            setMobileMenuOpen(true);
        },
        handleMenuClose: () => {
            setAnchorEl(null);
            setMobileMenuOpen(false);
        },
        handleNavItemClick: (item: string, event?: React.MouseEvent) => {
            const sectionId = toSectionId(item);
            const section = document.getElementById(sectionId);
            if (!section) return;
            if (event) event.preventDefault();
            setActiveItem(item);
            setIsManuallySet(true);
            setMobileMenuOpen(false);
            setAnchorEl(null);
            const toolbar = document.querySelector('nav');
            const toolbarHeight = toolbar ? toolbar.offsetHeight : 0;
            const offsetPosition = section.getBoundingClientRect().top + (window.pageYOffset - 10) - toolbarHeight;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        },
        fromSectionId
    };
}
