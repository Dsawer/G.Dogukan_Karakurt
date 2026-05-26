# CV Site Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a static, hand-coded personal academic website for Gürkan Doğukan Karakurt (METU graduate studies HW1), deployable to Vercel with zero build step.

**Architecture:** Single-page static site. `index.html` (semantic HTML, 8 sections), `styles.css` (CSS variables for light/dark theming, mobile-first), `script.js` (theme toggle + smooth scroll + scroll-spy, no dependencies). CV PDF served as static asset. Vercel deploy via `vercel.json`.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox), Vanilla JS (ES2020). No build, no framework, no npm. Vercel for hosting.

**Source content:** Turkish CV PDF (`Gürkan Doğukan Karakurt Özgeçmiş.pdf`) translated to English in page content. Featured project content from `CV_PROJECT.md` (Diyet Cebimde).

**Privacy constraint:** NO photo, phone, address, or email on the site. ORCID + Google Scholar links only. Placeholders for ORCID/Scholar until real values arrive.

---

## Task 1: Project skeleton + assets

**Files:**
- Create: `assets/cv.pdf` (copy of source PDF)
- Create: `assets/favicon.svg`

**Step 1:** Copy `Gürkan Doğukan Karakurt Özgeçmiş.pdf` → `assets/cv.pdf` for a clean URL.

**Step 2:** Create a minimal initials favicon (SVG, "GK" or geometric mark) so the browser tab is branded.

**Step 3:** Verify both files exist with `ls assets/`.

---

## Task 2: HTML scaffold (`index.html`)

**Files:**
- Create: `index.html`

**Sections (in order):**
1. `<head>` — UTF-8, viewport, title, meta description, link to styles, favicon, theme-color
2. `<header>` with sticky nav: name on left, section links + theme toggle button on right
3. `<section id="hero">` — Name h1, role tagline, primary action links (ORCID, Google Scholar, GitHub) with SVG icons
4. `<section id="about">` — 2–3 paragraph English bio
5. `<section id="education">` — `<article>` per degree (Geotechnical MS ongoing, Civil Eng BSc, Corporate Finance BSc double major), with years, school, GPA
6. `<section id="experience">` — `<article>` per role (Vortex Quant Lead, Self-led Web Dev, ES Group Internship, Freelance Design + Campaign)
7. `<section id="project">` — Featured: Diyet Cebimde card with stack pills, highlights, scale metrics
8. `<section id="skills">` — Four skill column groups (Software, Civil Eng, Graphic Design, Languages)
9. `<section id="resume">` — Download PDF CTA + privacy note
10. `<footer>` — Repeat ORCID/Scholar/GitHub links, privacy statement, year

**Placeholders:**
- `href="https://orcid.org/PLACEHOLDER-ORCID-ID"`
- `href="https://scholar.google.com/citations?user=PLACEHOLDER"`
- `href="https://github.com/PLACEHOLDER"`

**Verify:** Open `index.html` in browser, confirm all sections render and links are placeholders.

---

## Task 3: Styles (`styles.css`)

**Files:**
- Create: `styles.css`

**Contents:**
- `:root` light theme tokens (`--bg`, `--surface`, `--text`, `--text-muted`, `--accent`, `--accent-soft`, `--border`)
- `[data-theme="dark"]` overrides
- Reset (box-sizing, margin, default font), system font stack
- Layout: max-width 760px content column, generous vertical rhythm
- Sticky nav with subtle border-bottom, backdrop-filter blur
- Section spacing, heading scale (h1: 3rem desktop / 2rem mobile, h2: 1.5rem, h3: 1.125rem)
- Education/Experience: two-column grid (year on left, content on right), collapses to single column under 640px
- Skill pills (rounded, soft background, accent on hover)
- Project card: distinct surface, accent border-left, stack pills, metric grid
- Buttons: filled primary (accent bg) and ghost (border)
- Icon links: 1.25rem inline-block with hover lift
- `@media (max-width: 640px)` mobile adjustments
- `@media (prefers-reduced-motion)` disables transitions
- Focus-visible outlines for keyboard navigation

**Verify:** Reload `index.html`, confirm layout looks polished in both themes (manually toggle `data-theme` attribute on `<html>`).

---

## Task 4: JavaScript (`script.js`)

**Files:**
- Create: `script.js`

**Behaviors:**
1. **Theme initialization:** Read `localStorage.theme`; if absent, use `matchMedia('(prefers-color-scheme: dark)')`. Apply via `data-theme` on `<html>`.
2. **Theme toggle:** Button click swaps theme, writes to localStorage, updates button label/icon.
3. **Smooth scroll:** Intercept clicks on nav anchor links, `scrollIntoView({ behavior: 'smooth' })`.
4. **Scroll-spy:** `IntersectionObserver` on sections; toggle `.active` class on matching nav link.

**Verify:** Reload, click theme toggle (theme switches and persists on reload), click nav anchors (smooth scroll), scroll manually (active nav link updates).

---

## Task 5: Vercel configuration

**Files:**
- Create: `vercel.json`

**Contents:**
```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

**Verify:** File parses as valid JSON.

---

## Task 6: Local verification

**Step 1:** Start a simple HTTP server from the project root:

```bash
python -m http.server 8000
```

**Step 2:** Open `http://localhost:8000` and verify:
- All 8 sections render
- Theme toggle works and persists
- Smooth scroll works
- Scroll-spy highlights active nav link
- CV download link returns the PDF (200 OK)
- Mobile layout looks correct (DevTools responsive mode)
- Lighthouse score ≥ 95 on Performance, Accessibility, Best Practices, SEO
- No console errors

**Step 3:** Stop the server (Ctrl+C).

---

## Task 7: Deploy guidance (final step, user-driven)

Hand the user two options:
1. **Vercel CLI:** `npm i -g vercel && vercel` from project root
2. **Git → Vercel dashboard:** push to GitHub, import in Vercel UI

No code change needed — `vercel.json` is already in place.

---

## Open items (post-launch)

- Replace 3 placeholders (ORCID, Scholar, GitHub) before final submission
- Produce English-translated CV PDF and replace `assets/cv.pdf`
