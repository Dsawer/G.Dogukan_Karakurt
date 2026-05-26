# CV Site — React Rewrite Design Document

**Date:** 2026-05-26
**Owner:** Gürkan Doğukan Karakurt
**Supersedes:** `2026-05-26-cv-site-design.md` (original static HTML version)

## Goal

Rewrite the personal academic website as a modern Next.js application that looks
professionally polished (Vercel/Linear visual language), includes a portrait photo,
and ships a print-optimized English CV that can be regenerated from the same code.
Deploy target: Vercel. Site language: English only.

## Constraints

- **English-only.** No Turkish text in the UI, comments, or content. The original
  Turkish PDF stays as source material (`Gürkan Doğukan Karakurt Özgeçmiş.pdf`)
  but is not surfaced anywhere on the site. `cv-tr.pdf` is removed.
- **Contact policy (final):** Show portrait, ORCID, Google Scholar, LinkedIn.
  Do **NOT** show email, phone, address, location, or GitHub.
- **Static output.** All pages must pre-render at build time (no server runtime).
- **One source of truth for content.** A `content.ts` module exports typed objects
  consumed by both the homepage and the printable CV route.

## Stack

| Concern | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 15 (App Router) | SSG, Vercel native, SEO out of the box |
| Language | TypeScript (strict) | Catches typos in content shape early |
| Styling | Tailwind CSS v4 | Fast, modern, well-supported in Next 15 |
| Components | shadcn/ui (selective copy) | Polished primitives, owned in repo |
| Icons | lucide-react | Consistent, tree-shakable, MIT |
| Motion | framer-motion | Subtle fade/slide on scroll |
| Fonts | Geist Sans + Geist Mono (next/font) | Vercel's house font, no FOUT |
| Image | next/image | Automatic AVIF/WebP, sized variants |
| PDF rendering | Chrome headless against `/cv` route | Same source-of-truth content |

No state management, no data fetching, no API routes. Everything is static.

## Visual direction

**Vercel/Linear modern minimal, dark-first.**

- Background `#0a0a0a` (dark) / `#fafafa` (light), single deep-blue accent
  (`#3b82f6` light / `#60a5fa` dark)
- Geist Sans for everything, tight tracking (`-0.02em`) on display text
- Borders use `--border` token at ~10% white in dark mode for an etched look
- Subtle radial gradient behind the hero, pure surfaces everywhere else
- Motion is restrained: 200ms fade + 4px translate on scroll-into-view, nothing more
- Reduced-motion preference fully respected

## Information architecture

Single page (`/`) with anchored sections plus a print route (`/cv`).

```
/                                Hero | About | Education | Experience | Project | Skills | Resume | Footer
/cv                              Print-optimized full CV (A4 stylesheet, used to render PDF)
/assets/cv.pdf                   Output of Chrome --headless --print-to-pdf /cv
/assets/portrait.png             Extracted from source PDF
```

## File layout

```
cv sitesi/
├── app/
│   ├── layout.tsx              Root layout, font setup, metadata
│   ├── page.tsx                Homepage composing all sections
│   ├── globals.css             Tailwind directives, CSS variable theme
│   ├── cv/
│   │   └── page.tsx            Print-optimized CV page
│   └── icon.svg                Favicon (initials GK on accent square)
├── components/
│   ├── theme-provider.tsx      next-themes wrapper
│   ├── theme-toggle.tsx        Sun/moon button
│   ├── site-nav.tsx            Sticky top navigation with scroll-spy
│   ├── hero.tsx                Portrait + name + roles + icon links
│   ├── section.tsx             Shared <section> wrapper with title + animation
│   ├── timeline.tsx            Year-on-left timeline used by Education + Experience
│   ├── project-card.tsx        Featured project card
│   ├── skills-grid.tsx         Four-column skills grouping
│   ├── icon-link.tsx           Branded link button (ORCID/Scholar/LinkedIn)
│   ├── motion-section.tsx      Framer Motion scroll-fade wrapper
│   └── ui/                     shadcn primitives we actually use (button, card, badge)
├── lib/
│   └── content.ts              Typed source of truth for ALL site content
├── public/
│   └── assets/
│       ├── cv.pdf              Generated English CV
│       ├── portrait.png        Portrait extracted from source PDF
│       └── favicon.svg
├── scripts/
│   └── render-cv.mjs           Boots `next start`, runs Chrome headless against /cv, writes cv.pdf
├── next.config.ts
├── tsconfig.json
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts          (Tailwind v4 inline config in globals.css works too — pick one)
├── components.json             shadcn config
├── vercel.json                 Cache headers for /assets/*
├── CLAUDE.md                   Updated for the React stack
├── CV_PROJECT.md               Untouched (source for project section)
├── Gürkan Doğukan Karakurt Özgeçmiş.pdf   Source TR CV (kept as input, not served)
└── docs/plans/
    ├── 2026-05-26-cv-site-design.md             (original — superseded)
    ├── 2026-05-26-cv-site-implementation.md     (original — superseded)
    ├── 2026-05-26-react-rewrite-design.md       (this file)
    └── 2026-05-26-react-rewrite-implementation.md (next)
```

Files to **delete** from the previous static version:
`index.html`, `styles.css`, `script.js`, `cv.html`, `assets/cv-tr.pdf`,
`assets/` at repo root (moves to `public/assets/`).

## Content model (`lib/content.ts`)

```ts
export const profile = {
  name: "Gürkan Doğukan Karakurt",
  roles: ["Civil Engineer", "Software Developer", "Graduate Researcher"],
  headline: "Research Assistant @ METU Civil Engineering — Construction Management",
  about: [
    /* 2–3 paragraphs, English */
  ],
  researchInterests: ["Construction Management", "BIM", "Machine Learning"],
  links: {
    orcid: "https://orcid.org/0009-0008-3277-5405",
    scholar: "https://scholar.google.com/citations?user=lYuZHmYAAAAJ",
    linkedin: "https://www.linkedin.com/in/g%C3%BCrkan-do%C4%9Fukan-karakurt-964a84177/"
  }
};

export const education: Entry[] = [/* Construction Management MS (Spring 2025–), Civil Eng BSc, Corporate Finance BSc */];
export const experience: Entry[] = [
  // Oct 2025 — Present : Research Assistant, METU
  // Dec 2024 — Oct 2025 : Software Engineer, Mega Mühendislik
  // 2023 — 2024        : Head of Quantitative Strategies, Vortex
  // 2021 — 2024        : Web Development Project Lead, Self-initiated
  // Summer 2022        : Civil Engineering Intern, ES Group / Erdemir
  // 2020 — 2024        : Freelance Graphic Designer + 2024 Local Elections Lead Designer
];
export const featuredProject = {/* Diyet Cebimde, from CV_PROJECT.md */};
export const skills = {/* software, civilEngineering, graphicDesign, languages */};
```

This is the single content surface. Editing here updates both the homepage and
the PDF.

## Hero composition

Two-column on desktop, stacked on mobile.

- **Left:** square portrait (≈260px) with `rounded-2xl`, soft inner ring,
  subtle outer glow.
- **Right:** name (display size), three-role tagline, headline, about-snippet,
  three icon-link buttons (ORCID / Google Scholar / LinkedIn).
- Background: full-bleed radial gradient (`radial-gradient` from accent-soft
  toward transparent), fixed under hero only.

## Theming

- `next-themes` with `attribute="class"`, `defaultTheme="dark"`, `enableSystem`.
- All color tokens defined in `globals.css` as CSS variables under `.dark` and
  `:root`. Tailwind reads them via `bg-background`, `text-foreground` etc.
- Toggle persists to `localStorage`; respects system preference on first load.

## Motion

- One reusable `<MotionSection>` wraps each section, applying
  `initial={{opacity:0, y:8}}` → `whileInView={{opacity:1, y:0}}` with
  `viewport={{once:true, margin:"-80px"}}`.
- That's it. No parallax, no scroll-snap, no stagger trees.
- `prefers-reduced-motion: reduce` disables all transforms/transitions globally
  in `globals.css`.

## PDF generation

Same Chrome-headless approach we already use, but pointed at the Next route:

```bash
npm run build && npm start &
SERVER_PID=$!
sleep 4
chrome --headless=new --no-pdf-header-footer \
  --print-to-pdf=public/assets/cv.pdf http://localhost:3000/cv
kill $SERVER_PID
```

Encapsulated in `scripts/render-cv.mjs` and exposed as `npm run pdf`.

The `/cv` route uses an `@page` CSS rule for A4 margins and `print-color-adjust: exact`
to keep the accent rule visible.

## SEO & metadata

`app/layout.tsx` exports `metadata`:
- `title`: "Gürkan Doğukan Karakurt — Research Assistant @ METU"
- `description`: derived from headline
- `openGraph` + `twitter` cards (use portrait or generated OG image)
- `robots: { index: true, follow: true }`
- `metadataBase` set to the Vercel deployment URL

Also export a `viewport` with `themeColor` light/dark pair.

A `next-sitemap` config or a small `app/sitemap.ts` produces the sitemap.

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `footer`).
- Skip-to-content link first in the DOM.
- Focus-visible rings using accent token.
- All icon-only buttons have `aria-label`.
- Color contrast ≥ 4.5:1 in both themes (verified after build).

## Vercel configuration

```json
{
  "headers": [
    { "source": "/assets/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] },
    { "source": "/(.*)",        "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
    ]}
  ]
}
```

Next.js handles routing/compression automatically on Vercel; no further config.

## Out of scope (YAGNI)

- i18n / locale toggle (English only)
- CMS, MDX, blog
- Contact form (no contact details exposed)
- Analytics / tracking
- Animations beyond the single fade-in
- Tests (this is a static portfolio; one round of manual browser + Lighthouse verification is sufficient)

## Open items resolved before launch

- [x] Portrait extracted (`assets/portrait.png`)
- [x] ORCID confirmed (`0009-0008-3277-5405`)
- [x] Google Scholar confirmed (`lYuZHmYAAAAJ`)
- [x] LinkedIn URL captured
- [x] Mega Mühendislik dates + role captured (Dec 2024 — Oct 2025, Software Engineer)
- [x] MS program clarified (Construction Management since Spring 2025)
- [x] GitHub removed from scope per user request
- [ ] User to review final live site & approve copy
