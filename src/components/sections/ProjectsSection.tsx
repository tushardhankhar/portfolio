"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Code2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  fallbackProjects,
  type Project,
  type ProjectCategory,
} from "@/data/fallback";

type FilterCategory = "All" | ProjectCategory;

const FILTER_TABS: FilterCategory[] = ["All", "Full Stack", "AI/ML", "Tools"];

interface ProjectsSectionProps {
  id?: string;
  projects?: Project[];
}

export default function ProjectsSection({
  id,
  projects = fallbackProjects,
}: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category.includes(activeFilter));

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#0d1017" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-2"
            style={{ fontFamily: "var(--font-poppins)", color: "#F2DA00" }}
          >
            What I&apos;ve built
          </p>
          <h2 className="section-title">Projects</h2>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
                activeFilter === tab
                  ? "text-navy"
                  : "bg-white/[0.04] border border-white/[0.08] text-white/50 hover:text-white hover:bg-white/[0.07]"
              )}
              style={{
                fontFamily: "var(--font-poppins)",
                ...(activeFilter === tab
                  ? {
                      background: "#F2DA00",
                      border: "1px solid #F2DA00",
                    }
                  : {}),
              }}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: index * 0.08,
                }}
                className={cn(
                  "group glass-card overflow-hidden flex flex-col",
                  project.featured && "md:col-span-2"
                )}
              >
                {/* Gradient header */}
                <div
                  className="relative h-40 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${project.gradientFrom} 0%, ${project.gradientTo} 100%)`,
                  }}
                >
                  {/* Grid pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                      backgroundSize: "30px 30px",
                    }}
                  />

                  {/* Badge */}
                  {project.badge && (
                    <div className="absolute top-3 right-3">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{
                          fontFamily: "var(--font-poppins)",
                          background: "rgba(13,16,23,0.7)",
                          backdropFilter: "blur(8px)",
                          color: "white",
                          border: "1px solid rgba(255,255,255,0.15)",
                        }}
                      >
                        {project.badge}
                      </span>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span
                      className="flex items-center gap-2 text-white font-semibold text-sm"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      View Project
                      <ArrowRight size={16} />
                    </span>
                  </div>

                  {/* Category tags on image */}
                  <div className="absolute bottom-3 left-3 flex gap-1.5">
                    {project.category.map((cat) => (
                      <span
                        key={cat}
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          fontFamily: "var(--font-poppins)",
                          background: "rgba(13,16,23,0.65)",
                          backdropFilter: "blur(6px)",
                          color: "rgba(255,255,255,0.8)",
                        }}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <h3
                    className="text-lg font-semibold text-white mb-2 group-hover:text-soft-purple transition-colors"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-white/55 text-sm leading-relaxed mb-4 flex-1"
                    style={{ fontFamily: "var(--font-raleway)" }}
                  >
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((tag) => (
                      <span key={tag} className="tech-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-yellow transition-colors"
                        style={{ fontFamily: "var(--font-poppins)" }}
                      >
                        <ExternalLink size={13} />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-white transition-colors"
                        style={{ fontFamily: "var(--font-poppins)" }}
                      >
                        <Code2 size={13} />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="https://github.com/tushardhankhar"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium transition-colors"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            View All Projects on GitHub
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
