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
  instagramUrl: string;
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
    id: "jashn",
    title: "Join The Jashn",
    description:
      "A self-serve digital invitation platform for Indian weddings and events — 20 hand-crafted themes, guest RSVPs and paid activation — taken from concept to its first paying customers.",
    longDescription:
      "Built and launched Jashn (JoinTheJashn), a self-serve digital invitation platform for Indian weddings and events, taking the product from concept to its first paying customers. Shipped 20 hand-crafted invitation themes with Next.js, React, TypeScript, GSAP, Framer Motion and Lenis, tuned to stay responsive from small preview cards up to full-screen views. Designed a multi-tenant PostgreSQL architecture with Row Level Security across 22 migrations, supporting both authenticated host and anonymous guest workflows without requiring guest accounts. Built a serverless media pipeline using client-side WebP re-encoding, presigned uploads and Cloudflare R2 to keep storage and bandwidth off the application server, plus server-rendered PDF invitations and QR-code generation wired into guest access and invitation sharing. Secured guest access with 256-bit bearer tokens, SHA-256 hashing, OTP/magic links and durable share tokens that stay valid across guest-list changes. Payment activation runs through Razorpay with idempotent handling across both client-side verification and webhooks, so invitations activate reliably even when a user closes the payment flow.",
    category: ["Full Stack"],
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL",
      "Supabase",
      "Cloudflare R2",
      "Razorpay",
      "Vercel",
      "GSAP",
      "Framer Motion",
      "Lenis",
    ],
    liveUrl: "https://www.jointhejashn.com",
    coverImage: "/Jashn.jpg",
    gradientFrom: "#864797",
    gradientTo: "#F2DA00",
    featured: true,
    badge: "Live",
  },
  {
    id: "netflix-gpt",
    title: "Netflix GPT Search",
    description:
      "Netflix clone with secure user authentication and an AI-powered movie search built on the OpenAI API.",
    longDescription:
      "A Netflix clone with user authentication and an integrated OpenAI API to enhance movie search. Implemented secure login/signup and leveraged natural language processing to provide intelligent movie suggestions based on user input. Built with React, Firebase Authentication, the TMDB API, and Tailwind CSS for a seamless, responsive experience.",
    category: ["Full Stack", "AI/ML"],
    tech: ["React", "Firebase", "TMDB API", "OpenAI API", "Tailwind CSS"],
    liveUrl: "https://gpt9293.netlify.app/",
    coverImage: "/Netflix.jpg",
    gradientFrom: "#864797",
    gradientTo: "#0CC0DF",
    featured: true,
    badge: "Live",
  },
  {
    id: "routez",
    title: "Routez",
    description:
      "An AI trip generator that creates personalized travel itineraries from your preferences.",
    longDescription:
      "An AI trip generator that builds personalized travel itineraries based on your preferences — offering ideal routes, attractions, accommodations, and dining for a seamless travel experience.",
    category: ["Full Stack", "AI/ML"],
    tech: ["React", "OpenAI API", "REST API"],
    liveUrl: "https://routez.travel/",
    coverImage: "/Routez.jpeg",
    gradientFrom: "#864797",
    gradientTo: "#B190C1",
    featured: true,
    badge: "Live",
  },
  {
    id: "market-ticker",
    title: "Market Ticker",
    description:
      "A cryptocurrency tracker with real-time price updates and detailed insights across coins.",
    longDescription:
      "A cryptocurrency tracking app that provides real-time price updates and detailed insights for various cryptocurrencies. Users can monitor their favorite coins and access historical data for informed decision-making.",
    category: ["Full Stack"],
    tech: ["React", "JavaScript", "REST API"],
    liveUrl: "https://market-ticker.vercel.app/crypto",
    coverImage: "/MarketTicker.jpg",
    gradientFrom: "#B190C1",
    gradientTo: "#864797",
    featured: false,
    badge: "Live",
  },
  {
    id: "weather-app",
    title: "Weather App",
    description:
      "Real-time weather and forecasts for your current location, with worldwide search.",
    longDescription:
      "A weather app that provides real-time weather data and forecasts based on the user's current location. It also features search, letting users check the weather for any location worldwide.",
    category: ["Full Stack"],
    tech: ["React", "JavaScript", "REST API", "CSS"],
    liveUrl: "https://weather-app-tushar-dhankhar.netlify.app/",
    coverImage: "/Weather.jpg",
    gradientFrom: "#0CC0DF",
    gradientTo: "#864797",
    featured: false,
    badge: "Live",
  },
  {
    id: "multi-project-portal",
    title: "Multi Project Portal",
    description:
      "A multi-project app offering practice questions across a range of topics and skills.",
    longDescription:
      "A multi-project app offering practice questions across various topics and skills. Users can explore different projects, test their knowledge, and improve through curated questions and challenges.",
    category: ["Full Stack", "Tools"],
    tech: ["React", "JavaScript"],
    liveUrl: "https://multi-projects-portal.netlify.app/",
    coverImage: "/Portal.jpg",
    gradientFrom: "#0CC0DF",
    gradientTo: "#B190C1",
    featured: false,
    badge: "Live",
  },
];

export const fallbackExperiences: Experience[] = [
  {
    id: "viamedia",
    company: "Viamedia",
    companyUrl: "https://viamedia.ai/",
    role: "Senior Software Engineer",
    start: "Nov 2024",
    end: null,
    location: "Lexington, Kentucky (Remote)",
    type: "Full-time",
    bullets: [
      "Architected the Linear TV plan-to-activation workflow in React 19/TypeScript, extracting budget, pricing, and spot-derivation logic into a framework-agnostic domain module backed by 270 unit tests.",
      "Redesigned catalog data access from full-catalog client downloads to size-aware, zone-scoped batched queries with deduplication and staleness control, eliminating ~500 sequential requests per session.",
      "Designed and implemented a shared, embeddable chat widget as a Shadow DOM Web Component adopted across 3 products, delivering a single 77 KB gzipped bundle with style isolation, a themeable integration API, and resilient WebSocket communication with auto-reconnect and timeout recovery.",
      "Engineered a hexagon-based map layer for a React/Redux geospatial platform, implementing resolution-capping logic that reduced requested map cells by up to 98% across large regions and batch-loading that progressively rendered results without blocking on complete datasets.",
      "Contributed to backend functionality using Node.js/Express, implementing REST APIs, relational database workflows, and data models to support end-to-end product features.",
    ],
    tech: [
      "React 19",
      "TypeScript",
      "Redux",
      "Web Components",
      "WebSocket",
      "Node.js",
      "Express.js",
      "REST APIs",
    ],
    color: "#864797",
  },
  {
    id: "appdesk",
    company: "AppDesk Services",
    companyUrl: "https://appdeskservices.com/",
    role: "Software Development Engineer",
    start: "Nov 2021",
    end: "Sep 2024",
    location: "Gurugram, Haryana",
    type: "Full-time",
    bullets: [
      "Built and shipped scalable web applications using React, Remix, and Styled Components, developing reusable UI modules and contributing to application architecture.",
      "Optimized Remix application performance, improving page load times by 30% through frontend performance tuning, rendering optimizations, and efficient data-fetching patterns.",
      "Translated product requirements into production-ready UI modules, collaborating with cross-functional teams to deliver features and accelerate project completion by 15%.",
      "Mentored 3+ new engineers on frontend development, codebase conventions, and development workflows, helping reduce onboarding time and improve feature delivery.",
      "Conducted peer code reviews and technical knowledge-sharing sessions, improving code quality, consistency, and maintainability across the team.",
    ],
    tech: ["React", "Remix.js", "Styled Components", "JavaScript"],
    color: "#0CC0DF",
  },
  {
    id: "limetray",
    company: "Limetray",
    companyUrl: "https://limetray.com/",
    role: "Associate Software Engineer",
    start: "Aug 2020",
    end: "Jul 2021",
    location: "Gurugram, Haryana",
    type: "Full-time",
    bullets: [
      "Developed and shipped production web applications using HTML, CSS, JavaScript, and React, building responsive interfaces with cross-browser compatibility and performance considerations.",
      "Collaborated with senior engineers and cross-functional team members to develop and maintain features across live production applications.",
      "Introduced and integrated a testing framework that improved code quality and reduced production bugs by 20%, establishing more reliable validation for application changes.",
    ],
    tech: ["HTML", "CSS", "JavaScript", "React"],
    color: "#B190C1",
  },
  {
    id: "dmrc",
    company: "Delhi Metro Rail Corporation",
    companyUrl: "https://www.delhimetrorail.com/",
    role: "Intern",
    start: "May 2019",
    end: "Jun 2019",
    location: "New Delhi, India",
    type: "Internship",
    bullets: [
      "Worked under the mentorship of the General Manager of the IT department to develop a project for Permanent Journey Planner (PJP) optimisation for sales representatives using Data Analytics in Python.",
    ],
    tech: ["Python", "Data Analytics"],
    color: "#864797",
  },
];

export const fallbackAbout: AboutContent = {
  heading: "About Me",
  bio: [
    "I'm a Senior Software Engineer with 6+ years of experience building scalable web applications. Currently at Viamedia, where I architect the Linear TV plan-to-activation workflow in React 19/TypeScript and build shared platform pieces — an embeddable Shadow DOM chat widget adopted across 3 products, and a hexagon-based map layer for a React/Redux geospatial platform.",
    "My stack of choice: React, Next.js and TypeScript on the frontend, Node.js / Express on the backend, and PostgreSQL for data. I care about the unglamorous parts — extracting business logic into framework-agnostic domain modules, backing them with real test coverage, and cutting hundreds of redundant network requests out of a session.",
    "Along the way I've mentored 3+ engineers onto frontend teams, run peer reviews and knowledge-sharing sessions, and shipped Join The Jashn — a self-serve digital invitation platform — from concept to paying customers. I believe in writing code that's not just functional, but maintainable, tested, and a pleasure to read.",
  ],
  location: "Delhi, India",
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
    "Senior Software Engineer",
    "Full Stack Engineer",
    "React & TypeScript Specialist",
    "Problem Solver",
  ],
  heroGreeting: "Hi there, I'm",
  heroTagline:
    "I build fast, beautiful, and intelligent web experiences. Passionate about full-stack engineering, AI integrations, and crafting products that make people's lives easier.",
  resumeUrl: "/Tushar_Dhankhar_Resume.pdf",
  email: "tushardhankhar98@gmail.com",
  githubUrl: "https://github.com/tushardhankhar",
  linkedinUrl: "https://www.linkedin.com/in/tushar-dhankhar",
  twitterUrl: "",
  instagramUrl: "https://www.instagram.com/tushardhankhar98/",
  availabilityStatus: "Available for opportunities",
  stats: [
    { value: "6+", label: "Years Experience" },
    { value: "30+", label: "Projects Shipped" },
    { value: "10+", label: "Open Source Contributions" },
  ],
};

export const fallbackSkills: Skill[] = [
  // Frontend
  { id: "react", name: "React", category: "Frontend", proficiency: 95, order: 0 },
  { id: "typescript", name: "TypeScript", category: "Frontend", proficiency: 92, order: 1 },
  { id: "javascript", name: "JavaScript", category: "Frontend", proficiency: 95, order: 2 },
  { id: "nextjs", name: "Next.js", category: "Frontend", proficiency: 90, order: 3 },
  { id: "remix", name: "Remix.js", category: "Frontend", proficiency: 85, order: 4 },
  { id: "redux", name: "Redux", category: "Frontend", proficiency: 88, order: 5 },
  { id: "tailwind", name: "Tailwind CSS", category: "Frontend", proficiency: 90, order: 6 },
  { id: "styled-components", name: "Styled Components", category: "Frontend", proficiency: 88, order: 7 },
  { id: "material-ui", name: "Material UI", category: "Frontend", proficiency: 82, order: 8 },
  { id: "framer-motion", name: "Framer Motion", category: "Frontend", proficiency: 85, order: 9 },
  { id: "html", name: "HTML", category: "Frontend", proficiency: 95, order: 10 },
  { id: "css", name: "CSS", category: "Frontend", proficiency: 92, order: 11 },
  // Backend
  { id: "nodejs", name: "Node.js", category: "Backend", proficiency: 85, order: 0 },
  { id: "express", name: "Express.js", category: "Backend", proficiency: 85, order: 1 },
  { id: "rest-apis", name: "REST APIs", category: "Backend", proficiency: 90, order: 2 },
  { id: "postgresql", name: "PostgreSQL", category: "Backend", proficiency: 85, order: 3 },
  { id: "supabase", name: "Supabase", category: "Backend", proficiency: 82, order: 4 },
  { id: "mongodb", name: "MongoDB", category: "Backend", proficiency: 78, order: 5 },
  // DevOps
  { id: "vercel", name: "Vercel", category: "DevOps", proficiency: 88, order: 0 },
  { id: "aws", name: "AWS (EC2, Lambda, CloudWatch)", category: "DevOps", proficiency: 75, order: 1 },
  { id: "cloudflare-r2", name: "Cloudflare R2 / S3", category: "DevOps", proficiency: 78, order: 2 },
  { id: "docker", name: "Docker", category: "DevOps", proficiency: 72, order: 3 },
  // Tools
  { id: "git", name: "Git", category: "Tools", proficiency: 90, order: 0 },
  { id: "postman", name: "Postman", category: "Tools", proficiency: 85, order: 1 },
  { id: "vscode", name: "VS Code", category: "Tools", proficiency: 90, order: 2 },
];
