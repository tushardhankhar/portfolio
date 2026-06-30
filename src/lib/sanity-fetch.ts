import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "../../sanity/lib/client";
import { urlForImage } from "../../sanity/lib/image";
import {
  ABOUT_QUERY,
  EXPERIENCES_QUERY,
  PROJECTS_QUERY,
  SITE_SETTINGS_QUERY,
  SKILLS_QUERY,
} from "../../sanity/lib/queries";
import { isSanityConfigured } from "../../sanity/env";
import {
  fallbackAbout,
  fallbackExperiences,
  fallbackProjects,
  fallbackSiteSettings,
  fallbackSkills,
  type AboutContent,
  type Experience,
  type Project,
  type ProjectCategory,
  type SiteSettings,
  type Skill,
  type SkillCategory,
} from "../data/fallback";

const fetchOptions = { next: { revalidate: 60 } } as const;

/**
 * Runs a GROQ query through the client, returning `null` on any failure or when
 * Sanity is not configured. Never throws.
 */
async function safeFetch<T>(query: string): Promise<T | null> {
  if (!isSanityConfigured || !client) return null;
  try {
    return await client.fetch<T>(query, {}, fetchOptions);
  } catch (error) {
    console.warn("[sanity-fetch] query failed, using fallback:", error);
    return null;
  }
}

/** Flattens portable text blocks into plain paragraph strings. */
function portableTextToParagraphs(
  blocks: PortableTextBlock[] | undefined | null
): string[] {
  if (!Array.isArray(blocks)) return [];
  return blocks
    .filter((block) => block._type === "block")
    .map((block) => {
      const children = (block.children ?? []) as { text?: string }[];
      return children.map((child) => child.text ?? "").join("");
    })
    .filter((text) => text.trim().length > 0);
}

interface RawProject extends Omit<Project, "coverImage" | "category"> {
  coverImage?: SanityImageSource | null;
  category?: ProjectCategory[] | null;
}

export async function getProjects(): Promise<Project[]> {
  const data = await safeFetch<RawProject[]>(PROJECTS_QUERY);
  if (!data || data.length === 0) return fallbackProjects;

  return data.map((p) => ({
    ...p,
    category: p.category ?? [],
    tech: p.tech ?? [],
    featured: Boolean(p.featured),
    gradientFrom: p.gradientFrom || "#864797",
    gradientTo: p.gradientTo || "#0CC0DF",
    coverImage: urlForImage(p.coverImage) || undefined,
  }));
}

export async function getExperiences(): Promise<Experience[]> {
  const data = await safeFetch<Experience[]>(EXPERIENCES_QUERY);
  if (!data || data.length === 0) return fallbackExperiences;

  return data.map((e) => ({
    ...e,
    end: e.end || null,
    bullets: e.bullets ?? [],
    tech: e.tech ?? [],
    color: e.color || "#864797",
  }));
}

interface RawAbout
  extends Omit<AboutContent, "bio" | "avatar" | "availabilityTags" | "funFacts"> {
  bio?: PortableTextBlock[] | null;
  avatar?: SanityImageSource | null;
  availabilityTags?: string[] | null;
  funFacts?: string[] | null;
}

export async function getAbout(): Promise<AboutContent> {
  const data = await safeFetch<RawAbout | null>(ABOUT_QUERY);
  if (!data) return fallbackAbout;

  const bio = portableTextToParagraphs(data.bio);

  return {
    heading: data.heading || fallbackAbout.heading,
    bio: bio.length > 0 ? bio : fallbackAbout.bio,
    avatar: urlForImage(data.avatar) || undefined,
    location: data.location || fallbackAbout.location,
    availableForWork:
      typeof data.availableForWork === "boolean"
        ? data.availableForWork
        : fallbackAbout.availableForWork,
    availabilityTags:
      data.availabilityTags && data.availabilityTags.length > 0
        ? data.availabilityTags
        : fallbackAbout.availabilityTags,
    funFacts:
      data.funFacts && data.funFacts.length > 0
        ? data.funFacts
        : fallbackAbout.funFacts,
    philosophy: data.philosophy || fallbackAbout.philosophy,
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await safeFetch<Partial<SiteSettings> | null>(
    SITE_SETTINGS_QUERY
  );
  if (!data) return fallbackSiteSettings;

  return {
    name: data.name || fallbackSiteSettings.name,
    roles:
      data.roles && data.roles.length > 0
        ? data.roles
        : fallbackSiteSettings.roles,
    heroGreeting: data.heroGreeting || fallbackSiteSettings.heroGreeting,
    heroTagline: data.heroTagline || fallbackSiteSettings.heroTagline,
    resumeUrl: data.resumeUrl || fallbackSiteSettings.resumeUrl,
    email: data.email || fallbackSiteSettings.email,
    githubUrl: data.githubUrl || fallbackSiteSettings.githubUrl,
    linkedinUrl: data.linkedinUrl || fallbackSiteSettings.linkedinUrl,
    twitterUrl: data.twitterUrl || fallbackSiteSettings.twitterUrl,
    instagramUrl: data.instagramUrl || fallbackSiteSettings.instagramUrl,
    availabilityStatus:
      data.availabilityStatus || fallbackSiteSettings.availabilityStatus,
    stats:
      data.stats && data.stats.length > 0
        ? data.stats
        : fallbackSiteSettings.stats,
  };
}

interface RawSkill extends Omit<Skill, "category"> {
  category?: SkillCategory | null;
}

export async function getSkills(): Promise<Skill[]> {
  const data = await safeFetch<RawSkill[]>(SKILLS_QUERY);
  if (!data || data.length === 0) return fallbackSkills;

  return data.map((s, i) => ({
    id: s.id,
    name: s.name,
    category: s.category ?? "Tools",
    proficiency: typeof s.proficiency === "number" ? s.proficiency : 0,
    order: typeof s.order === "number" ? s.order : i,
  }));
}
