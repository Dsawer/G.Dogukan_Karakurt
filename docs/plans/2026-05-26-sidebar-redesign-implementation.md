# Sidebar Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reskin the existing Next.js CV site to a sticky-left-sidebar layout with a deep navy palette (A1 / Brittany-Chiang influenced), dropping the AI-template look. Content stays identical.

**Architecture:** Same Next.js 15 (App Router) project. Replace the hero/nav/footer trio in the `(site)` route group with a single `<Sidebar>` component that owns photo + name + role + scroll-spy nav + socials. Right column hosts the existing sections without cards or scroll-fade motion.

**Tech Stack:** Same minus `next-themes`, `framer-motion`, and the shadcn `Card` primitive. Pure Tailwind + CSS variables.

---

## Task 1: Cleanup deletes & dep prune

**Delete:**
- `components/hero.tsx`
- `components/site-nav.tsx`
- `components/site-footer.tsx`
- `components/theme-provider.tsx`
- `components/theme-toggle.tsx`
- `components/motion-section.tsx`
- `components/section.tsx` (will be rebuilt smaller)
- `components/ui/card.tsx`
- `components/ui/badge.tsx`

**Edit:** `package.json` — remove `next-themes` and `framer-motion`. Then `npm install` to prune `node_modules`.

**Verify:** `git status` shows the deletions; `npm ls next-themes framer-motion` reports neither.

---

## Task 2: Theme rewrite (`app/globals.css`)

Replace tokens with the navy palette from the design doc. Remove `.dark` class — site is dark only. Keep `@theme inline` mapping but use the new tokens. Add helper utility classes for the sidebar's frosted shadow and the "section-title" small-caps style. Add a `.row-hover` utility for experience/education rows.

**Verify:** `npm run build` after Task 3 succeeds with the new tokens.

---

## Task 3: New `<Sidebar>` component (`components/sidebar.tsx`)

Client component (needs scroll-spy). Layout:

- Wrapper: `aside` with `lg:sticky lg:top-0 lg:h-screen lg:py-16` and `flex flex-col gap-10`.
- Top block: portrait + name + role tagline + 1-paragraph about-snippet.
- Middle: vertical scroll-spy nav (6 items numbered `01–06`).
- Bottom: three `IconLink`s in a row.
- Mobile: drop sticky and grid behavior — render as ordinary stacked block at the top of the page; hide the nav list (sections scroll fast enough on small screens).

Scroll-spy: same `IntersectionObserver` pattern we already have, adapted to write
to local React state. Animate the active indicator with pure CSS `transition`.

---

## Task 4: New `<RightColumn>` composition (`app/(site)/page.tsx`)

Replace the page with a two-column grid:

```tsx
<div className="mx-auto grid max-w-[1100px] gap-x-14 px-6 lg:grid-cols-[minmax(0,_1fr)_minmax(0,_1.4fr)]">
  <Sidebar />
  <section className="space-y-16 py-16">
    <RowSection id="about" title="About"><AboutBlock /></RowSection>
    <RowSection id="education" title="Education"><Timeline data={education} /></RowSection>
    <RowSection id="experience" title="Experience"><Timeline data={experience} /></RowSection>
    <RowSection id="project" title="Featured Project"><FeaturedProject /></RowSection>
    <RowSection id="skills" title="Skills"><SkillLines /></RowSection>
    <RowSection id="resume" title="Resume"><ResumeBlock /></RowSection>
  </section>
</div>
```

Where `RowSection` is the tiny replacement for the old `Section` (no motion).

---

## Task 5: Refactor `Timeline` for hover rows

Strip the card-y look. Each row:

```tsx
<li className="row-hover grid gap-1.5 rounded-md p-3 transition lg:grid-cols-[120px_1fr] lg:gap-6">
  <span className="font-mono text-[11px] uppercase tracking-wide text-slate-dim">{period}</span>
  <div>
    <h3 className="text-[15px] font-semibold text-foreground">{title}</h3>
    <p className="text-[13.5px] text-slate">{org}</p>
    <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate">{detail}</p>
  </div>
</li>
```

`row-hover` (in globals): `hover:bg-[var(--surface)] hover:shadow-[inset_2px_0_0_var(--accent)]`.

---

## Task 6: Refactor `ProjectCard` → `FeaturedProject`

Same content, no shadcn `Card`. Inline the markup with a faint border, accent left bar, smaller padding, denser highlight blocks separated by hairlines, metrics in 3-col `grid` with mono numerals, stack as one `·`-separated line.

---

## Task 7: Replace `SkillsGrid` with `SkillLines`

4 rows, each: `[label 110px mono uppercase]  [items separated by ·]`. No cards, no badges.

---

## Task 8: Build, verify, regen PDF

- `npm run build` — ensure zero TS / lint errors, 6 static routes, no `next-themes` or `framer-motion` in the bundle.
- `npm start` + curl `/`, `/cv`, `/assets/cv.pdf` — all 200, no `email/phone/address/github` leaks in `/`.
- `npm run pdf` — PDF unchanged (print route untouched). Verify `public/assets/cv.pdf` regenerates cleanly.

---

## Task 9: Commit & push

Single commit: "redesign: sticky-sidebar dark-navy layout". Push to `origin/main`.

Vercel auto-deploys.

---

## Open items (post-deploy — user-driven)

- User to review the live preview deploy and request any color / spacing tweaks.
- LinkedIn slug is still the long auto-generated one (`g%C3%BCrkan-...`); user can shorten it on LinkedIn and we'll update.
- Mega Mühendislik description still generic.
