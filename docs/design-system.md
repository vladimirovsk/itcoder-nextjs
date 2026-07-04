# ITCODER — Design System (Phase 1)

> Issue **ITC-13** · Owner: Web Designer · Status: for review by Chief of staff
> Scope: audit of the current UI + a single-source-of-truth token set that
> **extends** the existing MUI theme (`app/theme.tsx`) — not a rewrite.
>
> Companion artifact: **`app/theme/tokens.ts`** (machine-readable tokens, additive/non-breaking).

---

## 1. Audit — current state & visual debt

The site already has a coherent *visual direction* (calm indigo + orange CTA, soft
cards, dark hero/footer). The problem is **not the look — it's the plumbing**: design
decisions live as string literals copy-pasted across components, so they drift.

### 1.1 Findings

| # | Severity | Finding | Evidence |
|---|----------|---------|----------|
| F1 | 🔴 High | **The MUI palette is disconnected from reality.** `theme.tsx` sets `primary.main = #1E3A8A`, but no section uses it — the real primary is `#3B5BDB`, hardcoded everywhere. Components bypass the theme entirely. | `app/theme.tsx:446` vs `header/page.tsx:260`, `services/page.tsx:48`, `globals.css:65` |
| F2 | 🔴 High | **Three different oranges.** Secondary is `#F97316`; the shared button uses `#F58D1E`/`#e17a0e`; hero/CTAs use `#F97316`/`#e0620a`. The one reusable button component is the *odd one out*. | `theme.tsx:450`, `buttons/button.tsx:17`, `header/page.tsx:411` |
| F3 | 🟠 Med | **No typographic scale in the theme.** Only `fontFamily` is set. Every heading size is hardcoded per component (hero `60px` in theme, `h3` in the hero component, `28px` titlePage in CSS). No consistent h1–h6. | `theme.tsx:9`, `globals.css:51`, `header/page.tsx:386` |
| F4 | 🟠 Med | **Radii & shadows are ad hoc.** Radii of 8/10/14/16px appear with no rule; the card shadow + hover-lift pattern is re-declared in every card grid. | `advantages/page.tsx:92`, `services/page.tsx:55` |
| F5 | 🟠 Med | **Dark mode is effectively broken for content.** A `darkTheme` palette exists and the toggle logic is in `ThemeContext`, but the toggle button is commented out and section colors (`#1e293b`, `#f8fafc`, `white` card backgrounds) are hardcoded light — they won't adapt. | `header/page.tsx:206`, `globals.css:45–153` |
| F6 | 🟡 Low | **Dead theme overrides.** `MuiCardContent`/`MuiCardActions` force `#F2F4FF`, but cards override to `white` inline — the global rule never wins. | `theme.tsx:17`, `services/page.tsx:82` |
| F7 | 🟡 Low | **~18 files hardcode brand hex values.** Any palette change is an 18-file find-and-replace. | grep of `#3B5BDB`/`#F97316`/… |

### 1.2 Accessibility (WCAG AA) quick pass

| Pair | Ratio (approx) | AA normal (4.5:1) | Note |
|------|----------------|-------------------|------|
| `#475569` nav on `#F3F4F6` | ~6.5:1 | ✅ Pass | idle nav text |
| `#64748b` caption on `#FFFFFF` | ~4.8:1 | ✅ Pass (tight) | keep for ≥14px only |
| `#1e293b` heading on `#F3F4F6` | ~12:1 | ✅ Pass | |
| `rgba(255,255,255,0.5)` hero trust-row on photo | < 3:1 | ❌ **Fail** | raise to `0.7`+ or darken scrim |
| `rgba(255,255,255,0.45)` "Calgary" on photo | < 3:1 | ❌ **Fail** | same fix |

Other a11y gaps: **no visible `:focus-visible` ring** anywhere (keyboard users are
lost); the theme toggle is unreachable; decorative gradient rule on `titlePage` is
fine (aria-hidden by nature). Motion has no `prefers-reduced-motion` guard.

---

## 2. Design system

### 2.1 Color

**Primary — indigo**
`#EEF2FF`/`#F0F2FF` (tint) · **`#3B5BDB` (500, primary)** · `#2D4AC7` (600, hover) · `#7B9EF9` (300, soft/dark-mode active)

**Accent — orange (CTA only)**
`#FFF7ED` (tint) · **`#F97316` (500)** · `#E0620A` (600, hover)
→ *One pair.* Retire `#F58D1E`/`#e17a0e`.

**Neutral — slate**
`#0F1724` / `#0D1526` (dark surfaces) · `#1E293B` (headings) · `#475569` (body) ·
`#64748B` (muted) · `#E2E8F0` / `#F1F5F9` (borders) · `#F8FAFC` (subtle) · `#F3F4F6` (bg) · `#FFFFFF` (paper)

**Status** `#16A34A` / `#4ADE80` (success/available)

**Rule:** orange = action only. Indigo = brand/interactive/links. Slate = everything else.

### 2.2 Typography — `Inter`

| Token | Desktop / Mobile | Weight | Use |
|-------|------------------|--------|-----|
| hero | 60 / 30 | 800 | home hero H1 |
| h1 | 40 / 30 | 800 | page titles |
| **h2** | **28 / 24** | 800 | section titles (`titlePage`) |
| h3 | 22 / 20 | 700 | card / sub-section |
| bodyLg | 20 / 16 | 400 | intros, subtitles |
| body | 16 / 15 | 400 | paragraphs |
| small | 14 / 13 | 400 | captions, badges |

Weights: 400 / 500 / 600 / 700 / 800. Headings track tight (`-0.02em`); body slightly open (`+0.01em`).

### 2.3 Spacing — 4px base
`4 · 8 · 16 · 24 · 32 · 48 · 64`. Prefer MUI `theme.spacing()` (8px step). Section vertical rhythm: `32px` between blocks, `48–64px` between major sections.

### 2.4 Radius
`sm 8` (buttons/chips) · `md 12` (inputs/FAQ) · **`lg 16` (cards — canonical)** · `pill 100`.
→ Migrate the stray `10`/`14` to this ramp.

### 2.5 Elevation
- Card rest: `0px 1px 4px rgba(0,0,0,0.07)`
- Card hover: `0px 8px 24px rgba(59,91,219,0.12)` + `translateY(-3px)` (brand-tinted lift)
- CTA: `0 4px 14px rgba(249,115,22,0.32)` → hover `0 6px 18px rgba(249,115,22,0.42)`
- Nav (scrolled): `0 1px 12px rgba(0,0,0,0.10)` + `blur(14px)`

Reuse the single `cardHoverSx` helper from `tokens.ts` instead of re-declaring.

### 2.6 States & motion
Every interactive element defines **hover · focus-visible · active · disabled**.
- Focus-visible: `2px solid #3B5BDB`, offset `2px` (**new — currently missing**).
- Disabled buttons: `#FFCCBC` bg / `#BDBDBD` text (from existing button).
- Durations `0.2 / 0.25 / 0.3s`, easing `cubic-bezier(0.4,0,0.2,1)`; wrap non-essential motion in `@media (prefers-reduced-motion: reduce)`.

### 2.7 Components (inventory → canonical form)

| Component | Today | Canonical |
|-----------|-------|-----------|
| Card | 3 near-identical hover blocks | `radius.lg` + `shadow.card` + `cardHoverSx` |
| Button (CTA) | orange, 3 shades | `accent.500`→`600`, `radius.sm`, `shadow.cta`, `textTransform:none` |
| Button (nav) | inline in header | idle `slate.600` / active `brand.500` + 2px underline |
| Section title | `.titlePage` CSS | `type.h2` + gradient rule (`gradients.brandRule`) |
| Icon tile | per-service bg/color | `palette.serviceIcons.*`, `radius.lg`, 64px |
| Banner CTA | portal + builder gradients | `gradients.portal` / `gradients.ctaDark` |
| Badge | availability pill | `status.successBright` on 12% tint, `radius.pill` |

---

## 3. Adoption plan (incremental, engineer-reviewed)

1. **Land `tokens.ts`** (this PR) — additive, nothing breaks.
2. **Reconcile `theme.tsx`** — set `primary.main = #3B5BDB`, `secondary.main = #F97316`; add the typography scale + `MuiCssBaseline` focus-visible ring. *One* review-gated change.
3. **Fix the shared button** (F2) to `accent.*` — highest ratio of consistency per line changed.
4. **Fix hero a11y** (raise low-opacity text to ≥0.7).
5. **Sweep sections** to import tokens (services → advantages → cases → projects → contact), removing dead overrides (F6) as we go.
6. **Dark mode** — deferred to a later phase; needs section colors to reference theme, not hardcoded slate. Track separately.

Each step is small, independently shippable, and reversible. No architectural rewrite.

---

## 4. Open decisions for Chief of staff

- **A.** Confirm `#3B5BDB` (indigo) + `#F97316` (orange) as the locked brand pair, retiring `#1E3A8A`/`#F58D1E`.
- **B.** Dark mode: finish it this phase, or ship light-only polish first and schedule dark mode as its own issue? (Recommendation: **defer** — F5 is a larger effort; steps 1–5 deliver most of the value.)
- **C.** Priority order of the sweep (step 5) — recommend starting with home-page sections (services/advantages) for visible impact.
