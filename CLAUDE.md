# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`f.i.g.a` — "F.I.G.A. · Facciamo Italia Grande Ancora": Italian-language e-commerce MVP selling ironic patriotic merch (t-shirts, hoodies, scarves — impulse buys, ~10–75€). All UI copy, route names, and content are in Italian (`<html lang="it">`); keep new copy Italian.

Stack: Next.js 16 (App Router) · React 19 · TypeScript (strict) · Sass · Stripe Checkout. Deployed on Vercel, zero idle cost, no database. (Unlike sibling projects, the React Compiler is NOT enabled here.)

## Commands

```bash
npm run dev        # dev server at http://localhost:3000
npm run build      # production build (includes type check)
npm run start      # serve the production build
npm run typecheck  # TypeScript only (tsc --noEmit)
```

No lint script and no test framework are configured.

## Commerce

- **`src/lib/products.ts`** — the catalog and the single source of truth for prices (integer cents). Read **server-side only** by the checkout API; the client never sends a price.
- **`src/app/api/checkout/route.ts`** — POST `{ productId }` → creates a Stripe Checkout Session (single item, qty 1) and returns its URL. Requires `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_BASE_URL`.
- **`src/app/api/webhook/route.ts`** — Stripe webhook (`STRIPE_WEBHOOK_SECRET`); fulfillment hooks in here on `checkout.session.completed`, receiving the purchased `productId` via session metadata. Currently a logged placeholder (no DB yet).
- `src/app/success/page.tsx` + `src/app/cancel/page.tsx` — checkout outcome pages.

## Design Context

Read these two root files before any UI, copy, or brand work:

- **PRODUCT.md** — brand register, users, purpose, personality ("irriverente, pop, diretto"), anti-references and design principles. Horizontal brand: no product is the face of the brand more than another.
- **DESIGN.md** — the visual system and token source of truth: North Star "Il Manifesto da Stadio", strict per-section dark (`$nero-quasi`) / light (`$bianco-rotto`) alternation, two-register typography (Graduate slab for manifesto titles only, Archivo for everything else), the tricolor used only as a thin 4px divider, and **rosso corsa reserved exclusively for CTAs and highlight badges — one per visible surface**.

Non-negotiable constraints:

- **Serious Checkout Rule**: irreverence lives in copy and visual, never in the transactional path (buy buttons, checkout, success, cancel), which stays serious, clear, and WCAG 2.2 AA.
- **No scroll/entrance animations in this repo** (no gsap, no `FadeIn`): only hover/focus transitions, always behind `prefers-reduced-motion`.

## Architecture

Path alias: `@/*` → `src/*`.

Layers:

- **`src/app/`** — App Router. `layout.tsx` sets `lang="it"`, loads Google fonts Graduate → CSS var `--font-title` and Archivo (wdth axis) → `--font-body`, imports the global stylesheet `@/sass/_global.scss`, and mounts `<Navbar />` / `<Footer />` around every page.
- **`src/ui/`** — presentational primitives (Button, Card, Chip, Esito, Frame, Hero, Logo, Navbar, Section, SectionHeading, …). Each folder is `Component.tsx` + `Component.module.scss`. Mostly server components.
- **`src/components/`** — larger / interactive feature components (ProductCard, ContactForm, Faq, DropdownMenu, Loader, …). Interactive ones begin with `"use client"`.
- **`src/features/`** — non-visual app data & logic. `routes.ts` holds nav config (`routes`, `ctaRoutes` — the latter intentionally empty: the hero owns the surface's single red CTA). The **content-as-data pattern** lives here: put copy in a feature file **only when a component iterates it** with `.map`; single-use section text stays inline in the component. The catalog's content-as-data source is `src/lib/products.ts`.
- **`src/utils/`** — framework-agnostic helpers. `ui.ts` exports `cn` (the classname combiner) and `absoluteUrl`.
- **`src/sass/`** — the global design system (see below).

## Styling

Two systems are used together:

1. **Global utility/typography classes** — plain string classNames like `"wrapper"`, `"mt-m"`, `"text-h1"`, `"eyebrow"`, `"label"`, `"btn-1"`, `"dark"`, `"tricolore"`. Defined in `src/sass/_class.scss` and `_global.scss`.
2. **CSS Modules** — `import styles from "./X.module.scss"`, referenced as `styles.name`.

`cn(...)` (from `@/utils/ui`) is the standard combiner for merging module + global + conditional classes.

Inside a `.module.scss`, pull in design tokens and mixins:

```scss
@use "@/sass/variables" as v; // v.$rosso-corsa, v.$xl, ...
@use "@/sass/mixins" as m; // @include m.respond-to("mobile") { ... }
```

- `_variables.scss` — the f.i.g.a palette (`$verde-bandiera`, `$bianco-rotto`, `$rosso-bandiera`, `$rosso-corsa`, `$nero-quasi`, `$grigio-riga`, `$grigio-chiaro`) plus donor-compatible semantic aliases (`$primary` = rosso corsa, CTA only), the spacing scale (`$xxs` 8px … `$xxxl` 52px), sharp radii (`$radius` 2px for buttons/inputs, cards square), motion tokens (`$dur-tocco`, `$dur-stato`, `$ease-out-quint`), and `$s-shadow: none` (soft shadows are banned by DESIGN.md).
- `_mixins.scss` — `respond-to($breakpoint)` with named max-width breakpoints **mobile ≤521px, tablet ≤1080px, desktop ≤1280px** (or pass a raw value); plus the `button-props` mixin that generates the `.btn-*` variants (filled = rosso corsa → hover rosso bandiera; outline and secondary are dark/light-adaptive).
- `_global.scss` — base resets, the light-theme custom properties on `:root`, typography classes `.text-h1`…`.text-h6`, a11y base (`:focus-visible`, `::selection`, `prefers-reduced-motion` kill-switch), `@forward`s `_class.scss`.
- `_class.scss` — utilities: `.wrapper` (centered container, max-width 1136px, responsive gutters), spacing `.mt-*` and `.s-py`, buttons `.btn-1`/`.btn-1l` (filled), `.btn-2`/`.btn-2l` (outline), `.btn-3`/`.btn-3l` (ink/secondary), `.btn-block`, plus `.dark`, `.tricolore`, `.label`, `.eyebrow`, `.sr-only`.
- **Dark sections**: add the global `.dark` class (or `<Section tone="dark">`). It re-scopes the theme custom properties (`--bg-surface`, `--ink-title`, `--ink-body`, `--ink-muted`, `--line`, `--line-strong`); global typography and adaptive button variants read those vars, so one class flip re-themes a section. Two-register typography: `h1–h3` are Graduate + uppercase globally — components with Archivo headings (e.g. product names) must re-set `font-family: var(--font-body)` in their module.
- Reference fonts in SCSS as `var(--font-title)` / `var(--font-body)`.

Prefer the `<Button>` component (`src/ui/Button`) over raw `.btn-*` classes — it maps `variant` (`filled`/`outline`/`secondary`) × `size` (`md`/`lg`) plus `block`/`loading` to the right classes and renders a `next/link` when `href` is set, otherwise a `<button>`.

## Current state — dormant seams

The site is a one-page shop (home + success/cancel). Several system components compile but are not mounted yet (Article, NewCard, Faq, Chip, Card, Circle, DropdownMenu, Loader, UnderCostruction, Frame, Cta, BrandWall, SendEmailForm), and some seams are intentionally dormant until content/data exists:

- `ContactForm` submit is a local mock behind a `submitContact()` seam — wire `/api/contact` there when a backend exists.
- Footer columns (contatti, socials, newsletter) are commented out; placeholder data lives in `src/features/contacts.ts` / `socials.ts`.
- `ctaRoutes` is empty by design; future nav routes are commented in `src/features/routes.ts`.
