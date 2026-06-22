# Sanity CMS Setup

This portfolio ships with Sanity CMS wired in, but it runs perfectly **without
any Sanity configuration** — every section falls back to the hardcoded content
in `src/data/fallback.ts`. The embedded Studio lives at `/studio`.

When you're ready to manage content from a CMS, follow the 3 steps below.

## 1. Create a Sanity project & log in

```bash
npx sanity@latest login
```

Then create a project (or grab the `projectId` of an existing one) from
[sanity.io/manage](https://www.sanity.io/manage). You can also create a project
non-interactively:

```bash
npx sanity@latest init --bare
```

Copy the resulting **Project ID**.

## 2. Add the project ID to `.env.local`

Copy the example file and fill in your project ID:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
```

Until `NEXT_PUBLIC_SANITY_PROJECT_ID` is set, the site uses fallback data and
the Studio shows a "configuration needed" state — nothing breaks.

## 3. Create the dataset & add content

If the `production` dataset doesn't exist yet:

```bash
npx sanity@latest dataset create production
```

Then start the app and visit **http://localhost:3000/studio** to add content:

- **Site Settings** (singleton) — name, typewriter roles, hero text, resume URL,
  email, social links, availability status, stats.
- **About** (singleton) — heading, bio (portable text), location, availability
  tags, fun facts, philosophy.
- **Projects**, **Experience**, **Skills** — document lists.

As soon as a document exists, the matching section renders the Sanity data
instead of the fallback. Content is revalidated every 60 seconds.

## Optional: host the Studio separately

To deploy the Studio to `your-project.sanity.studio` instead of (or in addition
to) the embedded `/studio` route:

```bash
npx sanity@latest deploy
```

## How the fallback works

- `sanity/env.ts` exposes `isSanityConfigured` (true only when a projectId is set).
- `src/lib/sanity-fetch.ts` returns fallback data whenever Sanity is not
  configured, returns empty results, or throws. It never throws.
- `src/data/fallback.ts` holds the shared TypeScript interfaces and the original
  hardcoded content — the single source of truth for both fallback and Sanity
  data shapes.
