"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
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

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category.includes(activeFilter));

  return (
    <section id={id} className="section-luxe" style={{ background: "var(--ink-2)" }}>
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Selected Work"
          index="04"
          title={
            <>
              Things I&apos;ve <span className="gradient-gold">built</span>
            </>
          }
          intro="A handful of projects that I'm proud of — from production platforms to open-source tools."
        />

        {/* Minimal editorial filter — text with animated gold underline */}
        <Reveal
          delay={0.1}
          className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3"
        >
          {FILTER_TABS.map((tab) => {
            const active = activeFilter === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={cn(
                  "relative cursor-pointer pb-1 text-sm transition-colors duration-300",
                  active ? "text-[#faf8f4]" : "text-muted-luxe hover:text-soft"
                )}
                style={{
                  fontFamily: "var(--font-poppins)",
                  letterSpacing: "0.01em",
                }}
              >
                {tab}
                {active && (
                  <motion.span
                    layoutId="project-filter-underline"
                    className="absolute inset-x-0 -bottom-px h-px"
                    style={{ background: "var(--gold)" }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            );
          })}
        </Reveal>

        {/* Editorial numbered rows */}
        <div
          className="mt-4 border-t"
          style={{ borderColor: "var(--line)" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {filtered.map((project, index) => (
                <ProjectRow
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* View all */}
        <Reveal delay={0.1} className="mt-14 flex justify-center">
          <a
            href="https://github.com/tushardhankhar"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-muted-luxe transition-colors hover:text-[var(--gold)]"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            View all projects on GitHub
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.07,
      }}
      className={cn(
        "group grid grid-cols-1 items-center gap-8 border-b py-10 lg:grid-cols-[3rem_1fr_auto]",
        project.featured && "lg:py-14"
      )}
      style={{ borderColor: "var(--line)" }}
    >
      {/* index */}
      <div
        className="text-faint text-sm tabular-nums lg:pt-1"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* content */}
      <div className="flex flex-col gap-4 lg:order-2">
        <div className="flex flex-wrap items-center gap-3">
          {project.badge && (
            <span
              className="text-faint text-[0.62rem] uppercase tracking-[0.22em]"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {project.badge}
            </span>
          )}
          {project.category.map((cat) => (
            <span
              key={cat}
              className="text-muted-luxe text-[0.62rem] uppercase tracking-[0.18em]"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {cat}
            </span>
          ))}
        </div>

        <a
          href={project.liveUrl ?? project.githubUrl ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <h3
            className={cn(
              "display transition-colors duration-300 group-hover:text-[var(--gold)]",
              project.featured ? "display-lg" : "display-md"
            )}
            style={{ color: "#faf8f4" }}
          >
            {project.title}
          </h3>
        </a>

        <p
          className={cn(
            "text-muted-luxe leading-relaxed",
            project.featured ? "max-w-2xl text-[1.02rem]" : "max-w-xl text-[0.95rem]"
          )}
          style={{ fontFamily: "var(--font-raleway)" }}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((tag) => (
            <span key={tag} className="tech-tag">
              {tag}
            </span>
          ))}
        </div>

        {/* text links */}
        <div
          className="mt-1 flex items-center gap-6 text-sm"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-soft transition-colors hover:text-[var(--gold)]"
            >
              Live <ArrowUpRight size={14} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-soft transition-colors hover:text-[var(--gold)]"
            >
              Code <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>

      {/* visual — cover image or refined gradient block */}
      <a
        href={project.liveUrl ?? project.githubUrl ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group/vis relative block overflow-hidden rounded-xl lg:order-3",
          project.featured
            ? "aspect-[16/10] w-full lg:w-[22rem]"
            : "aspect-[16/10] w-full lg:w-64"
        )}
        style={{ border: "1px solid var(--line)" }}
        aria-label={`View ${project.title}`}
      >
        {project.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.coverImage}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <span
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]"
            style={{
              background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
              opacity: 0.6,
            }}
          />
        )}

        {/* subtle grid overlay */}
        <span
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

        {/* darkening wash for depth */}
        <span
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 40%, rgba(8,9,12,0.55) 100%)",
          }}
        />

        {/* hover affordance */}
        <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs"
            style={{
              fontFamily: "var(--font-poppins)",
              background: "rgba(8,9,12,0.6)",
              border: "1px solid var(--line-strong)",
              color: "#faf8f4",
              backdropFilter: "blur(6px)",
            }}
          >
            View <ArrowUpRight size={13} />
          </span>
        </span>
      </a>
    </motion.article>
  );
}
