# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`sky-medicale` — Italian-language marketing website for a medical / physiotherapy equipment and services company. All UI copy, route names, and content are in Italian (`<html lang="it">`); keep new copy Italian.

Stack: Next.js 16 (App Router) · React 19 · TypeScript (strict) · Sass. The React Compiler is enabled (`reactCompiler: true` in `next.config.ts`), so components are auto-memoized — don't hand-add `useMemo`/`useCallback` unless profiling calls for it.

## Commands

```bash
npm run dev      # dev server at http://localhost:3000 (Turbopack, Next 16 default)
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint (flat config: next/core-web-vitals + next/typescript)
```

No test framework is configured — there are no tests to run.

## Current state — does not build yet

This is an in-progress scaffold. All npm deps are installed (`swiper`, `react-icons` included) and `next build` **compiles**, but the build's type check still fails on two leftover files not yet adapted from the donor project: `src/ui/Footer copy/Footer.tsx` (stray duplicate folder — candidate for deletion) and `ReviewsSwiper.tsx` (imports a `ReviewType` that `@/features/pages/home` doesn't export). `@/features/pages/` currently holds only `home.ts`.

The home route (`src/app/(root)/page.tsx`) renders the real UI — `Hero`, `BrandWall`, `Cta`, the inline "Cosa ci distingue", "Cataloghi", "Servizi", "Metodo" and "Formazione" sections, the "Articoli" slider (`BlogsSection`, mock data pending the articles API), and the `Closure` band (a props-less component with constant content). `metadata` in `layout.tsx` is still the create-next-app default.

## Architecture

Path alias: `@/*` → `src/*`.

Layers:

- **`src/app/`** — App Router. `layout.tsx` sets `lang="it"`, loads Google fonts Charis_SIL → CSS var `--font-title` and SN_Pro → `--font-body`, and imports the global stylesheet `@/sass/_global.scss`. Pages live under the `(root)` route group.
- **`src/ui/`** — presentational primitives (Button, Card, Chip, Frame, Hero, Logo, Navbar, Section, SectionHeading, …). Each folder is `Component.tsx` + `Component.module.scss`. Mostly server components.
- **`src/components/`** — larger / interactive feature components (Swiper carousels, Faq, DropdownMenu, Article, Loader, …). Interactive ones begin with `"use client"`.
- **`src/features/`** — non-visual app data & logic. `routes.ts` holds nav config (`routes`, `ctaRoutes`). The **content-as-data pattern** lives here too: components import their copy from `@/features/pages/<page>` (e.g. `Hero` reads `hero` from `@/features/pages/home`) or from feature files like `services.ts` (`cataloghi`, `servizi`). Put copy here **only when a component iterates it** with `.map` (lists of stats, cards, brands…); single-use section text — eyebrow, heading, lead, a lone image — stays inline in the component.
- **`src/utils/`** — framework-agnostic helpers. `ui.ts` exports `cn` (the classname combiner) and `absoluteUrl`.
- **`src/animations/`** — components that create animation (`FadeIn.tsx` creates animation through scrolling).
- **`src/sass/`** — the global design system (see below).

## Styling

Two systems are used together:

1. **Global utility/typography classes** — plain string classNames like `"wrapper"`, `"mt-m"`, `"text-h1"`, `"large"`, `"btn-1"`. Defined in `src/sass/_class.scss` and `_global.scss`.
2. **CSS Modules** — `import styles from "./X.module.scss"`, referenced as `styles.name` or `styles["kebab-name"]` for component-scoped rules.

`cn(...)` (from `@/utils/ui`) is the standard combiner for merging module + global + conditional classes.

Inside a `.module.scss`, pull in design tokens and mixins:

```scss
@use "@/sass/variables" as v; // v.$primary, v.$xl, ...
@use "@/sass/mixins" as m; // @include m.respond-to("mobile") { ... }
```

- `_variables.scss` — Figma-derived color tokens, the spacing scale (`$xxs` 8px … `$xxxl` 52px), and border radii (`$radius` 8px, `$radius-l` 16px, `$radius-xl` 24px).
- `_mixins.scss` — `respond-to($breakpoint)` with named max-width breakpoints **mobile ≤521px, tablet ≤1080px, desktop ≤1280px** (or pass a raw value); plus the `button-props` mixin that generates the `.btn-*` variants.
- `_global.scss` — base element resets, typography classes `.text-h1`…`.text-h6`, `@forward`s `_class.scss`.
- `_class.scss` — utilities: `.wrapper` (centered container, max-width 1136px, responsive gutters), spacing `.mt-*` and `.s-py`, and button classes `.btn-1`/`.btn-1s`/`.btn-1l` (filled), `.btn-2`/`.btn-2l` (outline), `.btn-3` (secondary).
- Reference fonts in SCSS as `var(--font-title)` / `var(--font-body)`.

Prefer the `<Button>` component (`src/ui/Button`) over raw `.btn-*` classes — it maps `variant` (`filled`/`outline`/`secondary`) × `size` (`md`/`lg`) to the right class and renders a `next/link` when `href` is set, otherwise a `<button>`.
