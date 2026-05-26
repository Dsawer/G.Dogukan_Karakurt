# Gürkan Doğukan Karakurt — Personal Website

Personal academic website for METU graduate studies. Civil Engineer · Software
Developer · Graduate Researcher (Research Assistant @ METU Construction
Management).

**Live:** _deployed via Vercel (link added after first deploy)_
**ORCID:** [`0009-0008-3277-5405`](https://orcid.org/0009-0008-3277-5405)
**Google Scholar:** [profile](https://scholar.google.com/citations?user=lYuZHmYAAAAJ)

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion ·
next-themes · Geist font · shadcn-style primitives. Static export, zero runtime
dependencies on the server. The print-optimized `/cv` route is rendered to PDF
by Chrome headless and served as `/assets/cv.pdf`.

## Project layout

```
app/
  (site)/         Homepage with nav + footer (Hero, About, Education, Experience, Project, Skills, Resume)
  (print)/cv/     Print-only CV layout used to regenerate the PDF
  globals.css     Tailwind v4 + CSS-variable theme
components/       Hero, Timeline, ProjectCard, SkillsGrid, ThemeToggle, ...
lib/content.ts    Single source of truth for all site content
public/assets/    cv.pdf, portrait.png, favicon assets
scripts/          render-cv.mjs — Chrome headless PDF renderer
```

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # production serve
npm run pdf        # regenerate public/assets/cv.pdf
```

## Editing content

`lib/content.ts` is the only place to edit copy. The homepage and the
printable CV route both read from it. After editing, regenerate the PDF with
`npm run pdf`.

## Deploy

This project deploys to Vercel out of the box — no configuration beyond
`vercel.json` (clean URLs + cache headers).

```bash
npm i -g vercel
vercel             # preview
vercel --prod      # production
```

## Privacy

The site intentionally omits email, phone, postal address, location, and
GitHub links. The portrait, ORCID, Google Scholar, and LinkedIn are the only
personal artifacts surfaced. The original Turkish source CV is excluded from
this repository for the same reason.
