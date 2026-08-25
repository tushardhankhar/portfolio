/**
 * Seed Sanity with the current fallback content.
 *
 * One-time setup:
 *   1. Create a write token: https://sanity.io/manage → project y6y64hbs →
 *      API → Tokens → Add API token → name it "seed", permission "Editor". Copy it.
 *   2. Run (token inline so no dotenv needed):
 *
 *        SANITY_API_WRITE_TOKEN=sk_your_token npm run seed:sanity
 *
 * Idempotent: uses createOrReplace with deterministic _ids, so re-running updates
 * the same documents instead of duplicating. Publishes directly (no drafts).
 * The fallback in src/data/fallback.ts is left untouched.
 */
import { createClient } from "next-sanity";
import {
  fallbackAbout,
  fallbackExperiences,
  fallbackProjects,
  fallbackSiteSettings,
  fallbackSkills,
} from "../src/data/fallback";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error(
    "❌ Missing SANITY_API_WRITE_TOKEN.\n" +
      "   Create one at https://sanity.io/manage (API → Tokens, Editor permission),\n" +
      "   then run:  SANITY_API_WRITE_TOKEN=sk_xxx npm run seed:sanity"
  );
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "y6y64hbs",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

/** Convert plain paragraphs into minimal Portable Text blocks. */
function toPortableText(paragraphs: string[]) {
  return paragraphs.map((text, i) => ({
    _type: "block",
    _key: `bio-${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `bio-${i}-0`, text, marks: [] }],
  }));
}

type SeedDoc = { _id: string; _type: string } & Record<string, unknown>;

function buildDocs(): SeedDoc[] {
  const siteSettings = {
    _id: "siteSettings",
    _type: "siteSettings",
    name: fallbackSiteSettings.name,
    roles: fallbackSiteSettings.roles,
    heroGreeting: fallbackSiteSettings.heroGreeting,
    heroTagline: fallbackSiteSettings.heroTagline,
    resumeUrl: fallbackSiteSettings.resumeUrl,
    email: fallbackSiteSettings.email,
    githubUrl: fallbackSiteSettings.githubUrl,
    linkedinUrl: fallbackSiteSettings.linkedinUrl,
    ...(fallbackSiteSettings.twitterUrl
      ? { twitterUrl: fallbackSiteSettings.twitterUrl }
      : {}),
    instagramUrl: fallbackSiteSettings.instagramUrl,
    availabilityStatus: fallbackSiteSettings.availabilityStatus,
    stats: fallbackSiteSettings.stats.map((s, i) => ({
      _key: `stat-${i}`,
      label: s.label,
      value: s.value,
    })),
  };

  const about = {
    _id: "about",
    _type: "about",
    heading: fallbackAbout.heading,
    bio: toPortableText(fallbackAbout.bio),
    location: fallbackAbout.location,
    availableForWork: fallbackAbout.availableForWork,
    availabilityTags: fallbackAbout.availabilityTags,
    funFacts: fallbackAbout.funFacts,
    philosophy: fallbackAbout.philosophy,
  };

  // coverImage is intentionally omitted — images aren't uploaded to Sanity, so
  // projects render with their gradient (same as now). Upload covers in Studio later.
  const projects = fallbackProjects.map((p, i) => ({
    _id: `project-${p.id}`,
    _type: "project",
    title: p.title,
    slug: { _type: "slug", current: p.id },
    description: p.description,
    longDescription: p.longDescription,
    category: p.category,
    tech: p.tech,
    ...(p.liveUrl ? { liveUrl: p.liveUrl } : {}),
    ...(p.githubUrl ? { githubUrl: p.githubUrl } : {}),
    gradientFrom: p.gradientFrom,
    gradientTo: p.gradientTo,
    featured: p.featured,
    ...(p.badge ? { badge: p.badge } : {}),
    order: i,
  }));

  const experiences = fallbackExperiences.map((e, i) => ({
    _id: `experience-${e.id}`,
    _type: "experience",
    company: e.company,
    ...(e.companyUrl ? { companyUrl: e.companyUrl } : {}),
    role: e.role,
    start: e.start,
    ...(e.end ? { end: e.end } : {}),
    ...(e.location ? { location: e.location } : {}),
    employmentType: e.type,
    bullets: e.bullets,
    tech: e.tech,
    color: e.color,
    order: i,
  }));

  const skills = fallbackSkills.map((s) => ({
    _id: `skill-${s.id}`,
    _type: "skill",
    name: s.name,
    category: s.category,
    proficiency: s.proficiency,
    order: s.order,
  }));

  return [siteSettings, about, ...projects, ...experiences, ...skills];
}

async function run() {
  const docs = buildDocs();
  const tx = client.transaction();
  docs.forEach((doc) => tx.createOrReplace(doc));
  await tx.commit();
  console.log(
    `✅ Seeded ${docs.length} documents ` +
      `(1 siteSettings, 1 about, ${fallbackProjects.length} projects, ` +
      `${fallbackExperiences.length} experiences, ${fallbackSkills.length} skills).`
  );
  console.log("Open /studio to edit them. The site uses Sanity within ~60s.");
}

run().catch((err) => {
  console.error("❌ Seed failed:", err?.message || err);
  process.exit(1);
});
