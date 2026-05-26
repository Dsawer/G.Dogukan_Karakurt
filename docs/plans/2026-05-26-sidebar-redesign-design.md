# Sidebar Redesign — Design Document

**Date:** 2026-05-26
**Owner:** Gürkan Doğukan Karakurt
**Supersedes:** `2026-05-26-react-rewrite-design.md` (visual layer only — content/content model unchanged)

## Why

Round-1 design felt template-y ("too AI"). User asked for:
- Photo on the **left**
- More **compact** information density
- Distinctive look that doesn't read as a shadcn template

## Direction (locked)

**A1 — Brittany Chiang inspired:** sticky left sidebar + right-scrolling content,
dark navy palette, no cards in body sections, hover-driven highlights, mint/teal
single accent.

## Visual tokens

| token | value | notes |
| --- | --- | --- |
| `--background` | `#0a192f` | deep navy |
| `--surface` | `#112240` | sidebar / project block |
| `--surface-hover` | `#173362` | hover lift |
| `--foreground` | `#ccd6f6` | lightest slate |
| `--slate` | `#a8b2d1` | body text |
| `--slate-dim` | `#8892b0` | meta / muted |
| `--accent` | `#64ffda` | mint — single accent, used sparingly |
| `--border` | `rgba(100, 255, 218, 0.08)` | very faint accent-tinted lines |

Dark only. Theme toggle removed.

## Layout

**Desktop ≥ 1024px:**

```
┌──────────────────────────────┬─────────────────────────────┐
│ Sticky sidebar (40%)         │ Content (60%), scrolls       │
│ ┌──────────┐                 │                              │
│ │ portrait │                 │ ABOUT                        │
│ └──────────┘                 │ ...paragraphs...             │
│ Gürkan Doğukan Karakurt      │                              │
│ Research Assistant @ METU    │ EDUCATION                    │
│ Construction Management      │ 2025 — Present  MSc, CM      │
│                              │   METU — focus, transfer     │
│ 01 — About    [active]       │ 2017 — 2023    BSc, CE       │
│ 02 — Education               │   ...                        │
│ 03 — Experience              │                              │
│ 04 — Project                 │ EXPERIENCE                   │
│ 05 — Skills                  │ ...                          │
│ 06 — Resume                  │                              │
│                              │ FEATURED PROJECT             │
│ [ORCID] [Scholar] [LinkedIn] │ ┌──────────────────────────┐ │
│                              │ │ Diyet Cebimde            │ │
│                              │ └──────────────────────────┘ │
└──────────────────────────────┴─────────────────────────────┘
```

- Sidebar is `position: sticky; top: 0; height: 100vh` and overflow-hidden
  with its own internal layout (top portrait, middle nav, bottom socials).
- Right column has `min-h-screen` and consumes remaining width.
- Page max-width ~1100px, centered.

**Mobile < 1024px:**

- Sidebar collapses to top stack: photo + name + role + headline + 3 social links.
- Nav disappears (no scroll-spy on mobile; sections are short enough to swipe).
- Content flows beneath.

## Typography

- Keep Geist Sans body + Geist Mono for periods / nav numbers.
- Name: 32–40px on desktop, tight tracking `-0.04em`.
- Section titles: small caps, `tracking-[0.22em]`, accent color (`--accent`), 11px.
- Body: 14.5px desktop / 15px mobile, line-height 1.6, slate.

## Removed in this round

- `next-themes` and `theme-provider.tsx` and `theme-toggle.tsx` (dark only).
- `framer-motion` and `motion-section.tsx` (no scroll fades — more editorial).
- shadcn `Card` primitive (no cards in this design).
- `site-nav.tsx` and `site-footer.tsx` (sidebar replaces them entirely).
- `hero.tsx` (sidebar replaces).

## Right-column section shapes

**About** — 3 paragraphs, no card, slate text.

**Education / Experience** — each entry is a row with:
- period (mono, slate-dim) on the left in a 110px column
- title (foreground, bold), org (slate), detail (slate)
- On hover: row gets a very faint `--surface` background and a left accent bar (`box-shadow: inset 2px 0 0 var(--accent)`).

**Featured Project (Diyet Cebimde)** — the ONE place we allow a soft surface:
- `--surface` background, faint border, `--accent` left bar (3px)
- Heading, subtitle, meta
- Summary paragraph
- Highlights as four `<div>` blocks separated by hairline rules — no nested cards
- Metrics as a tabular 3-col grid using mono numerals
- Stack as a single line of `Django 5.2 · DRF · PostgreSQL · …` separated by `·` — no badges

**Skills** — 4 flat group blocks, each one line of text:
```
SOFTWARE      Python & Django (adv.) · HTML / CSS / JS (adv.) · …
CIVIL ENG     AutoCAD (upper-int.) · Excel + VBA (expert) · …
DESIGN        Photoshop (adv.) · Illustrator (adv.) · …
LANGUAGES     Turkish (native) · English (C1)
```
Label column 110px mono uppercase slate-dim, content slate, separators `·`.

**Resume** — short paragraph + two link-buttons (Download PDF, View Print Version).

## Sidebar internals

- Portrait: 128×128 with `rounded-lg ring-1 ring-[--accent]/20`, subtle outer
  glow via `box-shadow`.
- Name: 28px, leading-tight.
- Role: accent color, 13px, mono uppercase tracking-wide, two lines:
  `RESEARCH ASSISTANT @ METU` / `Civil Engineering — Construction Management`.
- Headline / about-snippet: 14px slate, max 280px.
- Nav: vertical list, each item:
  ```
  01.  About
  02.  Education
  03.  Experience
  04.  Project
  05.  Skills
  06.  Resume
  ```
  Numbers in mono, item text in sans. Inactive: slate-dim. Active: foreground +
  accent left bar + accent number.
- Socials: ORCID, Scholar, LinkedIn — icon-only buttons, ghost style.

## Content unchanged

`lib/content.ts` stays as the single source of truth. No copy edits in this
round. The print `/cv` route is unaffected (still uses light A4 layout for PDF).

## Out of scope

- Adding interactive demos, blog, anything else
- Changing the PDF design
- Touching `CV_PROJECT.md` or the source PDF
- Custom domain
