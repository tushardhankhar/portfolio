"use client";

import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";
import { formatDateRange } from "@/lib/utils";
import { fallbackExperiences, type Experience } from "@/data/fallback";

interface ExperienceSectionProps {
  id?: string;
  experiences?: Experience[];
  resumeUrl?: string;
}

export default function ExperienceSection({
  id,
  experiences = fallbackExperiences,
  resumeUrl = "/Tushar_Dhankhar_Resume.pdf",
}: ExperienceSectionProps) {
  return (
    <section id={id} className="section-luxe" style={{ background: "var(--ink)" }}>
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Experience"
          index="02"
          title={
            <>
              Where I&apos;ve <span className="gradient-gold">shipped</span>
            </>
          }
          intro="A few years of building, scaling, and shipping software people actually use."
        />

        {/* Editorial timeline — single hairline rail on the left */}
        <div className="relative mt-16 sm:mt-20 sm:pl-10">
          {/* vertical rail (hidden on small screens) */}
          <span
            aria-hidden
            className="absolute left-[3px] top-2 bottom-2 hidden w-px sm:block"
            style={{ background: "var(--line)" }}
          />

          <div className="flex flex-col">
            {experiences.map((exp, index) => {
              const isCurrent = exp.end === null;
              return (
                <Reveal
                  key={exp.id}
                  delay={index * 0.08}
                  className="relative py-10 first:pt-0"
                >
                  {/* hairline divider between entries */}
                  {index !== experiences.length - 1 && (
                    <div
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-px"
                      style={{ background: "var(--line)" }}
                    />
                  )}

                  {/* marker dot on the rail */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -left-[34px] top-[3.1rem] hidden h-[7px] w-[7px] rounded-full sm:block",
                      isCurrent && "animate-dot-pulse"
                    )}
                    style={{
                      background: exp.color,
                      transform: "translateX(-50%)",
                    }}
                  />

                  <div className="grid grid-cols-1 gap-x-10 gap-y-3 md:grid-cols-[8.5rem_1fr]">
                    {/* date column */}
                    <div
                      className="text-faint pt-1 text-xs tracking-wide"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {formatDateRange(exp.start, exp.end)}
                    </div>

                    {/* main column */}
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <h3
                          className="display display-md"
                          style={{ color: "#faf8f4" }}
                        >
                          {exp.role}
                        </h3>
                        <div
                          className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm"
                          style={{ fontFamily: "var(--font-poppins)" }}
                        >
                          {exp.companyUrl ? (
                            <a
                              href={exp.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group inline-flex items-center gap-1 text-soft transition-colors hover:text-[var(--gold)]"
                            >
                              {exp.company}
                              <ArrowUpRight
                                size={13}
                                className="text-faint transition-colors group-hover:text-[var(--gold)]"
                              />
                            </a>
                          ) : (
                            <span className="text-soft">{exp.company}</span>
                          )}
                          <span className="text-faint">·</span>
                          <span className="text-muted-luxe text-xs">
                            {exp.type}
                          </span>
                          <span className="text-faint">·</span>
                          <span className="text-muted-luxe text-xs">
                            {exp.location}
                          </span>
                        </div>
                      </div>

                      {/* bullets */}
                      <ul className="flex flex-col gap-2.5">
                        {exp.bullets.map((bullet, i) => (
                          <li key={i} className="flex gap-3">
                            <span
                              aria-hidden
                              className="mt-[0.6rem] h-px w-3 flex-shrink-0"
                              style={{ background: "var(--line-gold)" }}
                            />
                            <span
                              className="text-muted-luxe text-[0.95rem] leading-relaxed"
                              style={{ fontFamily: "var(--font-raleway)" }}
                            >
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* tech */}
                      <div className="mt-1 flex flex-wrap gap-2">
                        {exp.tech.map((tag) => (
                          <span key={tag} className="tech-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Résumé CTA */}
        <Reveal delay={0.1} className="mt-16 flex justify-center">
          <MagneticButton
            href={resumeUrl}
            external
            className="btn-ghost"
            ariaLabel="Download résumé"
          >
            Download Résumé
            <ArrowUpRight size={16} />
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
