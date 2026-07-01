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
    company: "Viamedia AI",
    companyUrl: "https://viamedia.ai/",
    role: "Software Development Engineer",
    start: "Nov 2024",
    end: null,
    location: "New Delhi, India",
    type: "Full-time",
    bullets: [
      "Developed and deployed frontend interfaces, integrating seamlessly with Web APIs and microservices, adhering strictly to client-specified wireframes.",
      "Responsible for maintaining and updating existing project based on client requirements.",
      "Assisted in the integration of Mapbox, enabling advanced mapping features and achieving significant cost savings up to 85%.",
    ],
    tech: ["Mapbox"],
    color: "#864797",
  },
  {
    id: "appdesk",
    company: "Appdesk Services",
    companyUrl: "https://appdeskservices.com/",
    role: "Software Development Engineer",
    start: "Nov 2021",
    end: "Aug 2024",
    location: "New Delhi, India",
    type: "Full-time",
    bullets: [
      "Designed and developed scalable applications as per requirements using React, Styled Components.",
      "Participated in requirement gathering and analysis, delivering multiple UI modules and features, following Agile methodologies.",
      "Mentored new joinees in getting started with frontend technology.",
      "Actively conducted peer code reviews and knowledge-sharing sessions.",
    ],
    tech: ["React", "Styled Components"],
    color: "#0CC0DF",
  },
  {
    id: "limetray",
    company: "Limetray",
    companyUrl: "https://limetray.com/",
    role: "Associate",
    start: "Aug 2020",
    end: "Jul 2021",
    location: "New Delhi, India",
    type: "Full-time",
    bullets: [
      "Designed and developed applications on the basis of client requirements using HTML, CSS, JavaScript and React.",
      "Upgraded existing applications to add new functionalities and remove bugs.",
      "Coordinated with team members on live projects and gained a complete understanding of live company projects.",
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
  resumeUrl:
    "https://drive.google.com/file/d/1TaguXNUQsiQxvxCIdFKBaLQFqi4pCwAU/view?usp=sharing",
  email: "tushardhankhar98@gmail.com",
  githubUrl: "https://github.com/tushardhankhar",
  linkedinUrl: "https://www.linkedin.com/in/tushar-dhankhar",
  twitterUrl: "",
  instagramUrl: "https://www.instagram.com/tushardhankhar98/",
  availabilityStatus: "Available for opportunities",
  stats: [
    { value: "5+", label: "Years Experience" },
    { value: "30+", label: "Projects Shipped" },
    { value: "10+", label: "Open Source Contributions" },
  ],
};

export const fallbackSkills: Skill[] = [
  // Frontend
  { id: "react", name: "React", category: "Frontend", proficiency: 95, order: 0 },
  { id: "javascript", name: "JavaScript", category: "Frontend", proficiency: 92, order: 1 },
  { id: "typescript", name: "TypeScript", category: "Frontend", proficiency: 85, order: 2 },
  { id: "html", name: "HTML", category: "Frontend", proficiency: 95, order: 3 },
  { id: "css", name: "CSS", category: "Frontend", proficiency: 92, order: 4 },
  { id: "tailwind", name: "Tailwind CSS", category: "Frontend", proficiency: 88, order: 5 },
  { id: "redux", name: "Redux", category: "Frontend", proficiency: 85, order: 6 },
  { id: "sass", name: "Sass", category: "Frontend", proficiency: 80, order: 7 },
  { id: "bootstrap", name: "Bootstrap", category: "Frontend", proficiency: 82, order: 8 },
  // Backend
  { id: "nodejs", name: "Node.js", category: "Backend", proficiency: 82, order: 0 },
  { id: "express", name: "Express", category: "Backend", proficiency: 80, order: 1 },
  { id: "mongodb", name: "MongoDB", category: "Backend", proficiency: 78, order: 2 },
  { id: "mysql", name: "MySQL", category: "Backend", proficiency: 75, order: 3 },
  { id: "firebase", name: "Firebase", category: "Backend", proficiency: 78, order: 4 },
  // DevOps
  { id: "docker", name: "Docker", category: "DevOps", proficiency: 72, order: 0 },
  // Tools
  { id: "git", name: "Git", category: "Tools", proficiency: 88, order: 0 },
  { id: "postman", name: "Postman", category: "Tools", proficiency: 85, order: 1 },
  { id: "vscode", name: "VS Code", category: "Tools", proficiency: 90, order: 2 },
];
