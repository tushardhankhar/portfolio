/**
 * Shared content types + hardcoded fallback data.
 *
 * These interfaces are the single source of truth for both Sanity-fetched data
 * and the local fallback. All fields are plain JSON-serializable values so they
 * can be passed from a server component to client components.
 */

export type ProjectCategory = "Full Stack" | "AI/ML" | "Tools" | "Mobile";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: ProjectCategory[];
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  /** Resolved image URL (empty string when none). */
  coverImage?: string;
  gradientFrom: string;
  gradientTo: string;
  featured: boolean;
  badge?: string;
}

export interface Experience {
  id: string;
  company: string;
  companyUrl?: string;
  role: string;
  start: string;
  end: string | null;
  location: string;
  type: string;
  bullets: string[];
  tech: string[];
  color: string;
}

export interface AboutContent {
  heading: string;
  /** Bio paragraphs as plain strings (portable text flattened in fetch). */
  bio: string[];
  /** Resolved avatar image URL (empty string when none). */
  avatar?: string;
  location: string;
  availableForWork: boolean;
  availabilityTags: string[];
  funFacts: string[];
  philosophy: string;
}

export interface SiteStat {
  label: string;
  value: string;
}

export interface SiteSettings {
  name: string;
  roles: string[];
  heroGreeting: string;
  heroTagline: string;
  resumeUrl: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  availabilityStatus: string;
  stats: SiteStat[];
}

export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "AI/ML"
  | "DevOps"
  | "Tools";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number;
  order: number;
}

export const fallbackProjects: Project[] = [
  {
    id: "adcraft-ai",
    title: "AdCraft AI",
    description:
      "AI-powered ad copy generator that creates high-converting advertising content for local businesses using GPT-4 and fine-tuned prompting strategies.",
    longDescription:
      "Built for viamedia.ai, AdCraft AI streamlines ad creation for 3,000+ local advertisers. The system uses a multi-step LLM pipeline: industry classification, audience analysis, copy generation, and A/B variant creation — all in under 3 seconds.",
    category: ["Full Stack", "AI/ML"],
    tech: [
      "Next.js",
      "TypeScript",
      "OpenAI API",
      "PostgreSQL",
      "Redis",
      "AWS Lambda",
    ],
    liveUrl: "https://viamedia.ai",
    githubUrl: "https://github.com/tushardhankhar/adcraft-ai",
    gradientFrom: "#864797",
    gradientTo: "#0CC0DF",
    featured: true,
    badge: "Production",
  },
  {
    id: "collab-doc",
    title: "CollabDoc",
    description:
      "Real-time collaborative document editor built with Yjs CRDT, WebSockets, and Next.js. Supports concurrent editing, presence indicators, and version history.",
    longDescription:
      "A fully functional Notion-like document editor with offline support, conflict-free merging, and real-time presence. Used by 500+ early adopters within the first month of launch.",
    category: ["Full Stack"],
    tech: ["Next.js", "Yjs", "WebSockets", "Node.js", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://collabdoc.app",
    githubUrl: "https://github.com/tushardhankhar/collabdoc",
    gradientFrom: "#0CC0DF",
    gradientTo: "#2f3342",
    featured: false,
    badge: "Open Source",
  },
  {
    id: "llm-router",
    title: "LLM Router",
    description:
      "Intelligent API gateway that routes requests across multiple LLM providers (OpenAI, Anthropic, Gemini) based on cost, latency, and capability requirements.",
    longDescription:
      "A production-grade LLM proxy with smart routing, automatic fallbacks, cost tracking, and usage analytics. Saves teams 40-60% on LLM API costs through intelligent model selection.",
    category: ["AI/ML", "Tools"],
    tech: ["Go", "Redis", "PostgreSQL", "Docker", "Anthropic API", "OpenAI API"],
    githubUrl: "https://github.com/tushardhankhar/llm-router",
    gradientFrom: "#F2DA00",
    gradientTo: "#864797",
    featured: false,
    badge: "OSS Tool",
  },
  {
    id: "devflow",
    title: "DevFlow CLI",
    description:
      "A developer productivity CLI tool that automates common workflows: git branching conventions, PR template generation, and local environment bootstrapping.",
    longDescription:
      "DevFlow CLI reduces onboarding friction for new engineers and enforces team conventions automatically. 200+ GitHub stars and used by 5+ engineering teams in production.",
    category: ["Tools"],
    tech: ["Node.js", "TypeScript", "Commander.js", "Ink", "GitHub API"],
    liveUrl: "https://www.npmjs.com/package/devflow-cli",
    githubUrl: "https://github.com/tushardhankhar/devflow-cli",
    gradientFrom: "#B190C1",
    gradientTo: "#0CC0DF",
    featured: false,
    badge: "200+ Stars",
  },
];

export const fallbackExperiences: Experience[] = [
  {
    id: "viamedia",
    company: "viamedia.ai",
    companyUrl: "https://viamedia.ai",
    role: "Senior Full Stack Engineer",
    start: "Jan 2023",
    end: null,
    location: "Hyderabad, India (Remote)",
    type: "Full-time",
    bullets: [
      "Architected and shipped a multi-tenant AI-powered campaign management platform serving 3,000+ local advertisers, reducing campaign setup time by 65%.",
      "Led migration from a monolithic Express.js API to a microservices architecture on AWS, improving system reliability to 99.97% uptime and cutting P99 latency by 40%.",
      "Integrated OpenAI GPT-4 and Anthropic Claude APIs to auto-generate ad copy and targeting recommendations, increasing conversion rates by 22% across client accounts.",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "AWS",
      "OpenAI API",
      "Docker",
    ],
    color: "#864797",
  },
  {
    id: "freelance",
    company: "Independent Consulting",
    role: "Full Stack Engineer",
    start: "Jun 2021",
    end: "Dec 2022",
    location: "Remote",
    type: "Contract",
    bullets: [
      "Delivered 8 end-to-end web applications for startups across fintech, healthtech, and e-commerce verticals — all shipped on time and within scope.",
      "Built a real-time collaborative document editor (similar to Notion) using Next.js, Yjs, and WebSockets, adopted by 500+ users in the first month.",
      "Implemented CI/CD pipelines with GitHub Actions and automated deployments to Vercel / Railway, reducing deployment friction for all client teams.",
    ],
    tech: [
      "React",
      "Next.js",
      "Node.js",
      "MongoDB",
      "WebSockets",
      "Yjs",
      "Stripe",
      "Vercel",
    ],
    color: "#0CC0DF",
  },
  {
    id: "startup",
    company: "BuildFast Labs",
    role: "Software Engineer",
    start: "Aug 2019",
    end: "May 2021",
    location: "Hyderabad, India",
    type: "Full-time",
    bullets: [
      "Developed and maintained 4 SaaS products from 0 to 1, contributing across the full stack: React frontends, REST/GraphQL APIs, and PostgreSQL data models.",
      "Reduced frontend bundle size by 38% through code-splitting, lazy loading, and image optimization, improving LCP scores from 4.2s to 1.8s.",
      "Mentored 2 junior engineers, conducted code reviews, and established the team's first documented coding standards and PR review process.",
    ],
    tech: [
      "React",
      "GraphQL",
      "Express.js",
      "PostgreSQL",
      "TypeScript",
      "Cypress",
      "GCP",
    ],
    color: "#B190C1",
  },
];

export const fallbackAbout: AboutContent = {
  heading: "About Me",
  bio: [
    "I'm a senior full-stack engineer with 5+ years of experience building scalable web applications. Currently at viamedia.ai, where I architect and ship AI-powered advertising technology used by thousands of local businesses across the US.",
    "My stack of choice: React / Next.js on the frontend, Node.js / Go on the backend, and PostgreSQL / Redis for data. I love integrating LLMs into products — turning language model capabilities into delightful real-world features.",
    "Outside of work, I contribute to open source, write about engineering on my blog, and occasionally mentor junior developers. I believe in writing code that's not just functional, but maintainable, tested, and a pleasure to read.",
  ],
  location: "Hyderabad, India",
  availableForWork: true,
  availabilityTags: ["Full-time", "Remote", "Contract", "Consulting"],
  funFacts: [
    "☕ I run on coffee and curiosity",
    "🌙 Nights are my peak coding hours",
    "🎵 Lo-fi beats fuel my best PRs",
    "🧩 I treat every bug as a puzzle",
    "🚀 Shipped 3 side projects last month",
  ],
  philosophy:
    "Great software is not just about solving today's problems — it's about building a foundation that makes tomorrow's problems easier.",
};

export const fallbackSiteSettings: SiteSettings = {
  name: "Tushar Dhankhar",
  roles: [
    "Full Stack Engineer",
    "AI Builder",
    "Open Source Contributor",
    "Problem Solver",
  ],
  heroGreeting: "Hi there, I'm",
  heroTagline:
    "I build fast, beautiful, and intelligent web experiences. Passionate about full-stack engineering, AI integrations, and crafting products that make people's lives easier.",
  resumeUrl: "/Tushar_Dhankhar_Resume.pdf",
  email: "tdhankhar@viamedia.ai",
  githubUrl: "https://github.com/tushardhankhar",
  linkedinUrl: "https://linkedin.com/in/tushardhankhar",
  twitterUrl: "https://twitter.com/tushardhankhar",
  availabilityStatus: "Available for opportunities",
  stats: [
    { value: "5+", label: "Years Experience" },
    { value: "30+", label: "Projects Shipped" },
    { value: "10+", label: "Open Source Contributions" },
  ],
};

export const fallbackSkills: Skill[] = [
  { id: "react", name: "React", category: "Frontend", proficiency: 95, order: 0 },
  { id: "nextjs", name: "Next.js", category: "Frontend", proficiency: 95, order: 1 },
  { id: "typescript", name: "TypeScript", category: "Frontend", proficiency: 92, order: 2 },
  { id: "nodejs", name: "Node.js", category: "Backend", proficiency: 90, order: 0 },
  { id: "postgresql", name: "PostgreSQL", category: "Backend", proficiency: 85, order: 1 },
  { id: "openai", name: "OpenAI / LLMs", category: "AI/ML", proficiency: 88, order: 0 },
  { id: "aws", name: "AWS", category: "DevOps", proficiency: 80, order: 0 },
  { id: "docker", name: "Docker", category: "DevOps", proficiency: 82, order: 1 },
];
