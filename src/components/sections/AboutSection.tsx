"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import GitHubHeatmap from "@/components/ui/GitHubHeatmap";
import { cn } from "@/lib/utils";
import { fallbackAbout, type AboutContent } from "@/data/fallback";
import type { GitHubData } from "@/lib/github";

interface AboutSectionProps {
  id?: string;
  about?: AboutContent;
  github?: GitHubData | null;
}

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "TD";
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (first + last).toUpperCase() || "TD";
}

/** Compact number formatter for stats (e.g. 1.2k). */
function fmt(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;
  return String(n);
}

export default function AboutSection({
  id,
  about = fallbackAbout,
  github,
}: AboutSectionProps) {
  const monogram = initialsOf("Tushar Dhankhar");

  const stats: { value: string; label: string }[] = [];
  if (github) {
    if (github.totalContributions)
      stats.push({ value: fmt(github.totalContributions), label: "Contributions" });
    if (github.publicRepos !== null)
      stats.push({ value: fmt(github.publicRepos), label: "Repositories" });
    if (github.followers !== null)
      stats.push({ value: fmt(github.followers), label: "Followers" });
    if (github.totalStars !== null)
      stats.push({ value: fmt(github.totalStars), label: "Stars" });
  }

  return (
    <section id={id} className="section-luxe overflow-hidden">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="About"
          index="01"
          title={about.heading}
          className="mb-14 lg:mb-20"
        />

        {/* Editorial bento — few, large cells, generous negative space */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          {/* Bio — large, spans most of the width */}
          <Reveal className="lg:col-span-8" delay={0.05}>
            <div className="surface surface-hover h-full p-8 lg:p-12 flex flex-col sm:flex-row gap-8 lg:gap-10">
              {/* Avatar or monogram */}
              <div className="flex-shrink-0">
                {about.avatar ? (
                  <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-2xl overflow-hidden border border-[color:var(--line-strong)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={about.avatar}
                      alt="Portrait"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl flex items-center justify-center text-2xl lg:text-3xl border border-[color:var(--line-strong)] bg-white/[0.02]"
                    style={{
                      fontFamily: "var(--font-poppins)",
                      fontWeight: 600,
                      letterSpacing: "-0.03em",
                      color: "var(--gold)",
                    }}
                  >
                    {monogram}
                  </div>
                )}
              </div>

              {/* Bio column */}
              <div className="flex flex-col gap-5 max-w-2xl">
                {about.bio.map((paragraph, i) => (
                  <p
                    key={i}
                    className={cn(
                      "leading-[1.85] text-[1.02rem]",
                      i === 0 ? "text-soft" : "text-muted-luxe"
                    )}
                    style={{ fontFamily: "var(--font-raleway)" }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Detail cell — location + availability */}
          <Reveal className="lg:col-span-4" delay={0.12}>
            <div className="surface surface-hover h-full p-8 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <span className="eyebrow">Based in</span>
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--gold)" }}
                  />
                  <span
                    className="text-soft text-[1.05rem]"
                    style={{ fontFamily: "var(--font-poppins)", fontWeight: 500 }}
                  >
                    {about.location}
                  </span>
                </div>
              </div>

              <div className="hairline" />

              <div className="flex flex-col gap-4">
                <span className="eyebrow">Availability</span>
                {about.availableForWork && (
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-dot-pulse"
                      style={{ background: "var(--gold)" }}
                    />
                    <span
                      className="text-soft text-sm"
                      style={{ fontFamily: "var(--font-poppins)", fontWeight: 500 }}
                    >
                      Available for work
                    </span>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {about.availabilityTags.map((tag) => (
                    <span key={tag} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* GitHub cell (if data) — heatmap + stats */}
          {github ? (
            <Reveal className="lg:col-span-7" delay={0.18}>
              <div className="surface surface-hover h-full p-8 lg:p-10 flex flex-col gap-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="eyebrow">Open Source</span>
                  <span
                    className="text-faint text-xs tracking-wide"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    @{github.username}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <GitHubHeatmap weeks={github.weeks} />
                </div>

                {stats.length > 0 && (
                  <>
                    <div className="hairline-gold" />
                    <div className="flex flex-wrap gap-x-10 gap-y-5">
                      {stats.map((s) => (
                        <div key={s.label} className="flex flex-col gap-1">
                          <span
                            className="text-2xl lg:text-3xl text-[#faf8f4]"
                            style={{
                              fontFamily: "var(--font-poppins)",
                              fontWeight: 600,
                              letterSpacing: "-0.03em",
                            }}
                          >
                            {s.value}
                          </span>
                          <span className="text-faint text-xs uppercase tracking-[0.18em]">
                            {s.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </Reveal>
          ) : null}

          {/* Philosophy pull-quote */}
          <Reveal
            className={cn(github ? "lg:col-span-5" : "lg:col-span-7")}
            delay={0.24}
          >
            <div className="surface h-full p-8 lg:p-10 flex flex-col justify-center relative overflow-hidden">
              <span
                aria-hidden
                className="absolute -top-8 -left-2 select-none pointer-events-none leading-none"
                style={{
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 700,
                  fontSize: "11rem",
                  color: "var(--gold)",
                  opacity: 0.08,
                }}
              >
                &ldquo;
              </span>
              <blockquote
                className="relative text-[1.35rem] lg:text-[1.6rem] leading-[1.4] text-[#faf8f4]"
                style={{
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              >
                {about.philosophy}
              </blockquote>
            </div>
          </Reveal>

          {/* Fun facts — quiet ticker / muted list */}
          {about.funFacts.length > 0 && (
            <Reveal className={cn(github ? "lg:col-span-12" : "lg:col-span-5")} delay={0.3}>
              <div className="surface h-full px-8 py-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
                <span className="eyebrow shrink-0">Off the clock</span>
                <ul className="flex flex-wrap gap-x-8 gap-y-2">
                  {about.funFacts.map((fact) => (
                    <li
                      key={fact}
                      className="text-muted-luxe text-sm"
                      style={{ fontFamily: "var(--font-raleway)" }}
                    >
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
