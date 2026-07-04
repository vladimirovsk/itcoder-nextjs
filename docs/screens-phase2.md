# ITCODER — Key Screen Specs (Phase 2)

> Issue **ITC-14** · Owner: Web Designer · For: Web Support Engineer (incremental adoption)
> Builds on Phase 1 — see **`docs/design-system.md`** and **`app/theme/tokens.ts`**.
> Every value below maps to a token (`palette.*`, `type.*`, `radius.*`, `shadow.*`,
> `cardHoverSx`, `focusRing`, `motion.*`). No new colors are introduced; this phase
> **applies** the system to the five key screens and closes the a11y gaps from Phase 1.

## How to read this

Each screen has: **Before** (what the code does today, with file refs) → **After**
(the target, mobile-first) → **A11y** → **Microinteractions** → **Engineer notes**
(smallest diff that lands the value). Screens are independently shippable — take them
in the order under "Rollout" at the end, or reprioritize with Chief of staff.

Legend: 🔴 breaks a11y/consistency · 🟠 visible polish · 🟡 nice-to-have.

---

## 1. Hero / Header — `app/(components)/header/page.tsx`

The strongest screen already; two real a11y bugs and some token drift.

### Before
- Low-opacity text on the photo fails WCAG AA: "Calgary, AB, Canada" at
  `rgba(255,255,255,0.45)` (`header/page.tsx:381`) and the trust row at
  `rgba(255,255,255,0.5)` (`:454`) — both **< 3:1** over the hero image.
- CTA orange is hardcoded `#F97316`/`#e0620a` inline (`:411`, `:420`) instead of
  `palette.accent`.
- Nav idle/active colors hardcoded `#475569`/`#3B5BDB` (`:260–262`) — correct values,
  wrong source. No `:focus-visible` ring on nav buttons or CTAs (keyboard users get no
  focus indication anywhere — Phase 1 F-a11y).
- H1 uses `variant="h3"` as a size hack (`:386`); relies on MUI's `h3`, not the
  `type.hero` scale.
- Radius hardcoded `8px` on the CTA (`:416`).

### After (mobile-first)
- **Contrast fix (🔴, do first):** raise both low-opacity texts to
  `rgba(255,255,255,0.72)` (location) and `rgba(255,255,255,0.7)` (trust row). Keeps
  the "quiet" hierarchy while clearing AA (~4.6:1 on the darkest scrim stop). Divider
  dots can stay at `0.25` — decorative, `aria-hidden` by nature.
- **Scrim:** keep the existing `md` gradient (`0.45→0.8`); it's already the
  `gradients.heroScrim` intent. On `xs` the copy sits over a busier crop — bump the top
  stop to `0.55` (already done) and keep it.
- **CTA → tokens:** `backgroundColor: palette.accent[500]`, hover
  `palette.accent[600]`, `boxShadow: shadow.cta` → hover `shadow.ctaHover`,
  `borderRadius: radius.sm`. Zero visual change, one source of truth.
- **Nav → tokens:** idle `palette.slate[600]`, active `palette.brand[500]`, active
  underline `2px solid palette.brand[500]`.
- **Type:** H1 driven by `type.hero` (`clamp(30px, 6vw, 60px)`, `lh 1.1`,
  `tracking -0.025em`, weight 800) rather than `h3`. Subtitle → `type.bodyLg` at
  `rgba(255,255,255,0.75)` (unchanged, already AA).
- **Rhythm on mobile:** `paddingY: 6rem` on `xs` is heavy given `minHeight:30vh` — drop
  to `4rem` so the fold shows the CTA on a 667px phone without scrolling.

### A11y
- Add `focusRing` on `:focus-visible` to nav buttons, mobile menu items, both CTAs.
- Mobile hamburger has `aria-label="menu"` ✅ but no `aria-expanded` — bind it to the
  menu open state.
- Availability badge: the green dot is decorative; the text "Available for hire"
  carries meaning — fine as is. Ensure the badge text `#4ade80` on the dark scrim is
  ≥4.5:1 (it is, ~7:1).

### Microinteractions
- CTA: `transform: translateY(-1px)` on hover + `shadow.ctaHover`, `motion.fast`.
- Nav underline: animate `border-bottom-color` + a `width` grow (0→100% via
  `::after`) at `motion.base`, `motion.easing`.
- Availability dot: optional 2s pulse (`box-shadow` ring) — **must** be wrapped in
  `@media (prefers-reduced-motion: reduce)` (disable to static).

### Engineer notes
Highest value per line: (1) the two opacity bumps, (2) `focusRing` on interactive
elements. Both are ~6 lines and clear the only 🔴 items. Token swap for CTA/nav is
mechanical and reviewable in isolation.

---

## 2. Services — `app/(site)/services/page.tsx`

### Before
- Card radius is `14px` (`:56`) — off the ramp; canonical card is `radius.lg` (16).
- Hover block re-declared inline (`:57–61`) — duplicate of `cardHoverSx`.
- Icon tile colors hardcoded in a local `ICON_COLORS` map (`:21–27`) that **duplicates**
  `palette.serviceIcons` in tokens.
- Two banner CTAs repeat the same gradient-card pattern with hardcoded values
  (`:103`, `:145`) → `gradients.portal` / `gradients.ctaDark`; inner button radius `8px`.
- Section title is `.titlePage` CSS (global) — fine, but not yet `type.h2`.
- `CardContent` forces `backgroundColor:'white'` (`:82`) — a dead-override remnant (F6).

### After (mobile-first)
- Grid is already responsive `1 → 2 → 4` ✅. Keep. Gap `3` (24px) = `spacing.lg` ✅.
- Card: `borderRadius: radius.lg`, spread `...cardHoverSx`, `border: 1px solid
  palette.slate[100]`, `boxShadow: shadow.card`. Remove the inline hover block.
- Icon tile: import `palette.serviceIcons`; delete the local map. Tile
  `radius.lg`, 64px ✅.
- Titles/body → `type.h3` (card title) and `type.body` at `palette.slate[500]`.
- **Banner CTAs:** extract a single `<BannerCTA>` (kicker, headline, pill button,
  gradient) used twice. Props: `gradient`, `kicker`, `headline`, `cta`, `href`,
  `accent`. Portal uses `gradients.portal` + white pill; builder uses `gradients.ctaDark`
  + `palette.accent[500]` pill. Kills ~40 duplicated lines.
- **Mobile:** on `xs` the banner is `row` with `space-between`; the headline can get
  cramped next to the pill. Spec: stack to `column`, `align-items:flex-start`, pill full
  width `< sm`. Pill min-height 44px (touch target).

### A11y
- Banner CTAs are links wrapping mixed content — give each an `aria-label` that reads
  the full intent ("Open the ITCODER portal to rent an RDP server"), since the visible
  text is split across two lines.
- Icon tiles are decorative → the parent `<Icon>` should be `aria-hidden`; the service
  name is the accessible label.
- Body text `palette.slate[500]` (#64748B) on white is borderline AA (~4.8:1) — keep at
  ≥14px (it is, `body2`). Don't drop below.

### Microinteractions
- Card: `cardHoverSx` lift ✅ (already the target pattern — this section is the
  reference implementation).
- Banner: `translateY(-2px)` + deeper shadow on hover, `motion.fast`. Pill arrow "→"
  nudges `translateX(3px)` on hover.

### Engineer notes
Best consolidation win of the phase: one `<BannerCTA>` + `palette.serviceIcons` import
removes two duplicate maps and two duplicate gradient blocks. Purely mechanical, no
visual change except the mobile stack.

---

## 3. Cases — `app/(site)/cases/page.tsx`

### Before
- Card radius `14px` (`:58`), hover re-declared (`:62–66`) — same drift as Services.
- Card surfaces hardcoded `#FAFBFF` (`:81`, `:86`, `:97`) and `#eef2ff` border
  (`:98`) — one-off tints not in the ramp.
- `CardHeader` uses fixed `height:5rem` (`:80`) — titles longer than two lines clip.
- "Read case study →" link colors hardcoded `#3B5BDB` (`:99`).
- Pagination is MUI default — unstyled, no brand color, and **paginating case studies
  by 3 with no context is a discoverability tax**: users don't know there's a page 2.

### After (mobile-first)
- Card → `radius.lg`, `...cardHoverSx`, `border: palette.slate[100]`,
  `shadow.card`. Surface `palette.slate[50]` (#F8FAFC) instead of the one-off `#FAFBFF`.
- Title: drop the fixed `height:5rem`; use `min-height` + `type.h3`, centered, so 1–3
  line titles all sit correctly. Body → `type.body`, `palette.slate[600]`, and change
  `textAlign:'justify'` → `left` (justify creates rivers on narrow cards — readability).
- Link footer → `palette.brand[500]`, top border `palette.brand[50]`.
- **Pagination:** style active page with `palette.brand[500]`; better, on `< sm` switch
  from pagination to a single scrollable column of all cases (mobile users expect scroll,
  not tiny page dots). Desktop keeps 3-up + pagination but add a count label
  ("Showing 1–3 of N").
- Image container `overflow:hidden` + `radius.lg` top corners ✅ (already clipped by card).

### A11y
- Pagination: MUI `Pagination` is keyboard-accessible by default ✅ — just ensure the
  active page has a non-color affordance (it uses `aria-current` ✅) and the brand color
  clears AA.
- Card is a `<Link>` wrapping image+text — good; ensure the image `alt` is the case
  title (it is, `:71`) so the link isn't announced as "link, image".
- Add `focusRing` to the card link and the "Read case study" link.

### Microinteractions
- `cardHoverSx` lift ✅. Image subtle `scale(1.03)` on card hover (wrapped in
  `overflow:hidden`), `motion.slow`, reduced-motion off.
- "Read case study →" arrow nudge on hover.

### Engineer notes
The fixed-height title clip is the one real bug here — worth fixing regardless of the
token sweep. Everything else is the same card-consolidation pattern as Services.

---

## 4. Blog — `app/blog/page.tsx`

The most modern layout already; mostly token alignment + hero consistency.

### Before
- Hero uses `#0f1724` bg + `variant="h3"` H1 + overline `#4f8ef7` letter-spacing 4
  (`:50–57`). The blue `#4f8ef7` is a **fourth blue** not in the palette (brand is
  `#3B5BDB`, soft is `#7B9EF9`).
- Post card radius `16px` ✅ (already canonical) but hover re-declared (`:79–80`).
- Tag chip colors `#eef2ff`/`#3730a3` (`:100`) — the text `#3730a3` is a one-off indigo.
- Meta row `#94a3b8` (`:89`) — a slate not in the ramp (closest is `slate.500` #64748B).
- Card is not a real card border-token; uses `#F1F5F9` (matches `slate.100` ✅ by value).

### After (mobile-first)
- Hero: reuse the **same** dark hero pattern as the site (`palette.slate[900]`
  #0F1724 ✅). Overline color → `palette.brand[300]` (#7B9EF9) to retire `#4f8ef7`.
  H1 → `type.h1` (page title), not `h3`. This makes the blog hero visually a sibling of
  the main hero, not a cousin.
- Post card: spread `...cardHoverSx`, `radius.lg` ✅, `border: palette.slate[100]`,
  `shadow.card`. Meta row → `palette.slate[500]`. Title → `type.h3`,
  `palette.slate[900]`. Excerpt → `type.body`, `palette.slate[600]`.
- Tag chips → `palette.brand[50]` bg + `palette.brand[600]` text (retires `#3730a3`),
  `radius.pill`, weight 600. Consistent with the badge language from the design system.
- **Mobile:** grid already collapses `240px 1fr → 1fr` and hides the diagram on `xs`
  (`:73`, `:84`) ✅ — good mobile-first instinct. Keep. Ensure `p:2` on `xs` gives the
  text room; bump excerpt to full width (it is).

### A11y
- Each card is a `<Link>` wrapping the whole tile ✅. Add `focusRing`.
- Diagram is decorative context — wrap in `aria-hidden` so screen readers jump straight
  to date → title → excerpt.
- `variant="overline"` "Blog" is decorative labeling; the H1 carries the page name ✅.
- Meta "min read" — keep as text, it's informative.

### Microinteractions
- `cardHoverSx` lift ✅. Title color shifts slate→brand on card hover (`motion.base`)
  as a "this is clickable" signal (currently no hover affordance on the title).

### Engineer notes
Smallest of the five. The one thing that matters: retire the two rogue blues
(`#4f8ef7`, `#3730a3`) so the blog stops introducing palette entropy. Layout is already
correct.

---

## 5. Contact — `app/(site)/contact/page.tsx`

Functionally complete; the biggest a11y and mobile gaps of the five.

### Before
- Two-column card: dark sidebar `linear-gradient(160deg,#0f1724,#1a2d5a)` (`:127`) =
  `gradients.contactSidebar` (exact match, not yet imported).
- Sidebar built from raw `<div>`s with inline `fontSize`/`marginTop:2rem` (`:132–189`) —
  no type scale, uneven vertical rhythm (`20px` then `2rem` gaps).
- Card radius `20px` (`:114`) — off the ramp (nearest `radius.lg` 16, or a new
  `radius.xl` if we want a larger container radius; recommend **16** for consistency).
- Submit button hardcoded `#3B5BDB`/`#2d4ac7` + disabled `#c7d0f5`/`#7c8db8`
  (`:315–322`) — correct hues, wrong source (`palette.brand`).
- **Inputs have no `:focus-visible` brand ring** beyond MUI default; label contrast on
  the `*` required markers is fine but the required state isn't announced (the `*` is
  baked into the label string `:215`, so SR reads "First Name star" — acceptable but
  not ideal; prefer `required` prop + `aria-required`).
- **Mobile:** on `xs` the sidebar stacks **above** the form (`column1` then `column2`) —
  the user scrolls through the whole contact-info block before reaching the form. On a
  phone the form is the primary action and should come first (or the sidebar should
  collapse to a compact contact strip).
- Social/contact links use `.footer-link` class — verify it has a visible focus state.

### After (mobile-first)
- **Mobile order (🟠):** on `xs`, render the **form first**, then a condensed contact
  strip (WhatsApp · Email · Facebook as a horizontal icon row) below. On `md+`, keep the
  side-by-side layout with the full sidebar. Use fl-order or a breakpoint-conditional
  arrangement.
- Sidebar → tokenized: heading `type.h3` (white), intro `type.body`
  `rgba(255,255,255,0.85)`, contact rows on a consistent `spacing.xl` (32px) rhythm.
  Import `gradients.contactSidebar`.
- Card radius → `radius.lg` (16). Container shadow keep (`0px 4px 24px rgba(0,0,0,0.10)`
  — matches the elevation family).
- Submit button → `palette.brand[500]` / hover `palette.brand[600]`, disabled keeps the
  muted brand tint. `radius.sm`. Full-width on `xs` ✅ (already).
- Inputs: adopt the theme's future `focus-visible` ring; MUI `size="small"` is fine.
  Set `radius.md` on the input outline to match the FAQ inputs (system consistency).

### A11y (this screen needs the most)
- Required fields: use `required` + `aria-required="true"` on First/Last/Email/Message
  instead of a `*` in the label string, so state is programmatically announced.
- Errors: `helperText` + `error` gives MUI `aria-describedby` linkage ✅ — keep. On
  submit failure, move focus to the first invalid field.
- Success/error `<Alert>` (`:199–207`): add `role="status"` (success) / `role="alert"`
  (error) so the outcome is announced without a visual scan.
- The privacy checkbox error is a separate `<Typography>` (`:302`) not linked to the
  checkbox — add `aria-describedby` so the checkbox announces its error.
- All social links: ensure `.footer-link` has a visible `:focus-visible` ring (brand or
  white on the dark sidebar).
- Submit disabled-until-valid is convenient but hides *why* it's disabled from keyboard
  users — consider enabling the button and validating on submit (with focus-to-error),
  which is the more accessible pattern. Flag for engineer/Chief of staff decision.

### Microinteractions
- Inputs: label float + underline/outline color → `palette.brand[500]` on focus
  (`motion.fast`).
- Submit: `translateY(-1px)` + brand shadow on hover; on submit, swap label to a spinner
  ("Sending…") so the async round-trip has feedback (currently no loading state —
  `handleSubmit:73` awaits with no pending UI).
- Success: `<Alert>` fades in (`motion.base`).

### Engineer notes
Two things carry the value: (1) the **mobile form-first reorder** (real UX cost today),
and (2) the **a11y pass** on required/errors/alerts/focus. The token swaps are cosmetic
parity. The disabled-submit → validate-on-submit change is a UX decision — surface it,
don't silently change it.

---

## Cross-cutting (applies to all five)

- **Focus-visible ring** (`focusRing`) is missing site-wide — the single highest-impact
  a11y fix. Best landed once in `theme.tsx` `MuiCssBaseline` (per Phase 1 adoption step
  2), which covers every screen at once. Prefer that over per-component edits.
- **`prefers-reduced-motion`**: every hover-lift, pulse, and image-scale must degrade to
  static. Add one global `@media (prefers-reduced-motion: reduce){ *{ transition:none
  !important; animation:none !important } }` guard in `globals.css`, plus per-component
  awareness for the availability pulse.
- **Card pattern** is identical across Services/Cases/Blog — after this phase all three
  should read `...cardHoverSx` + `radius.lg` + `shadow.card` + `palette.slate[100]`
  border. That's the consistency payoff.
- **No new colors**: every "After" value above already exists in `tokens.ts`. Four rogue
  values get retired: `#4f8ef7`, `#3730a3` (blog), `#FAFBFF` (cases), `#c7d0f5`/`#7c8db8`
  (contact — replace with brand tints).

## Rollout (incremental, engineer-reviewed)

Ordered by value-per-effort; each step is independently shippable and reversible.

1. **Global a11y (🔴):** `focusRing` in `theme.tsx` + reduced-motion guard in
   `globals.css`. One PR, covers all screens.
2. **Hero contrast (🔴):** two opacity bumps in the header. ~6 lines.
3. **Services consolidation (🟠):** `<BannerCTA>` extraction + `palette.serviceIcons`
   import + `cardHoverSx`. Biggest dedupe.
4. **Cases (🟠):** card tokens + drop the fixed title height + brand pagination /
   mobile scroll.
5. **Contact (🟠):** mobile form-first reorder + a11y (required/alerts/focus) + loading
   state.
6. **Blog (🟡):** retire the two rogue blues + card tokens + hero `type.h1`.

Dark mode remains deferred (Phase 1 decision B) — none of the above blocks it; they make
it easier by routing colors through tokens.

## Open decisions

- **D.** Contact submit: keep disabled-until-valid, or switch to enabled +
  validate-on-submit with focus-to-error (more accessible)? — *Recommend the latter.*
- **E.** Cases on mobile: paginate (current) vs. single scroll column? — *Recommend
  scroll on `< sm`.*
- **F.** Container radius: standardize on `radius.lg` (16) everywhere, or introduce a
  `radius.xl` (20) for large containers like the contact card? — *Recommend 16 for one
  ramp; revisit only if 16 looks tight on the large card.*
