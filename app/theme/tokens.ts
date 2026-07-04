/**
 * ITCODER — Design Tokens (single source of truth)
 * ------------------------------------------------------------------
 * Phase 1 deliverable (ITC-13). These tokens capture the colors,
 * spacing, radii, shadows and typographic scale that are TODAY scattered
 * as string literals across ~18 components. Import from here instead of
 * hardcoding hex values so the palette stays consistent and themeable.
 *
 * This module is ADDITIVE and non-breaking: nothing imports it yet.
 * The migration into app/theme.tsx is described in docs/design-system.md
 * and should be done incrementally, with engineer review.
 */

/* ── Brand & neutral palette ─────────────────────────────────────── */
export const palette = {
  /** Primary — calm indigo. Replaces the legacy electric #1e41da and the
   *  stale MUI palette value #1E3A8A which no components actually use. */
  brand: {
    50: '#EEF2FF',
    100: '#F0F2FF',
    500: '#3B5BDB', // primary
    600: '#2D4AC7', // primary hover / pressed
    300: '#7B9EF9', // soft sky — active nav on dark, gradient tail
  },
  /** Accent — CTA orange. One canonical pair; retires #F58D1E/#e17a0e. */
  accent: {
    500: '#F97316', // CTA
    600: '#E0620A', // CTA hover
    tint: '#FFF7ED',
  },
  /** Neutral slate ramp — text, borders, surfaces (light mode). */
  slate: {
    900: '#0F1724', // dark surfaces (header hero, contact sidebar base)
    850: '#0D1526', // footer
    800: '#1E293B', // headings / titlePage
    600: '#475569', // body / nav idle  (AA on #F3F4F6)
    500: '#64748B', // muted / captions (AA on #FFFFFF, borderline — see doc)
    200: '#E2E8F0', // hairline borders
    100: '#F1F5F9', // card borders
    50: '#F8FAFC', // subtle surface
  },
  bg: {
    default: '#F3F4F6', // app background (light)
    paper: '#FFFFFF',
    darkDefault: '#121212', // app background (dark)
  },
  /** Status. Green is used for the "Available for hire" badge. */
  status: {
    success: '#16A34A',
    successBright: '#4ADE80',
  },
  /** Per-service icon accents (services section). */
  serviceIcons: {
    api: { bg: '#FFF7ED', color: '#EA580C' },
    ai: { bg: '#F5F3FF', color: '#7C3AED' },
    payments: { bg: '#F0FDF4', color: '#16A34A' },
    storage: { bg: '#EEF2FF', color: '#3B5BDB' },
    web: { bg: '#F0F9FF', color: '#0284C7' },
  },
} as const;

/* ── Gradients ───────────────────────────────────────────────────── */
export const gradients = {
  brandRule: 'linear-gradient(90deg, #3B5BDB 0%, #7B9EF9 100%)', // titlePage underline
  contactSidebar: 'linear-gradient(160deg, #0F1724 0%, #1A2D5A 100%)',
  ctaDark: 'linear-gradient(135deg, #0F1724 0%, #1A2D5A 100%)',
  portal: 'linear-gradient(135deg, #0C4A6E 0%, #0284C7 100%)',
  heroScrim: 'linear-gradient(to bottom, rgba(15,23,36,0.45) 0%, rgba(15,23,36,0.8) 100%)',
} as const;

/* ── Spacing scale (4px base) ────────────────────────────────────── */
/** Matches MUI's default 8px step at s=2. Use theme.spacing() where possible. */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
} as const;

/* ── Radius scale ────────────────────────────────────────────────── */
/** Consolidates the ad-hoc 8/10/14/16 currently in use into a ramp. */
export const radius = {
  sm: 8, // buttons, small chips
  md: 12, // inputs, FAQ items
  lg: 16, // cards (canonical)
  pill: 100,
} as const;

/* ── Elevation / shadows ─────────────────────────────────────────── */
export const shadow = {
  card: '0px 1px 4px rgba(0,0,0,0.07)',
  cardHover: '0px 8px 24px rgba(59,91,219,0.12)', // brand-tinted lift
  cta: '0 4px 14px rgba(249,115,22,0.32)',
  ctaHover: '0 6px 18px rgba(249,115,22,0.42)',
  navScrolled: '0 1px 12px rgba(0,0,0,0.10)',
  navTop: '0 1px 0 rgba(0,0,0,0.06)',
} as const;

/** Canonical card hover interaction — reuse instead of re-declaring. */
export const cardHoverSx = {
  transition: 'box-shadow 0.25s, transform 0.25s',
  '&:hover': {
    boxShadow: shadow.cardHover,
    transform: 'translateY(-3px)',
  },
} as const;

/* ── Typography scale ────────────────────────────────────────────── */
export const font = {
  family: 'Inter, Geist, Roboto, sans-serif',
  weight: { regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800 },
} as const;

/** Responsive type ramp. `[desktop, mobile]` px. lh = line-height. */
export const type = {
  hero: { size: [60, 30], lh: 1.1, weight: 800, tracking: '-0.025em' },
  h1: { size: [40, 30], lh: 1.2, weight: 800, tracking: '-0.02em' },
  h2: { size: [28, 24], lh: 1.25, weight: 800, tracking: '-0.02em' }, // titlePage
  h3: { size: [22, 20], lh: 1.3, weight: 700 },
  h4: { size: [20, 18], lh: 1.35, weight: 700 },
  h5: { size: [18, 17], lh: 1.4, weight: 600 },
  h6: { size: [16, 15], lh: 1.4, weight: 600 },
  bodyLg: { size: [20, 16], lh: 1.6, weight: 400 },
  body: { size: [16, 15], lh: 1.65, weight: 400 },
  small: { size: [14, 13], lh: 1.6, weight: 400 },
} as const;

/* ── Motion ──────────────────────────────────────────────────────── */
export const motion = {
  fast: '0.2s',
  base: '0.25s',
  slow: '0.3s',
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

/* ── Breakpoints (mirror MUI defaults used across the app) ───────── */
export const breakpoints = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 } as const;

/** Focus ring for a11y — apply on :focus-visible for keyboard users. */
export const focusRing = {
  outline: `2px solid ${palette.brand[500]}`,
  outlineOffset: '2px',
} as const;
