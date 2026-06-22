"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDateRange } from "@/lib/utils";

interface Experience {
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

const EXPERIENCES: Experience[] = [
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
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis", "AWS", "OpenAI API", "Docker"],
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
    tech: ["React", "Next.js", "Node.js", "MongoDB", "WebSockets", "Yjs", "Stripe", "Vercel"],
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
    tech: ["React", "GraphQL", "Express.js", "PostgreSQL", "TypeScript", "Cypress", "GCP"],
    color: "#B190C1",
  },
];

interface ExperienceSectionProps {
  id?: string;
}

export default function ExperienceSection({ id }: ExperienceSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0d1017 0%, #111520 50%, #0d1017 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-2"
            style={{ fontFamily: "var(--font-poppins)", color: "#F2DA00" }}
          >
            My journey
          </p>
          <h2 className="section-title">Experience</h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px overflow-hidden">
            <motion.div
              className="w-full"
              style={{
                background:
                  "linear-gradient(to bottom, #864797, #0CC0DF, #B190C1)",
              }}
              initial={{ height: "0%" }}
              animate={isInView ? { height: "100%" } : { height: "0%" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
            />
          </div>

          {/* Experience entries */}
          <div className="flex flex-col gap-12">
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.4 + index * 0.15,
                }}
                className="pl-16 md:pl-24 relative"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-4 md:left-6 top-6 w-4 h-4 rounded-full border-2 -translate-x-1/2 animate-dot-pulse"
                  style={{
                    background: exp.color,
                    borderColor: "#0d1017",
                    boxShadow: `0 0 12px ${exp.color}60`,
                  }}
                />

                {/* Card */}
                <div className="glass-card-hover p-6 lg:p-8">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3
                          className="text-lg font-semibold text-white"
                          style={{ fontFamily: "var(--font-poppins)" }}
                        >
                          {exp.role}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="font-semibold text-sm"
                          style={{ color: exp.color, fontFamily: "var(--font-poppins)" }}
                        >
                          {exp.company}
                        </span>
                        {exp.companyUrl && (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/30 hover:text-white/60 transition-colors"
                          >
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-1 flex-shrink-0">
                      <span
                        className="text-sm text-white/50"
                        style={{ fontFamily: "var(--font-poppins)" }}
                      >
                        {formatDateRange(exp.start, exp.end)}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs text-white/40"
                          style={{ fontFamily: "var(--font-raleway)" }}
                        >
                          {exp.location}
                        </span>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            fontFamily: "var(--font-poppins)",
                            background: `${exp.color}20`,
                            color: exp.color,
                            border: `1px solid ${exp.color}30`,
                          }}
                        >
                          {exp.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bullets */}
                  <ul className="flex flex-col gap-2 mb-5">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-3">
                        <span
                          className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                          style={{ background: exp.color }}
                        />
                        <span
                          className="text-sm text-white/60 leading-relaxed"
                          style={{ fontFamily: "var(--font-raleway)" }}
                        >
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{
                          fontFamily: "var(--font-poppins)",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "rgba(255,255,255,0.5)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Resume CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="/Tushar_Dhankhar_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-300",
              "bg-white/[0.04] border border-white/[0.08] text-white/70 hover:text-white",
              "hover:bg-white/[0.07] hover:border-yellow/30"
            )}
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            <Download
              size={16}
              className="text-yellow group-hover:translate-y-0.5 transition-transform"
            />
            View Full Resume
            <ExternalLink size={14} className="text-white/30" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
