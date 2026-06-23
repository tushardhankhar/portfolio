# Portfolio Website — Project Status & Handoff

> **Purpose:** A complete snapshot of this project so work can resume in any new session.
> **Last updated:** 2026-06-23
> **Location:** `/Users/tushardhankhar/personal-projects/portfolio-website`
> **Owner:** Tushar Dhankhar (tdhankhar@viamedia.ai)

---

## 0. TL;DR — where we are

A brand-new portfolio replacing the old Netlify site (`tushardhankhar-portfolio-website.netlify.app`).
Built with **Next.js 15 + TypeScript + Tailwind v4 + Framer Motion + Three.js + Sanity CMS**.

- ✅ **Phase 1 (MVP)** — all core sections built
- ✅ **CMS integration** — Sanity wired in, Studio at `/studio`, connected to project `y6y64hbs`
- ✅ **Phase 2 (Polish)** — Dark Luxe / Editorial redesign + 3D hero + Skills radar + GitHub integration + scroll motion
- ⬜ **Phase 3 (Delight)** — AI chatbot, blog/MDX, page transitions (NOT started)
- ⬜ **Real content** — site still runs on PLACEHOLDER data until content is added in `/studio`
- ⬜ **Deployment** — new site is NOT deployed anywhere yet (local only)

**To run:** `npm run dev` → http://localhost:3000 · Studio → http://localhost:3000/studio

---

## 1. Tech stack (installed & in use)

| Area | Packages |
|---|---|
| Framework | `next@15.5.19`, `react@19`, `typescript@5` (App Router, `src/` dir) |
| Styling | `tailwindcss@4` (`@tailwindcss/postcss`), CSS design tokens in `globals.css` |
| Animation | `framer-motion`, `gsap` + `@gsap/react`, `lenis` (smooth scroll) |
| 3D | `three`, `@react-three/fiber`, `@react-three/drei` |
| CMS | `sanity@4.22`, `next-sanity@10`, `@sanity/vision@4`, `@sanity/image-url`, `@portabletext/react` |
| Forms | `react-hook-form`, `@hookform/resolvers`, `zod` |
| Email | `resend` (contact form) |
| AI (installed, unused yet) | `@ai-sdk/anthropic`, `ai`, `@upstash/redis` |
| Icons/util | `lucide-react`, `clsx`, `tailwind-merge`, `class-variance-authority` |

> ⚠️ **Next.js is pinned to 15** (not 16) because `next-sanity@10` only supports Next 15. Do NOT upgrade Next without checking next-sanity compatibility.

---

## 2. Design system — "Dark Luxe / Editorial"

Chosen aesthetic direction (out of Dark Luxe / Vibrant Glow / Bold Editorial). Deep near-black canvas, generous whitespace, oversized refined typography, sparing gold + purple accents, film grain, slow elegant motion. Reference feel: Linear / Vercel / Apple.

**All design tokens live in `src/app/globals.css`** (the single source of the look):
- Canvas: `--ink #08090c`, `--ink-2`, `--ink-3`
- Brand: `--purple #864797`, `--soft-purple #b190c1`, `--gold #e9c84b` (luxe gold), `--yellow #f2da00` (brand yellow), `--parrot-blue #0cc0df`
- Text: `--text-faint/-muted/-soft` + `--foreground #ece9e4`
- Hairlines: `--line`, `--line-strong`, `--line-gold`
- Motion: `--ease-luxe cubic-bezier(0.16,1,0.3,1)`, durations `--dur-1/2/3`
- Layout: `--maxw 1180px`, `--gutter`

**Key reusable classes:** `.container-luxe`, `.section-luxe`, `.eyebrow`, `.display` / `.display-xl/lg/md`, `.surface` / `.surface-hover`, `.btn` + `.btn-primary` / `.btn-ghost`, `.tech-tag`, `.hairline` / `.hairline-gold`, `.gradient-text` / `.gradient-gold`, `.reveal` (+ `.is-visible`), `.grain`, `.scroll-progress`.

> Brand rule (from org guidelines): max ~3 colors per section; Poppins for headings, Raleway for body. Honored throughout.

---

## 3. File map (what each file does)

### App shell
- `src/app/layout.tsx` — fonts (Poppins + Raleway via next/font), metadata/OG, wraps `SmoothScrollProvider`
- `src/app/page.tsx` — **async server component**; fetches all data (Sanity→fallback) + GitHub data, composes sections, mounts `ScrollProgress`/`GrainOverlay`/`CustomCursor`, footer
- `src/app/globals.css` — the entire Dark Luxe design system (tokens, components, keyframes)
- `src/app/api/contact/route.ts` — POST handler, zod validation, Resend email to tdhankhar@viamedia.ai

### Sections (`src/components/sections/`) — all `"use client"`, receive data via props
- `HeroSection.tsx` — editorial hero, typewriter roles, dynamic-imported 3D canvas, magnetic CTAs, stats
- `AboutSection.tsx` — editorial bento; bio, location/availability, **GitHub heatmap cell**, philosophy pull-quote, fun facts
- `ExperienceSection.tsx` — editorial timeline (hairline rail, pulsing dot for current role)
- `SkillsSection.tsx` — **animated SVG radar chart** (avg proficiency by domain) + filterable proficiency bars
- `ProjectsSection.tsx` — numbered editorial rows, minimal filter tabs, cover image/gradient, live/code links
- `ContactSection.tsx` — big closer, underline-style form (RHF + zod → /api/contact), social text links

### Layout (`src/components/layout/`)
- `Navbar.tsx` — minimal top bar, animated gold underline links (About/Experience/Skills/Work/Contact), active-section highlight, frosted-on-scroll, mobile menu, "Let's talk" CTA
- `FloatingDock.tsx` — fixed vertical social dock, hairline style, gold hover

### UI primitives (`src/components/ui/`) — shared for cohesion
- `SectionHeading.tsx` — eyebrow + index + display title + intro
- `Reveal.tsx` — IntersectionObserver scroll-reveal wrapper (adds `.is-visible`)
- `MagneticButton.tsx` — CTA that leans toward cursor
- `GrainOverlay.tsx` — fixed film-grain texture
- `ScrollProgress.tsx` — top gradient progress bar (framer useScroll)
- `CustomCursor.tsx` — two-part cursor (dot + lagging ring); disabled on touch/reduced-motion
- `GitHubHeatmap.tsx` — presentational contribution heatmap grid

### 3D
- `src/components/three/HeroCanvas.tsx` — R3F particle sphere (fibonacci point cloud, slow spin, cursor parallax). Imported with `next/dynamic({ ssr:false })` in HeroSection.

### Data & libs
- `src/data/fallback.ts` — **shared TS interfaces** (`Project`, `Experience`, `AboutContent`, `SiteSettings`, `Skill`) + all placeholder content. Single source of truth for data shapes.
- `src/lib/sanity-fetch.ts` — `getProjects/Experiences/About/SiteSettings/Skills`; returns fallback when Sanity unconfigured/empty/errored. Never throws. 60s revalidate.
- `src/lib/github.ts` — `getGitHubData(username)` + `githubUsernameFrom(url)`. Public APIs, no token, 1h revalidate, returns null on failure.
- `src/lib/utils.ts` — `cn()` + helpers
- `src/components/providers/SmoothScrollProvider.tsx` — Lenis init, exposes `window.lenis`

### Sanity (`sanity/`)
- `env.ts` — reads `NEXT_PUBLIC_SANITY_PROJECT_ID` etc; exports `isSanityConfigured`
- `lib/client.ts`, `lib/image.ts`, `lib/queries.ts` (GROQ)
- `schemaTypes/` — `siteSettings` & `about` (singletons), `project`, `experience`, `skill` + `index.ts`
- `structure.ts` — desk structure (singletons first)
- `sanity.config.ts` (root), `sanity.cli.ts` (root)
- `src/app/studio/[[...tool]]/{page,layout}.tsx` — embedded Studio (noindex)

### Docs
- `README.md` — how to change content & design (day-to-day reference)
- `SANITY_SETUP.md` — one-time Sanity connection steps
- `PROJECT_STATUS.md` — this file
- `.env.local.example` — env var template

---

## 4. Sanity CMS — current state

- **Project ID:** `y6y64hbs` (already in `.env.local`)
- **Dataset:** `production` (exists, public-readable, currently EMPTY)
- **Studio:** http://localhost:3000/studio (works once CORS is set — see below)
- **Behavior:** dataset empty → site shows fallback data from `src/data/fallback.ts`. Publishing docs in Studio switches sections to live data (~60s revalidate).

### Content flow
```
/studio (edit + Publish) → Sanity Content Lake → src/lib/sanity-fetch.ts → page.tsx props → sections
                                                   ↳ falls back to src/data/fallback.ts if empty/unconfigured
```

---

## 5. What's LEFT to do (prioritized)

### 🔴 P0 — before this site can replace the old one
1. **Add real content in `/studio`** (currently all placeholder):
   - Set Sanity **CORS origin** `http://localhost:3000` (Allow credentials) at sanity.io/manage → project → API → CORS. *(needed for Studio login in browser)*
   - Fill **Site Settings** (name, roles, hero text, resume URL, email, **correct GitHub/LinkedIn/Twitter URLs**, stats)
   - Fill **About** (bio, avatar, location, availability, fun facts, philosophy)
   - Add **Experience** entries (real jobs)
   - Add **Project** entries (real projects + cover images)
   - Add **Skill** entries (drives the radar chart)
   - Publish each. Verify the GitHub username resolves correctly (Site Settings → githubUrl).
2. **Add a real résumé PDF** — referenced by `siteSettings.resumeUrl` (currently `/Tushar_Dhankhar_Resume.pdf`; put the file in `public/` or use an external URL).
3. **`.env.local`** — add `RESEND_API_KEY` so the contact form actually sends email. (Sanity vars already set.)

### 🟡 P1 — deploy
4. **Deploy the new site** (Vercel recommended for Next.js, or Netlify):
   - Set env vars in host: `NEXT_PUBLIC_SANITY_PROJECT_ID=y6y64hbs`, `NEXT_PUBLIC_SANITY_DATASET=production`, `NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01`, `RESEND_API_KEY=…`
   - Add the production URL to Sanity **CORS origins**
   - Add `metadataBase` to `layout.tsx` metadata (currently warns, defaults to localhost) and set real OG image at `public/og-image.png`
   - Update `openGraph.url` / `twitter.creator` in `layout.tsx` to the real domain/handle

### 🟢 P2 — Phase 3 (Delight) — not started
5. **AI chatbot** — "Talk to my portfolio". Libraries already installed (`@ai-sdk/anthropic`, `ai`, `@upstash/redis`). Plan: `/api/chat` route streaming Claude (use the **claude-api** skill for current model IDs — default to latest, e.g. Sonnet 4.6 `claude-sonnet-4-6`), RAG over portfolio content (from Sanity/fallback), Upstash for rate-limiting, a glassy chat widget. Needs `ANTHROPIC_API_KEY`.
6. **Blog / Writing (MDX)** — content section for articles; could use Sanity portable text or MDX files. New schema + route `/blog/[slug]`.
7. **Page transitions** — Framer Motion route transitions for blog/case-study pages.
8. **Project case-study modal/pages** — deep-dive per project (problem/solution/result, architecture, metrics).

### 🔵 Nice-to-have / cleanups
- Fix the **ESLint config path-casing warning** at build (`eslint-config-next/core-web-vitals` resolution; folder cased `Portfolio-website` vs `portfolio-website`). Non-fatal.
- Silence the **multiple-lockfile workspace-root warning** (set `outputFileTracingRoot`/`turbopack.root` in `next.config.ts`; or remove the stray `package-lock.json` in the capital-P sibling dir and `~/package-lock.json`).
- Optional: real **OG image**, sitemap/robots, analytics (Vercel Analytics + Web Vitals).
- Optional: tune hero particle density / motion speed / spacing to taste.

---

## 6. Known notes / gotchas

- **Placeholder data everywhere** until Studio is populated — this is by design (fallback layer), not a bug.
- **GitHub stats** resolve from the `githubUrl` in Site Settings (default `github.com/tushardhankhar`). Wrong handle → wrong/empty stats. Heatmap uses a public proxy (`github-contributions-api.jogruber.de`), stats use unauthenticated GitHub API (60 req/hr, 1h cache).
- **Custom cursor** only shows on fine-pointer, non-reduced-motion devices. Easy to remove: delete `<CustomCursor />` from `page.tsx`.
- **Tailwind v4**: cannot `@apply` component classes (only utilities) — back-compat aliases in globals.css are written as plain CSS for this reason.
- **Old Netlify site** (`tushardhankhar-portfolio-website.netlify.app`) is the OLD codebase and has no `/studio` — ignore it; the new site is local-only so far.

---

## 7. Commands

```bash
npm run dev        # dev server → http://localhost:3000 (or next free port)
npm run build      # production build (passes with/without Sanity configured)
npm run start      # run production build
npm run lint       # lint (note: pre-existing config warning)
npx sanity@latest deploy   # host the Studio at your-project.sanity.studio
```

---

## 8. Suggested next-session opening prompt

> "Continue the portfolio at `/Users/tushardhankhar/personal-projects/portfolio-website`. Read `PROJECT_STATUS.md` first. I want to [pick one: (a) add my real content — here it is…, (b) deploy to Vercel, (c) build the Phase 3 AI chatbot, (d) build the blog]."
