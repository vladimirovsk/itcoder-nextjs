# ITC-40 — Productivity Review

**Issue:** ITC-40 — Dark mode content sweep + toggle  
**Assigned to:** Web Support Engineer (engineer)  
**Review date:** 2026-07-10  
**Reviewer:** Chief of Staff  
**Status:** Code shipped, pending Visual QA + deploy approval

---

## Executive Summary

ITC-40 is **substantially complete**. The dark-mode engineering sweep (14 content components → semantic tokens) and theme toggle were committed on 2026-07-08 (`7672518`). The remaining work is Visual QA across breakpoints and a deploy — both tracked in `docs/dark-mode.md` and `docs/visual-qa-2026-07.md`.

**Coherence score improved from 8.4 → 8.6/10** during this effort.

---

## Delivery Assessment

### What shipped (2026-07-08)

| Deliverable | Status | Notes |
|-------------|--------|-------|
| `palette.dark` ramp in `tokens.ts` | ✅ Done | Part of ITC-33, foundation for sweep |
| Semantic palette keys (`heading`, `bodyText`, `muted`, `surfaceAlt`, `hairline`, `cardBorder`) | ✅ Done | `theme.tsx` + MUI module augmentation |
| `ThemeContext.tsx` → `<html data-theme={mode}>` | ✅ Done | Enables CSS-class fallback for SSR |
| ~14 content components tokenised | ✅ Done | advantages, services, skills, cases, contact, faq, projects, project-builder, blog, ArticleRenderer, AuthorCard |
| `globals.css` dark-mode CSS overrides | ✅ Done | `.titlePage`, `.subTitlePage`, `.services-faq-*`, `.skeleton-pulse`, `.callout-*` |
| Theme toggle button | ✅ Done | `header/page.tsx`, Brightness4/7 icons, mode-aware AppBar |
| Deps cleanup (nodemailer removed, Next 15.5.20, tailwind 4.3.2) | ✅ Done | Closes high-sev vulnerability |

### In-progress (uncommitted, 12 files)

These are the P0/P1/P2 fixes from the Visual QA report, ready to commit:

| Fix | Priority | File |
|-----|----------|------|
| Skip-to-content link (a11y) | P0 | `globals.css` + `layout.tsx` |
| `.titlePage` mobile `@media` font-size | P0 | `globals.css` |
| `spacing: 20` → `gap: 3` in advantages | P0 | `advantages/page.tsx` |
| Skeleton pulse color → `#E2E8F0` | P1 | `globals.css` |
| Disabled button tokens | P1 | `buttons/button.tsx` |
| Dead CSS `.mainFuturePostContent` removed | P1 | `globals.css` |
| Hero mobile padding `6rem` → `4rem` | P2 | `header/page.tsx` |
| `titlePage--light` text-color doc comment | P2 | `globals.css` |

**Build status:** ✅ Passes (`npm run build` — 27 static pages, 102 kB shared JS)

### Remaining

| Item | Owner | Blocker |
|------|-------|---------|
| Visual QA — test all sections in both modes at xs/md/lg | Web Support Engineer | None |
| Deploy to staging/prod | TBD | Requires explicit approval |

---

## Productivity Analysis

### Strengths

1. **Systematic tokenization approach.** The sweep followed the role-mapping table from `dark-mode.md` — mapping by semantic role, not by matching hex values. This is the correct architectural approach.
2. **Dual-layer strategy.** Used MUI sx tokens for client components + CSS-class fallback (`html[data-theme="dark"]`) for server components. This is a pragmatic solution to Next.js SSR limitations.
3. **Quality documentation.** `dark-mode.md`, `visual-qa-2026-07.md`, and `health-baseline-2026-07.md` form a coherent documentation trail with contrast calculations, section-by-section status, and actionable fix lists.
4. **Security awareness.** Proactively identified and removed the dead `nodemailer` dependency that was the sole high-sev vulnerability.
5. **Visual QA discipline.** The coherence scorecard (8.6/10) with per-dimension scores provides a measurable baseline for future improvements.

### Observations

1. **7h active duration on 2 runs** (per ITC-41 trigger) — this is within normal bounds for a 14-component sweep. The long-active trigger (6h) fired because the work was continuous and involved iterative refinement.
2. **12 files of uncommitted changes** sitting for ~2 days. These are small, reviewable fixes (P0-P2). They should be committed to unblock the Visual QA step.
3. **Server-component limitation** noted in documentation — some components (blog, cases/[slug], services, etc.) only update via CSS fallback at SSR time. This is a known constraint, not a defect, but worth flagging for future phases if full SSR dark-mode parity is required.

### Risk Assessment

| Risk | Level | Mitigation |
|------|-------|------------|
| Uncommitted changes drift | Low | 12 small files, all build-passing |
| Visual QA reveals regressions | Low | Token-based approach is additive, not breaking |
| Deploy without QA sign-off | Medium | **Blocked** by approval gate in `dark-mode.md` |

---

## Recommendation

1. **Commit the 12-file Visual QA fix set** as `fix: visual QA P0/P1/P2 corrections (ITC-40)` — this unblocks the remaining work.
2. **Assign Visual QA** to Web Support Engineer — test all sections in both light/dark modes at xs/md/lg breakpoints.
3. **Schedule deploy** only after Visual QA sign-off from the user / Chief of Staff.
4. **Consider follow-up issue** for server-component dark-mode parity (Phase 7 candidate) if full SSR theme switching is needed.

**Overall verdict: Strong delivery.** The dark-mode initiative (ITC-33 → ITC-40) is one of the most architecturally sound efforts in the project history. The token-first approach, documentation quality, and security remediation demonstrate senior-level engineering discipline.
