# Monish Gowda S R — Personal Portfolio

A cinematic, editorial personal portfolio for an early-career Full Stack Developer. Built with Next.js App Router, React, TypeScript, SCSS, GSAP, ScrollTrigger, Lenis and a selectively loaded Three.js hero scene.

## Requirements
- Node.js 20.9+ (Node.js 22 LTS recommended)
- npm

## Local setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production checks

```bash
npm run typecheck
npm run lint
npm run build
npm start
```

## Portfolio content
- `src/data/profile.ts` — identity, contact links, education, internship, skills and project details.
- `src/components/PortfolioExperience.tsx` — homepage structure, navigation and animations.
- `src/app/projects/[slug]/page.tsx` — reusable individual project detail page.
- `src/data/projectDetails.ts` — project-specific overview, implementation notes and screenshot gallery metadata.
- `src/components/PortfolioExperience.module.scss` — responsive visual system.
- `public/llms.txt` and `public/llms-full.txt` — AI-readable profile. Keep these synchronized when the public profile changes.
- `src/app/layout.tsx` — metadata and Person JSON-LD.

## Personal assets
- `public/images/monish-portrait.webp` — temporary portrait. Replace this file with the final owner-approved portrait using the same filename, or update the `Image` path in `PortfolioExperience.tsx`.
- `public/images/rooman-logo.webp` — Rooman Technologies logo.
- `public/images/mvj-college-logo.webp` — MVJ College of Engineering logo.
- `public/images/vtu-emblem.webp` — VTU emblem.
- `public/resume/Monish_Gowda_S_R_Mern_Stack_Developer.pdf` — supplied resume PDF linked from the header and hero.

## Project screenshot galleries
Project cards use the supplied cover artwork. Each project has an individual detail route with authentic application screenshots:

### Vehicle Service Management
`public/projects/vehicle-service/`
- `01-dashboard.webp`
- `02-booking-workflow.webp`
- `03-vehicle-records.webp`
- `04-admin-portal.webp`

### Task & Project Management
`public/projects/task-management/`
- `01-project-dashboard.webp`
- `02-task-board.webp`
- `03-task-details.webp`
- `04-progress-analytics.webp`

### Resume Screening AI Agent
`public/projects/resume-screening/`
- `01-overview.webp`
- `02-resume-analysis.webp`

### Stock Market Analysis
`public/projects/stock-market-analysis/`
- `01-analysis-overview.webp`
- `02-visualization.webp`

Prefer WebP or optimized PNG/JPEG images, with consistent landscape aspect ratios (approximately 3:2 or 16:10). Remove personal data, API keys, tokens, customer records and other sensitive information before uploading screenshots.

## Final portrait
`public/images/monish-portrait.webp` is the portrait asset used by the homepage hero.

## Before deployment
1. Set `NEXT_PUBLIC_SITE_URL` in the deployment environment to the final canonical domain.
2. Verify all repository links and the resume PDF.
3. Add authentic project screenshots and optional live demo URLs after verifying them.
4. Replace the temporary hero portrait with the final approved image.
5. Run Lighthouse on the production deployment and test mobile, keyboard navigation and reduced-motion mode.

## Animation and performance notes
- GSAP owns the page entrance and scroll reveal animations.
- `gsap.context` / `useGSAP` scope and clean up animation contexts.
- Lenis is instantiated once and synchronized with ScrollTrigger.
- The Three.js scene is dynamically imported and should remain a selective hero enhancement.
- Reduced-motion preference bypasses Lenis and the Three.js animation; CSS also reduces transitions.
- The hero portrait is prioritized; no blocking full-screen loader is used.

## Deployment
Deploy as a standard Next.js application on a platform supporting Next.js (for example Vercel). Configure `NEXT_PUBLIC_SITE_URL` before launch. Do not deploy with a placeholder canonical domain.
