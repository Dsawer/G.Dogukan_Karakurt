# CV Site — Gürkan Doğukan Karakurt

Personal academic website for METU graduate studies. Next.js 15 (App Router)
+ Tailwind v4 + TypeScript, deployed to Vercel. English-only.

## Project layout

```
app/
  (site)/layout.tsx           Root layout, fonts, metadata, sidebar + main
  (site)/page.tsx             Homepage composing all sections
  globals.css                 Tailwind v4 + CSS-variable theme (dark only)
  icon.svg                    Favicon (METU crescent mark)
components/
  sidebar.tsx                 Sticky left sidebar — portrait, name, scroll-spy nav, socials
  research.tsx                Research section with the BIM/schedule figures
  timeline.tsx                Education + Experience rows with lucide icons
  skills-grid.tsx             Three-group skills list (Software / Civil / Languages)
  icon-link.tsx               ORCID / Google Scholar / LinkedIn icon links
  ui/button.tsx               Single shadcn-style primitive
lib/
  content.ts                  Single source of truth for ALL on-page content
  utils.ts                    cn() helper
public/
  assets/
    cv.pdf                    Canonical resume PDF — maintained by hand, not generated
    portrait.png              Portrait used in the sidebar
    thesis-bim.jpg            Research figure 1 (BIM)
    thesis-schedule.jpg       Research figure 2 (Primavera schedule)
    metu-logo.svg             METU brand mark (favicon source)
docs/plans/                   Design history (kept for reference, not load-bearing)
```

## Editing content

`lib/content.ts` is the only file you need to touch to update copy:

- `profile` — name, headline, eyebrow, about paragraphs, research interests, links
- `iconLinks` — ORCID / Scholar / LinkedIn (no GitHub, no email, no phone)
- `research` — thesis title, paragraphs, two figures (BIM + Primavera schedule)
- `education` / `experience` — timeline entries with `icon` keys
- `skills` — three groups: Software Developer / Civil Engineer / Languages
- `navItems` — section anchors used by the sidebar scroll-spy

## Resume PDF workflow

`public/assets/cv.pdf` is the canonical résumé and is **maintained by hand**.
There is no auto-generation script — the on-page content and the PDF are kept
in sync manually. To replace the PDF, copy a new file into
`public/assets/cv.pdf`, commit, push, and Vercel redeploys.

The original source (e.g. `Gürkan_Doğukan_Karakurt_Resume.pdf` at repo root)
is gitignored so the published asset stays the single committed copy.

## Stack conventions

- Server components by default. Add `"use client"` only when a component
  needs hooks or browser APIs (sidebar, theme toggle, scroll-spy).
- Tailwind v4 with `@theme inline` in `globals.css`. Reference colors via
  tokens (`bg-background`, `text-foreground`, `text-accent`, `border-border`).
- All durable colors live as CSS variables in `:root`. Dark theme only.
- No framer-motion, no next-themes, no shadcn `Card`. Hover micro-states
  (icon fill + title accent + arrow slide) live in `globals.css` as
  `.row-entry`.
- Reduced-motion preference is respected globally.

## Privacy rule

The site MUST NOT contain: email, phone, postal address, location, or GitHub
links. The portrait, ORCID, Google Scholar, and LinkedIn are the only personal
artifacts surfaced on the site. The downloadable `cv.pdf` may include the
user's preferred contact details — that is their call, not the site's.

## Required content (per assignment)

- English CV (PDF download + on-page content)
- Google Scholar link
- ORCID identifier (METU MS/PhD requirement)

ORCID: `0009-0008-3277-5405`
Scholar: `lYuZHmYAAAAJ`

## Development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # produces .next/
npm run start        # serves the production build on port 3000
```

## Deploy

Vercel from this directory. `vercel.json` is checked in. No env vars, no
secrets, no server routes.

- CLI: `npm i -g vercel && vercel` then `vercel --prod`
- Or: push to GitHub, Vercel auto-deploys on push to `main`

## Featured project: Diyet Cebimde

Lives as a single entry inside the Experience timeline (Co-Founder & Full
Stack Developer, 2023 — Present), not as a separate section. The longer
engineering write-up is preserved in `CV_PROJECT.md` at repo root for
reference, but the homepage uses the shorter blurb from `lib/content.ts`.
