# Tushar Dhankhar — Portfolio

Personal portfolio built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Sanity CMS**.

- **Live editing dashboard:** `/studio`
- **Run locally:** `npm run dev` → http://localhost:3000
- **One-time Sanity setup:** see [`SANITY_SETUP.md`](./SANITY_SETUP.md)

---

## 📝 How to change content (read this later!)

There are **two ways** to change what shows on the site. Which one you use depends on whether you've connected Sanity yet.

```
                    Is Sanity connected? (is NEXT_PUBLIC_SANITY_PROJECT_ID set in .env.local?)
                         │
              ┌──────────┴───────────┐
            YES                      NO
              │                       │
   Edit in the Studio UI    Edit the fallback files
   (no code, no deploy)      (code change + redeploy)
```

> **How to tell which mode you're in:** open `.env.local`. If `NEXT_PUBLIC_SANITY_PROJECT_ID` has a value → **Studio mode**. If it's empty or the file doesn't exist → **fallback mode**.

---

### ✅ Way 1 — Edit in the Studio (recommended, no code)

Use this once Sanity is connected (see `SANITY_SETUP.md`). This is how you'll normally update content.

1. Run the site: `npm run dev`
2. Open **http://localhost:3000/studio** (or your deployed `yoursite.com/studio`)
3. Pick what you want to edit (see table below), change the fields, click **Publish**
4. The live site updates **within ~60 seconds** — no redeploy, no git

| In the Studio you'll see… | Controls this part of the site |
|---|---|
| **Site Settings** *(single doc)* | Your name, the rotating typewriter roles, hero greeting & tagline, resume link, email, social links (GitHub/LinkedIn/Twitter), availability status, hero stats |
| **About** *(single doc)* | About heading, bio paragraphs, avatar image, location, availability tags, fun facts, philosophy quote |
| **Project** *(list — add/edit/delete)* | Each project card: title, descriptions, category, tech tags, live/GitHub links, cover image, gradient colors, "featured" flag, badge, sort order |
| **Experience** *(list)* | Each job on the timeline: company, role, dates, location, bullet points, tech tags, sort order |
| **Skill** *(list)* | Skill name, category, proficiency %, sort order |

**Common tasks:**
- **Add a project** → Studio → *Project* → **＋ Create** → fill fields → **Publish**
- **Mark a project as featured** (makes it span 2 columns) → open the project → toggle **Featured** → **Publish**
- **Reorder things** → set the **order** number (lower = earlier) → **Publish**
- **Update your bio** → *About* → edit the **bio** field → **Publish**
- **Change resume / social links** → *Site Settings* → **Publish**

---

### ✏️ Way 2 — Edit the fallback files (before Sanity is connected, or for defaults)

If you haven't connected Sanity yet, the site shows content from **`src/data/fallback.ts`**. Edit that file to change what appears, then save (dev server hot-reloads) or redeploy.

Everything lives in one file: **`src/data/fallback.ts`**

| Constant in the file | Controls |
|---|---|
| `fallbackSiteSettings` | Name, roles, hero text, resume/email/social links, stats |
| `fallbackAbout` | Bio, location, availability tags, fun facts, philosophy |
| `fallbackProjects` | The project cards (it's a plain array — add/remove items) |
| `fallbackExperiences` | The experience timeline entries |
| `fallbackSkills` | The skills list |

**Example — adding a project in fallback mode:** open `src/data/fallback.ts`, find the `fallbackProjects` array, and copy an existing entry as a template:

```ts
{
  id: "my-new-project",
  title: "My New Project",
  description: "One-line summary shown on the card.",
  longDescription: "Longer detail.",
  category: ["Full Stack"],            // "Full Stack" | "AI/ML" | "Tools" | "Mobile"
  tech: ["Next.js", "TypeScript"],
  liveUrl: "https://example.com",       // optional
  githubUrl: "https://github.com/...",  // optional
  gradientFrom: "#864797",
  gradientTo: "#0CC0DF",
  featured: false,
  badge: "New",                         // optional
},
```

> ⚠️ The TypeScript **interfaces** at the top of `fallback.ts` (`Project`, `Experience`, etc.) define the required shape for **both** fallback data and Sanity data. If you add a new field, add it to the interface, the Sanity schema (`sanity/schemaTypes/`), and the fallback object so everything stays in sync.

---

## 🎨 How to change design (not content)

| I want to change… | Edit this |
|---|---|
| Brand colors | `src/app/globals.css` (the `@theme` block + `:root` variables) |
| Fonts | `src/app/layout.tsx` (Poppins / Raleway via `next/font/google`) |
| Layout / animations of a section | `src/components/sections/*.tsx` |
| Navbar / social dock | `src/components/layout/*.tsx` |
| Contact form behavior / email | `src/app/api/contact/route.ts` |

**Brand palette:** Purple `#864797` · Yellow `#F2DA00` · Navy `#2f3342` · Parrot Blue `#0CC0DF` · Soft Purple `#B190C1`

---

## 🗂️ Where everything is

```
portfolio-website/
├─ src/
│  ├─ app/
│  │  ├─ page.tsx                 ← fetches content, passes to sections
│  │  ├─ layout.tsx               ← fonts, metadata, smooth scroll
│  │  ├─ globals.css              ← colors, design tokens
│  │  ├─ studio/[[...tool]]/      ← the /studio editing dashboard
│  │  └─ api/contact/route.ts     ← contact form email handler
│  ├─ components/
│  │  ├─ sections/                ← Hero, About, Experience, Projects, Contact
│  │  └─ layout/                  ← Navbar, FloatingDock
│  ├─ data/fallback.ts            ← ★ content when Sanity is OFF (edit here)
│  └─ lib/sanity-fetch.ts         ← fetches from Sanity, falls back safely
├─ sanity/
│  ├─ schemaTypes/                ← ★ defines the Studio editing forms
│  ├─ lib/                        ← Sanity client, image, queries
│  └─ env.ts                      ← reads project ID from .env.local
├─ sanity.config.ts               ← Studio config
├─ .env.local                     ← your secrets (NOT committed)
├─ SANITY_SETUP.md                ← one-time setup steps
└─ README.md                      ← you are here
```

---

## ⚙️ Environment variables

Copy the example and fill in (see `SANITY_SETUP.md` for how to get the values):

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=        # from sanity.io/manage — enables Studio mode
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
RESEND_API_KEY=                       # for the contact form to send email
```

---

## 🚀 Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server (hot reload) at http://localhost:3000 |
| `npm run build` | Production build (works with or without Sanity configured) |
| `npm run start` | Run the production build locally |
| `npm run lint` | Lint the code |
| `npx sanity@latest deploy` | Host the Studio at `your-project.sanity.studio` |

---

## 💡 Quick reference: "I want to update my portfolio"

1. **Connected Sanity?** → go to `/studio`, edit, **Publish**. Done in seconds.
2. **Not yet?** → edit `src/data/fallback.ts`, save, redeploy.
3. **Changing colors/layout, not content?** → see the *How to change design* section above.
