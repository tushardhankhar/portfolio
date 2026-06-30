import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    name,
    roles,
    heroGreeting,
    heroTagline,
    "resumeUrl": coalesce(resumeUrl, resumeFile.asset->url),
    email,
    githubUrl,
    linkedinUrl,
    twitterUrl,
    instagramUrl,
    availabilityStatus,
    stats[]{ label, value }
  }
`);

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(order asc, _createdAt desc){
    "id": coalesce(slug.current, _id),
    title,
    description,
    longDescription,
    category,
    tech,
    liveUrl,
    githubUrl,
    coverImage,
    gradientFrom,
    gradientTo,
    featured,
    badge
  }
`);

export const EXPERIENCES_QUERY = defineQuery(`
  *[_type == "experience"] | order(order asc){
    "id": _id,
    company,
    companyUrl,
    role,
    start,
    end,
    location,
    "type": employmentType,
    bullets,
    tech,
    color
  }
`);

export const ABOUT_QUERY = defineQuery(`
  *[_type == "about"][0]{
    heading,
    bio,
    avatar,
    location,
    availableForWork,
    availabilityTags,
    funFacts,
    philosophy
  }
`);

export const SKILLS_QUERY = defineQuery(`
  *[_type == "skill"] | order(category asc, order asc){
    "id": _id,
    name,
    category,
    proficiency,
    order
  }
`);
