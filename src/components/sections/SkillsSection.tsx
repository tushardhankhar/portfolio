"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { fallbackSkills, type Skill, type SkillCategory } from "@/data/fallback";

interface SkillsSectionProps {
  id?: string;
  skills?: Skill[];
}

const CATEGORY_ORDER: SkillCategory[] = [
  "Frontend",
  "Backend",
  "AI/ML",
  "DevOps",
  "Tools",
];

export default function SkillsSection({
  id,
  skills = fallbackSkills,
}: SkillsSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Categories actually present, in canonical order
  const categories = useMemo(
    () => CATEGORY_ORDER.filter((c) => skills.some((s) => s.category === c)),
    [skills]
  );

  const [activeCat, setActiveCat] = useState<SkillCategory | "All">("All");

  // Average proficiency per category → radar vertices
  const radar = useMemo(() => {
    return categories.map((cat) => {
      const items = skills.filter((s) => s.category === cat);
      const avg =
        items.reduce((a, s) => a + s.proficiency, 0) / Math.max(items.length, 1);
      return { cat, value: Math.round(avg) };
    });
  }, [categories, skills]);

  const visibleSkills = useMemo(() => {
    const list =
      activeCat === "All" ? skills : skills.filter((s) => s.category === activeCat);
    return [...list].sort((a, b) => b.proficiency - a.proficiency);
  }, [skills, activeCat]);

  // --- Radar geometry ---
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2 - 46;
  const n = radar.length;

  const angleFor = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const pointAt = (i: number, ratio: number) => {
    const a = angleFor(i);
    return [cx + Math.cos(a) * R * ratio, cy + Math.sin(a) * R * ratio] as const;
  };

  const polygonPoints = radar
    .map((d, i) => pointAt(i, d.value / 100).join(","))
    .join(" ");

  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <section id={id} ref={ref} className="section-luxe" style={{ background: "var(--ink)" }}>
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Capabilities"
          index="03"
          title={
            <>
              The tools I reach <span className="gradient-gold">for</span>
            </>
          }
          intro="A snapshot of where my depth lies — averaged by domain, with the individual breakdown alongside."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* RADAR */}
          <Reveal className="flex justify-center">
            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              className="max-w-full"
              role="img"
              aria-label="Skill proficiency radar by domain"
            >
              {/* grid rings */}
              {rings.map((r) => (
                <polygon
                  key={r}
                  points={radar
                    .map((_, i) => pointAt(i, r).join(","))
                    .join(" ")}
                  fill="none"
                  stroke="rgba(236,233,228,0.08)"
                  strokeWidth={1}
                />
              ))}

              {/* axes */}
              {radar.map((d, i) => {
                const [x, y] = pointAt(i, 1);
                const [lx, ly] = pointAt(i, 1.16);
                return (
                  <g key={d.cat}>
                    <line
                      x1={cx}
                      y1={cy}
                      x2={x}
                      y2={y}
                      stroke="rgba(236,233,228,0.08)"
                      strokeWidth={1}
                    />
                    <text
                      x={lx}
                      y={ly}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{
                        fontFamily: "var(--font-poppins)",
                        fontSize: 11,
                        letterSpacing: "0.04em",
                        fill: "rgba(236,233,228,0.6)",
                      }}
                    >
                      {d.cat}
                    </text>
                  </g>
                );
              })}

              {/* value polygon — scales in from center */}
              <motion.polygon
                points={polygonPoints}
                fill="rgba(134,71,151,0.22)"
                stroke="#b190c1"
                strokeWidth={1.5}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* vertex dots */}
              {radar.map((d, i) => {
                const [x, y] = pointAt(i, d.value / 100);
                return (
                  <motion.circle
                    key={d.cat}
                    cx={x}
                    cy={y}
                    r={3}
                    fill="#e9c84b"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
                  />
                );
              })}
            </svg>
          </Reveal>

          {/* BARS + FILTER */}
          <div className="flex flex-col gap-6">
            <Reveal className="flex flex-wrap gap-2">
              {(["All", ...categories] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className="px-3.5 py-1.5 rounded-full text-xs transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-poppins)",
                    letterSpacing: "0.02em",
                    color: activeCat === cat ? "#0c0a07" : "var(--text-muted)",
                    background:
                      activeCat === cat ? "#f4f1ea" : "rgba(255,255,255,0.03)",
                    border:
                      activeCat === cat
                        ? "1px solid transparent"
                        : "1px solid var(--line)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </Reveal>

            <div className="flex flex-col gap-4">
              {visibleSkills.map((skill, i) => (
                <div key={skill.id}>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span
                      className="text-soft text-sm"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {skill.name}
                    </span>
                    <span
                      className="text-faint text-xs tabular-nums"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {skill.proficiency}
                    </span>
                  </div>
                  <div
                    className="h-px w-full overflow-hidden"
                    style={{ background: "rgba(236,233,228,0.08)" }}
                  >
                    <motion.div
                      className="h-px"
                      style={{
                        background:
                          "linear-gradient(90deg, #864797, #e9c84b)",
                        height: 2,
                        marginTop: -0.5,
                      }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.proficiency}%` } : {}}
                      transition={{
                        duration: 0.9,
                        delay: 0.1 + i * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
