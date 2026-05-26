# CV Site React Rewrite — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite the personal academic website as a Next.js 15 app with Tailwind v4, ship a print-optimized `/cv` route that regenerates `assets/cv.pdf`, and prepare for Vercel deploy. English-only content.

**Architecture:** Next.js 15 App Router, static export-friendly (no server runtime). Single `lib/content.ts` is the source of truth consumed by both `/` (homepage with anchored sections) and `/cv` (print-optimized page used to render the PDF via Chrome headless). Dark-first theme via `next-themes` + CSS variables. Subtle motion via Framer Motion.

**Tech Stack:** Next.js 15 (App Router) · TypeScript (strict) · Tailwind CSS v4 · shadcn-style primitives (selective copy) · framer-motion · next-themes · lucide-react · Geist font.

**Privacy:** No email, phone, address/location, or GitHub anywhere. Show portrait, ORCID, Google Scholar, LinkedIn only.

---

## Task 0: Workspace cleanup

**Goal:** Remove the previous static site to avoid collisions with Next.js. Keep source PDF, portrait, design docs, CLAUDE.md, CV_PROJECT.md.

**Files:**
- Delete: `index.html`, `styles.css`, `script.js`, `cv.html`, `vercel.json`, `assets/cv-tr.pdf`, `assets/cv.pdf`, `assets/favicon.svg`
- Move: `assets/portrait.png` → keep aside, will end up at `public/assets/portrait.png` after scaffold
- Keep: `Gürkan Doğukan Karakurt Özgeçmiş.pdf`, `CV_PROJECT.md`, `CLAUDE.md` (will be rewritten), `docs/plans/*`

**Verify:** `ls` shows only the kept files plus an empty workspace ready for `npx create-next-app`.

---

## Task 1: Scaffold Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `next-env.d.ts`, `postcss.config.mjs`, `app/`, `public/`, `.gitignore`

**Step 1:** Initialize Next.js 15 with TS + Tailwind + App Router in-place (no extra dir, no ESLint prompts).

```bash
cd "C:/Users/EXCALIBUR/Desktop/cv sitesi"
npx --yes create-next-app@latest . \
  --typescript --tailwind --app --src-dir false \
  --import-alias "@/*" --eslint --use-npm --no-turbopack \
  --skip-install
```

If the directory is non-empty, run from a temporary path and merge, OR pre-clean the conflicting files in Task 0 first.

**Step 2:** `npm install` to materialize the lockfile.

**Step 3:** Move the kept `portrait.png` into `public/assets/portrait.png`.

**Verify:** `npm run dev` boots on `localhost:3000` and shows the default Next.js welcome page.

---

## Task 2: Install runtime dependencies

```bash
npm install framer-motion next-themes lucide-react clsx tailwind-merge class-variance-authority
npm install --save-dev @types/node
```

**Verify:** `package.json` lists all six runtime deps. `npm run build` still succeeds.

---

## Task 3: Tailwind v4 theme tokens (`app/globals.css`)

Replace the default `globals.css` with:
- `@import "tailwindcss";`
- `@theme inline` block exposing CSS variables to Tailwind utilities (`--color-background`, `--color-foreground`, `--color-accent`, `--color-muted`, `--color-border`, `--color-card`, plus `--font-sans`, `--font-mono`, radius)
- `:root` light values
- `.dark` dark values (default theme on the `<html>` element)
- Base layer: smooth scroll, scroll padding for sticky nav, `prefers-reduced-motion` reset, focus-visible ring
- A `.bg-hero` utility producing the radial gradient under the hero

**Verify:** Loading `/` after the next tasks shows the dark theme with the accent color visible.

---

## Task 4: Font + layout + metadata (`app/layout.tsx`)

- Import `Geist` and `Geist_Mono` from `next/font/google`, expose CSS variables.
- Set `<html lang="en" suppressHydrationWarning>` and apply `bg-background text-foreground antialiased`.
- Export `metadata`: title (`Gürkan Doğukan Karakurt — Research Assistant @ METU`), description from headline, OpenGraph with portrait image, twitter card, robots, themeColor pair.
- Wrap children in `<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>` + render `<SiteNav />` and `<main>{children}</main>` and `<SiteFooter />`.
- Insert a skip-link `<a href="#main" className="sr-only focus:not-sr-only ...">Skip to content</a>` as the first child of `<body>`.

**Verify:** Page source includes the right `<meta>` tags and Geist font is loaded via `<link rel="preload">`.

---

## Task 5: Content module (`lib/content.ts`)

Single typed source of truth. Exports:

```ts
export type IconLink = { label: string; href: string; icon: "orcid"|"scholar"|"linkedin" };
export type Entry = { period: string; title: string; org: string; detail: string };
export type Pill = { label: string; level?: string };
export type SkillGroup = { name: string; pills: Pill[] };
```

Populate with the final content from the design doc:
- `profile` (name, roles, headline, about paragraphs, researchInterests, links)
- `education` (Construction Management MS — Spring 2025 onward, Civil Eng BSc, Corporate Finance BSc)
- `experience` (Research Assistant METU Oct 2025–present, **Mega Mühendislik Software Engineer Dec 2024–Oct 2025**, Vortex Quant Lead 2023–2024, Self-initiated Web Dev 2021–2024, ES Group Intern Summer 2022, Freelance Designer 2020–2024)
- `featuredProject` (Diyet Cebimde — summary, stack pills, four highlights, six metrics — copied from `CV_PROJECT.md`)
- `skills` (four groups: software, civilEngineering, graphicDesign, languages)

**Verify:** TypeScript compiles, no `any`.

---

## Task 6: Shared primitives (`components/ui/*`)

Copy minimal shadcn-style primitives we will actually use (do not run the shadcn CLI to keep the dep list small):
- `components/ui/button.tsx` — variant `default | ghost | outline`, size `sm | md | lg`, uses `cva`.
- `components/ui/card.tsx` — `Card`, `CardHeader`, `CardContent`, `CardFooter`.
- `components/ui/badge.tsx` — `default | accent | outline`.
- `lib/utils.ts` — `cn = (...) => twMerge(clsx(...))`.

**Verify:** `import { Button } from "@/components/ui/button"` resolves and renders.

---

## Task 7: Theme provider + toggle

- `components/theme-provider.tsx` — thin client wrapper around `next-themes` `ThemeProvider`.
- `components/theme-toggle.tsx` — client component, lucide `Sun`/`Moon`, mounted-after-hydration guard to avoid flash, accessible `aria-label`.

**Verify:** Toggle switches theme, persists across reload, respects system preference on first load.

---

## Task 8: Site navigation (`components/site-nav.tsx`)

- Sticky top, `backdrop-blur`, bottom border.
- Left: small `GK` initials mark linking to `#hero`.
- Middle: anchor links (`About`, `Education`, `Experience`, `Project`, `Skills`, `Resume`) — collapse intelligently on mobile (hide overflow with a tasteful "More" or just shrink padding).
- Right: theme toggle + small "Download CV" link to `/assets/cv.pdf`.
- Scroll-spy: `IntersectionObserver` adds `data-active` to the matching link.

**Verify:** Active link updates as you scroll; theme toggle stays in place.

---

## Task 9: Motion section wrapper (`components/motion-section.tsx`)

Client component. Wraps children in a `motion.div` with `initial={{ opacity: 0, y: 8 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: "-80px" }}`, `transition={{ duration: 0.4, ease: "easeOut" }}`. Forwards `id` and `className`.

**Verify:** Sections fade in on scroll; reduced-motion users get instant render (handled by global CSS reset).

---

## Task 10: Hero (`components/hero.tsx`)

- Two-column layout (`md:grid-cols-[280px_1fr]`), stacked on mobile.
- Portrait via `next/image`, `priority`, `rounded-2xl`, ring, soft glow shadow.
- Heading hierarchy: small accent eyebrow ("METU · Graduate Student"), name (display size, tight tracking), role chips ("Civil Engineer · Software Developer · Graduate Researcher"), headline sentence, about-snippet, three `IconLink` buttons.
- Full-bleed radial gradient sits behind only the hero via `.bg-hero` class on a wrapping `<section>`.

**Verify:** Looks right at 320px, 768px, 1280px.

---

## Task 11: Icon-link button (`components/icon-link.tsx`)

Branded link with brand-correct SVG inside `<Button variant="outline">`. Three brand SVGs inlined: ORCID green/iD mark, Google Scholar mortarboard, LinkedIn squared in. Forwards `aria-label` from the visible label.

**Verify:** Hover lifts 1px, focus ring visible, links open in new tab with `rel="noopener noreferrer"`.

---

## Task 12: Section + Timeline + Project card + Skills grid

Four small presentational components consuming typed content from `lib/content.ts`:

- `components/section.tsx` — uppercase-tracked title + `MotionSection` wrapper.
- `components/timeline.tsx` — two-column grid (`grid-cols-[120px_1fr]` desktop, single-col mobile), period on the left, body on the right.
- `components/project-card.tsx` — Card with: title, sub, meta line, summary, stack pills (lucide `Code2` accent), four highlights inside a vertical stack, six metrics in a 3-col grid (collapses to 2 on mobile), footer note.
- `components/skills-grid.tsx` — 2x2 grid (single col mobile), each group is a Card with badge list.

**Verify:** All four render from content with no warnings.

---

## Task 13: Footer (`components/site-footer.tsx`)

- Compact, top border.
- Three icon links (ORCID, Scholar, LinkedIn).
- Copyright with current year (computed at render time — fine for SSG since the build date is the deploy date).
- Privacy note: one short line confirming intentional omission of email/phone/address.

**Verify:** No GitHub mention anywhere in this file.

---

## Task 14: Homepage (`app/page.tsx`)

Compose: `<Hero />`, then `<Section id="about">`, `<Section id="education"><Timeline data={education} /></Section>`, `<Section id="experience"><Timeline data={experience} /></Section>`, `<Section id="project"><ProjectCard data={featuredProject} /></Section>`, `<Section id="skills"><SkillsGrid data={skills} /></Section>`, `<Section id="resume">` with download CTA + privacy note.

Server component, no `"use client"` directive at the page level.

**Verify:** All eight anchor targets exist; clicking nav links scrolls correctly.

---

## Task 15: Print-optimized CV route (`app/cv/page.tsx`)

- Standalone page that does **not** render `SiteNav` or `SiteFooter` (use a route group `(print)/cv` to escape the root layout, or override via a per-route `layout.tsx`).
- A4 layout: `@page { size: A4; margin: 14mm 16mm; }` in a `<style>` block at top of the route.
- Same content from `lib/content.ts` but laid out for print: small body text, two-column skills, no motion, light-only theme.
- Top: name + roles + ORCID / Scholar / LinkedIn URLs as text (not buttons).
- Sections: short summary, Education, Experience (incl. Mega Mühendislik Software Engineer Dec 2024–Oct 2025 and Research Assistant METU Oct 2025–Present), Featured Project, Skills.
- Footer note explaining contact policy.

**Verify:** Visiting `http://localhost:3000/cv` shows a clean printable layout with no nav/footer chrome.

---

## Task 16: PDF render script (`scripts/render-cv.mjs`)

Node script:
1. Spawn `npm run start` (after `npm run build`) on port 3000.
2. Poll `http://localhost:3000/cv` until 200.
3. Spawn Chrome:
   ```
   "C:/Program Files/Google/Chrome/Application/chrome.exe"
     --headless=new --disable-gpu --no-pdf-header-footer
     --print-to-pdf="<absolute path>/public/assets/cv.pdf"
     http://localhost:3000/cv
   ```
4. Kill the Next server.
5. Print the resulting file size.

Expose via `package.json`: `"pdf": "node scripts/render-cv.mjs"`.

**Verify:** `npm run pdf` produces `public/assets/cv.pdf` (~80 KB, 2 pages).

---

## Task 17: Vercel config + favicon + CLAUDE.md refresh

- `vercel.json` — same headers as the static version (immutable cache on `/assets/*`, security headers).
- `app/icon.svg` (or `public/icon.svg`) — initials favicon.
- Rewrite `CLAUDE.md` for the new Next.js stack: project layout, conventions, content workflow (`lib/content.ts` is the only place to edit copy), PDF regeneration command, privacy rule (no email/phone/address/GitHub).

**Verify:** `vercel.json` parses; favicon shows in the browser tab; `CLAUDE.md` does not reference the old static files.

---

## Task 18: Local verification + PDF regeneration

1. `npm run build` succeeds with zero TypeScript errors.
2. `npm start`, open `http://localhost:3000`:
   - All sections render
   - Theme toggle works and persists
   - Anchor scroll + scroll-spy
   - Portrait loads with correct aspect
   - `/cv` renders printable
   - No console errors / warnings
3. `npm run pdf` regenerates `public/assets/cv.pdf`.
4. Quick Lighthouse run (Chrome DevTools): target Performance ≥ 95, Accessibility ≥ 95, Best Practices = 100, SEO = 100.

---

## Task 19: Deploy guidance (hand off to user)

Two options, no automatic action:

1. **Vercel CLI:** `npm i -g vercel && vercel` from project root → preview URL → `vercel --prod`.
2. **Git → Vercel dashboard:** push to GitHub, import in the Vercel dashboard. (User said no GitHub link on the site, but they can still use a private repo.)

---

## Open items (post-launch — user-driven)

- Replace LinkedIn URL once user shortens the slug (the long auto-slug works but is ugly).
- If the user opts to add a custom domain, update `metadataBase` and any absolute OG URLs in `app/layout.tsx`.
