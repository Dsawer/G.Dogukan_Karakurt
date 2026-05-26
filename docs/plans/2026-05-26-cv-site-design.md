# CV Site — Design Document

**Date:** 2026-05-26
**Owner:** Gürkan Doğukan Karakurt
**Context:** METU graduate studies HW1 — personal academic website

## Goal

Build a professional, modern, minimalist personal website that:
1. Establishes professional online presence as a METU graduate student
2. Includes English CV (embedded as page content + downloadable PDF)
3. Links to ORCID and Google Scholar (placeholders until provisioned)
4. Excludes personal contact data (photo, address, phone, email) for privacy
5. Deploys to Vercel from this directory

## Non-Goals

- Server-side rendering, backend, database
- CMS or admin panel
- Analytics, tracking, cookies
- Multi-language toggle (English only for v1)

## Approach

Hand-coded **static HTML + CSS + Vanilla JS**. No build step, no framework, no node_modules. One `index.html` page, one stylesheet, one tiny JS file for theme toggle and smooth scroll. The CV PDF is served as a static asset and also linked for download.

**Why this over alternatives:**
- User has advanced HTML/CSS/JS skills — full control, no framework lock-in
- Static = trivially fast on Vercel CDN, zero cold start, no dependency rot
- One file each = easy to maintain, easy to grade, easy to demo

## Architecture

```
cv sitesi/
├── index.html                          # Single-page site (all 8 sections)
├── styles.css                          # All styles, CSS variables for theming
├── script.js                           # Theme toggle, smooth scroll, scroll-spy
├── assets/
│   ├── cv.pdf                          # Renamed CV PDF for clean URL
│   └── favicon.svg                     # Generated initials favicon
├── vercel.json                         # Clean URLs, cache headers
├── CLAUDE.md                           # Project instructions for future Claude sessions
└── docs/plans/
    └── 2026-05-26-cv-site-design.md   # This file
```

## Sections (single-page layout)

1. **Hero** — Name, three-role tagline ("Civil Engineer · Software Developer · Graduate Researcher"), ORCID + Google Scholar + GitHub icon links
2. **About** — 2–3 paragraph English bio: civil engineering background, geotechnical MS path, software/finance crossover, design work
3. **Education** — Three entries: BSc Civil Engineering (METU, 3.35), BSc Corporate Finance double major (METU, 3.39), MSc Geotechnical Engineering (METU, ongoing)
4. **Experience** — Four entries: Vortex Quant Lead (2023–24), Self-led web dev project (2021–24), ES Group internship (2022), Freelance graphic design + 2024 municipal campaign (2020–24)
5. **Featured Project — Diyet Cebimde** — Large card with: summary, tech stack pills (Django, React, RN, PostgreSQL, Gemini, PuLP), engineering highlights (AI integration, snapshot architecture, linear programming for portion optimization), scale numbers (3 repos, 11k food catalog, 8 Django apps)
6. **Skills** — Four columns: Software Development / Civil Engineering / Graphic Design / Languages
7. **Resume** — "Download PDF" button + statement that the full CV is embedded above
8. **Footer** — ORCID, Google Scholar, GitHub links again; small note that contact is intentionally omitted for privacy

## Visual Design

**Color tokens (light theme):**
- `--bg`: #fafaf9 (warm off-white)
- `--surface`: #ffffff
- `--text`: #1a1a1a
- `--text-muted`: #525252
- `--accent`: #1e40af (deep academic blue)
- `--border`: #e5e5e5

**Dark theme:**
- `--bg`: #0a0a0a
- `--surface`: #171717
- `--text`: #fafafa
- `--text-muted`: #a3a3a3
- `--accent`: #60a5fa
- `--border`: #262626

**Typography:** System font stack (no web font requests). Headings tight (-0.02em letter spacing). Body 16–17px, line-height 1.65. Large numerals (year ranges) styled with tabular-nums.

**Layout:** Single column max-width 760px, generous whitespace, sticky minimal top nav with section anchors. Mobile-first responsive.

## JS Behavior

- Theme toggle button in nav (persists to `localStorage`, respects `prefers-color-scheme` on first load)
- Smooth scroll on anchor clicks
- Scroll-spy: active nav item highlights as user scrolls
- No external dependencies

## Deployment

`vercel.json` configures clean URLs and a one-year cache on `/assets/*`. User runs `vercel` CLI or pushes a Git repo to Vercel dashboard.

## Privacy Stance

The site intentionally omits photo, phone, address, and email. ORCID and Google Scholar links provide professional contact pathways. Footer includes a one-line statement explaining this choice — turns a constraint into a signal of care.

## Open Items (resolved before launch)

- [ ] Replace ORCID placeholder with real ID
- [ ] Replace Google Scholar placeholder with real profile URL
- [ ] Translate Turkish CV PDF to English (or replace with English version)
- [ ] Confirm GitHub username for footer link
