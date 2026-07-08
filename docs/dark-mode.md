# Dark mode — design spec (ITC-33 / Phase 6)

Owner: Web Designer · Status: palette shipped in tokens, content sweep pending
Depends on: ITC-15 (Phase 3 tokenization) — done.

This resolves **decision B** from the Phase 1 audit (`design-system.md` §B) and
finding **F5** ("dark mode is effectively broken for content"). Phase 3 routed
all section colors through `app/theme/tokens.ts`, which is the precondition:
we now only have to map each **role** to a dark value, not re-audit every hex.

Deploy only on approval. The theme toggle button stays commented out until the
content sweep below lands, so shipping the palette is non-breaking.

---

## 1. The dark ramp

Added to `palette.dark` in `app/theme/tokens.ts`. Slate-tinted (cool), **not**
pure gray, so dark mode stays on-brand with the light slate ramp. Surfaces step
**lighter** as elevation increases; text steps **down** in emphasis.

| Token | Hex | Role |
|---|---|---|
| `dark.bg` | `#121212` | Base app background (elevation 0). Alias of `bg.darkDefault`. |
| `dark.surface` | `#1A1D24` | Cards, paper, nav bar, footer (elevation +1) |
| `dark.surfaceAlt` | `#242832` | Inputs, hover states, chips, FAQ items (elevation +2) |
| `dark.border` | `#2E3440` | Hairline dividers between sections/cards |
| `dark.borderStrong` | `#363C4A` | Input borders, control outlines |
| `dark.text` | `#E6E9EF` | High-emphasis: headings **and** body |
| `dark.textMuted` | `#A7B0C0` | Medium-emphasis: captions, secondary, nav idle |
| `dark.textFaint` | `#808A99` | Low-emphasis: disabled, placeholders |

Brand/accent are **reused**, not re-defined:
- **Primary on dark** = `brand.300` `#7B9EF9` (the soft sky already reserved for
  dark active states in Phase 1). 7.2:1 on `dark.bg`.
- **CTA** = `accent.500` `#F97316` unchanged. 6.7:1 on `dark.bg`.

## 2. Contrast — all pairs ≥ WCAG AA (4.5:1 body)

| Foreground | on `dark.bg` | on `dark.surface` | on `dark.surfaceAlt` |
|---|---|---|---|
| `dark.text` #E6E9EF | 15.4 | 13.9 | 12.1 |
| `dark.textMuted` #A7B0C0 | 8.6 | 7.7 | — |
| `dark.textFaint` #808A99 | 5.4 | 4.8 | 4.2* |
| `brand.300` #7B9EF9 | 7.2 | 6.5 | 5.7 |
| `accent.500` #F97316 | 6.7 | 6.0 | — |

\* `textFaint` on `surfaceAlt` is 4.2:1 — reserved for disabled/placeholder only,
where the 3:1 large/non-essential threshold applies. Do not use `textFaint` for
essential body copy on elevated surfaces.

Borders are decorative separators (no contrast requirement); `dark.border` is a
subtle ~1.35:1 step off `surface`, `borderStrong` ~1.7:1 off `bg`.

## 3. Role mapping — light → dark

Map by **role**, never by matching hex. Reference table for the sweep:

| Light usage | Light token | → Dark token |
|---|---|---|
| Page background | `bg.default` #F3F4F6 | `dark.bg` |
| Card / paper / white surface | `bg.paper` / `white` | `dark.surface` |
| Subtle surface, FAQ, input fill | `slate.50` #F8FAFC | `dark.surfaceAlt` |
| Heading | `slate.800` #1E293B | `dark.text` |
| Body copy | `slate.600` #475569 | `dark.text` (bump; muted is too faint for body) |
| Caption / muted / nav idle | `slate.500` #64748B | `dark.textMuted` |
| Hairline border | `slate.200` #E2E8F0 | `dark.border` |
| Card border | `slate.100` #F1F5F9 | `dark.border` |
| Primary link / active | `brand.500` #3B5BDB | `brand.300` #7B9EF9 |
| CTA | `accent.500` | `accent.500` (unchanged) |

Dark hero/footer/contact-sidebar surfaces (`slate.900`/`slate.850`, the
`contactSidebar`/`ctaDark` gradients) are **already dark** — leave them; they read
correctly on both modes. Do not lighten them to `dark.surface`.

## 4. What has shipped vs. what remains

**Shipped (this issue, non-breaking):**
- `palette.dark` ramp in `tokens.ts`.
- `darkTheme` in `theme.tsx` now routes `background.default/paper`, `text.*`,
  `divider`, `primary`, `secondary` through the tokens (was a stub `#90CAF9`).
- Nav/header chrome (AppBar, header title/nav buttons, menu icon, HomeHeader base)
  aligned to `dark.*` — these already branched on `mode`.

**Remaining — content sweep (engineering, delegated to Web Support Engineer):**
The ~14 content components still hardcode light surfaces (`white`/`#fff` card
backgrounds, `#f8fafc`, `slate.*` text) and **do not branch on `mode`**, so they
won't adapt. Rewire them to read from `theme.palette` (surface/text/divider) or
`useTheme().mode`, using the table in §3. Files:
`advantages`, `services`, `skills`, `cases` (+ `[slug]`), `contact`, `faq`,
`projects`, `project-builder`, `blog` (+ `[slug]`), `ArticleRenderer`,
`AuthorCard`, plus dark rules in `globals.css:45–153`.

Only after the sweep verifies clean: **un-comment the theme toggle button**
(`header/page.tsx`) and QA all sections in both modes at xs/md/lg.
