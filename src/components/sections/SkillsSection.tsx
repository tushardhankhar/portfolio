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

const EASE_LUXE = [0.16, 1, 0.3, 1] as const;

export default function SkillsSection({
  id,
  skills = fallbackSkills,
}: SkillsSectionProps) {
  // Radar and bars each watch their own box, so neither animates off-screen.
  const radarRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const radarInView = useInView(radarRef, { once: true, margin: "-100px" });
  const barsInView = useInView(barsRef, { once: true, margin: "-80px" });

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
      return { cat, value: Math.round(avg), count: items.length };
    });
  }, [categories, skills]);

  const visibleSkills = useMemo(() => {
    const list =
      activeCat === "All" ? skills : skills.filter((s) => s.category === activeCat);
    return [...list].sort((a, b) => b.proficiency - a.proficiency);
  }, [skills, activeCat]);

  // --- Radar geometry ---
  const size = 360;
  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2 - 54;
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
    <section id={id} className="section-luxe" style={{ background: "var(--ink)" }}>
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

        {/* Top-aligned: the bar list is far taller than the radar, so centring
            the two columns used to strand the radar in mid-air. */}
        <div className="mt-14 grid grid-cols-1 items-start gap-12 lg:mt-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          {/* RADAR — sticks alongside the list while it scrolls past */}
          <div ref={radarRef} className="lg:sticky lg:top-28">
            <Reveal variant="scale" className="flex flex-col items-center gap-6">
              <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="h-auto w-full max-w-[360px]"
                role="img"
                aria-label="Skill proficiency radar by domain"
              >
                <defs>
                  <linearGradient id="radarFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#b190c1" stopOpacity="0.34" />
                    <stop offset="100%" stopColor="#864797" stopOpacity="0.12" />
                  </linearGradient>
                  <filter id="radarGlow" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* grid rings */}
                {rings.map((r) => (
                  <polygon
                    key={r}
                    points={radar.map((_, i) => pointAt(i, r).join(",")).join(" ")}
                    fill="none"
                    stroke="rgba(236,233,228,0.07)"
                    strokeWidth={1}
                  />
                ))}

                {/* axes + labels */}
                {radar.map((d, i) => {
                  const [x, y] = pointAt(i, 1);
                  const [lx, ly] = pointAt(i, 1.19);
                  const isActive = activeCat === d.cat;
                  return (
                    <g key={d.cat}>
                      <line
                        x1={cx}
                        y1={cy}
                        x2={x}
                        y2={y}
                        stroke={
                          isActive
                            ? "rgba(233,200,75,0.45)"
                            : "rgba(236,233,228,0.07)"
                        }
                        strokeWidth={1}
                        style={{ transition: "stroke 0.4s ease" }}
                      />
                      <text
                        x={lx}
                        y={ly}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        style={{
                          fontFamily: "var(--font-poppins)",
                          fontSize: 11,
                          fontWeight: isActive ? 600 : 400,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          fill: isActive
                            ? "var(--gold)"
                            : "rgba(236,233,228,0.5)",
                          transition: "fill 0.4s ease",
                        }}
                      >
                        {d.cat}
                      </text>
                    </g>
                  );
                })}

                {/* value polygon — scales in from centre */}
                <motion.polygon
                  points={polygonPoints}
                  fill="url(#radarFill)"
                  stroke="#c4a4d6"
                  strokeWidth={1.5}
                  strokeLinejoin="round"
                  filter="url(#radarGlow)"
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={radarInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.9, ease: EASE_LUXE }}
                />

                {/* vertex dots — the filtered domain reads brighter */}
                {radar.map((d, i) => {
                  const [x, y] = pointAt(i, d.value / 100);
                  const isActive = activeCat === d.cat;
                  return (
                    <motion.circle
                      key={d.cat}
                      cx={x}
                      cy={y}
                      r={isActive ? 5 : 3}
                      fill="#e9c84b"
                      style={{ transition: "r 0.35s ease" }}
                      initial={{ opacity: 0 }}
                      animate={radarInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
                    />
                  );
                })}
              </svg>

              {/* radar legend — gives the shape a scale to be read against */}
              <p
                className="text-faint max-w-[22rem] text-center text-xs leading-relaxed"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Average proficiency per domain, 0–100
              </p>
            </Reveal>
          </div>

          {/* FILTER + BARS */}
          <div className="flex flex-col gap-8">
            <Reveal className="flex flex-wrap gap-2">
              {(["All", ...categories] as const).map((cat) => {
                const active = activeCat === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCat(cat)}
                    aria-pressed={active}
                    className="cursor-pointer rounded-full px-3.5 py-1.5 text-xs transition-all duration-300"
                    style={{
                      fontFamily: "var(--font-poppins)",
                      letterSpacing: "0.02em",
                      color: active ? "#0c0a07" : "var(--text-muted)",
                      background: active ? "#f4f1ea" : "rgba(255,255,255,0.03)",
                      border: active
                        ? "1px solid transparent"
                        : "1px solid var(--line)",
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </Reveal>

            {/* Two columns on desktop — halves the run of rows so the list
                sits beside the radar instead of towering over it. */}
            <div ref={barsRef}>
              {/* keyed inner node so switching filter replays the fill; the
                  observed ref stays on the stable wrapper above. */}
              <div
                key={activeCat}
                className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2"
              >
                {visibleSkills.map((skill, i) => (
                  <div key={skill.id} className="flex flex-col gap-2">
                    <div className="flex items-baseline justify-between gap-3">
                      <span
                        className="text-soft truncate text-sm"
                        style={{ fontFamily: "var(--font-poppins)" }}
                      >
                        {skill.name}
                      </span>
                      <span
                        className="text-faint shrink-0 text-xs tabular-nums"
                        style={{ fontFamily: "var(--font-poppins)" }}
                      >
                        {skill.proficiency}
                      </span>
                    </div>
                    <div
                      className="h-[3px] w-full overflow-hidden rounded-full"
                      style={{ background: "rgba(236,233,228,0.07)" }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, #864797, #b190c1 55%, #e9c84b)",
                        }}
                        initial={{ width: 0 }}
                        animate={
                          barsInView ? { width: `${skill.proficiency}%` } : {}
                        }
                        transition={{
                          duration: 0.9,
                          delay: 0.08 + Math.min(i, 12) * 0.045,
                          ease: EASE_LUXE,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
