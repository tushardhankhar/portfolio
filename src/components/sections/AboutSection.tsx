"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Briefcase, Zap, Coffee, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const FUN_FACTS = [
  "☕ I run on coffee and curiosity",
  "🌙 Nights are my peak coding hours",
  "🎵 Lo-fi beats fuel my best PRs",
  "🧩 I treat every bug as a puzzle",
  "🚀 Shipped 3 side projects last month",
];

const AVAILABILITY_TAGS = [
  "Full-time",
  "Remote",
  "Contract",
  "Consulting",
];

interface AboutSectionProps {
  id?: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

export default function AboutSection({ id }: AboutSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#0d1017" }}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 opacity-30"
        style={{
          background: "linear-gradient(to bottom, transparent, #864797)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-2"
            style={{ fontFamily: "var(--font-poppins)", color: "#F2DA00" }}
          >
            Get to know me
          </p>
          <h2 className="section-title">About Me</h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* Large Bio Card — spans 2 columns */}
          <motion.div
            variants={cardVariants}
            className={cn(
              "glass-card p-6 lg:p-8 lg:col-span-2",
              "flex flex-col sm:flex-row gap-6"
            )}
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center text-3xl font-bold"
                style={{
                  fontFamily: "var(--font-poppins)",
                  background: "linear-gradient(135deg, #864797 0%, #0CC0DF 100%)",
                  boxShadow: "0 0 30px rgba(134,71,151,0.4)",
                  color: "white",
                }}
              >
                TD
              </div>
            </div>

            {/* Bio text */}
            <div className="flex flex-col gap-3">
              <h3
                className="text-xl font-semibold text-white"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Senior Full Stack Engineer
              </h3>
              <p
                className="text-white/60 leading-relaxed text-sm"
                style={{ fontFamily: "var(--font-raleway)" }}
              >
                I&apos;m a senior full-stack engineer with 5+ years of experience building
                scalable web applications. Currently at{" "}
                <span className="text-soft-purple font-medium">viamedia.ai</span>,
                where I architect and ship AI-powered advertising technology used by
                thousands of local businesses across the US.
              </p>
              <p
                className="text-white/60 leading-relaxed text-sm"
                style={{ fontFamily: "var(--font-raleway)" }}
              >
                My stack of choice: React / Next.js on the frontend, Node.js / Go on
                the backend, and PostgreSQL / Redis for data. I love integrating LLMs
                into products — turning language model capabilities into delightful
                real-world features.
              </p>
              <p
                className="text-white/60 leading-relaxed text-sm"
                style={{ fontFamily: "var(--font-raleway)" }}
              >
                Outside of work, I contribute to open source, write about engineering
                on my blog, and occasionally mentor junior developers. I believe in
                writing code that&apos;s not just functional, but maintainable, tested,
                and a pleasure to read.
              </p>
            </div>
          </motion.div>

          {/* Location Card */}
          <motion.div
            variants={cardVariants}
            className="glass-card p-6 flex flex-col gap-4"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(12,192,223,0.15)", color: "#0CC0DF" }}
            >
              <MapPin size={18} />
            </div>
            <div>
              <h4
                className="text-white font-semibold mb-1"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Hyderabad, India
              </h4>
              <p
                className="text-white/50 text-sm"
                style={{ fontFamily: "var(--font-raleway)" }}
              >
                IST (UTC+5:30)
              </p>
            </div>
            <div
              className="mt-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                fontFamily: "var(--font-poppins)",
                background: "rgba(12,192,223,0.1)",
                border: "1px solid rgba(12,192,223,0.25)",
                color: "#0CC0DF",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              Open to remote
            </div>
          </motion.div>

          {/* Availability Card */}
          <motion.div
            variants={cardVariants}
            className="glass-card p-6 flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(134,71,151,0.15)",
                  color: "#B190C1",
                }}
              >
                <Briefcase size={18} />
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            </div>
            <div>
              <h4
                className="text-white font-semibold mb-1"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Available for Opportunities
              </h4>
              <p
                className="text-white/50 text-sm mb-3"
                style={{ fontFamily: "var(--font-raleway)" }}
              >
                Currently exploring new roles
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {AVAILABILITY_TAGS.map((tag) => (
                <span key={tag} className="tech-tag">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Fun Fact Card */}
          <motion.div
            variants={cardVariants}
            className="glass-card p-6 flex flex-col gap-4"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(242,218,0,0.1)", color: "#F2DA00" }}
            >
              <Coffee size={18} />
            </div>
            <h4
              className="text-white font-semibold"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Fun Facts
            </h4>
            <ul className="flex flex-col gap-2">
              {FUN_FACTS.map((fact) => (
                <li
                  key={fact}
                  className="text-sm text-white/60 leading-relaxed"
                  style={{ fontFamily: "var(--font-raleway)" }}
                >
                  {fact}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Tech Philosophy Card */}
          <motion.div
            variants={cardVariants}
            className="glass-card p-6 flex flex-col gap-4 relative overflow-hidden"
          >
            {/* Background quote mark */}
            <div
              className="absolute -top-2 -right-2 text-8xl font-bold opacity-[0.04] pointer-events-none select-none"
              style={{ fontFamily: "var(--font-poppins)", color: "#864797" }}
            >
              &quot;
            </div>

            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(177,144,193,0.15)",
                color: "#B190C1",
              }}
            >
              <Zap size={18} />
            </div>
            <blockquote>
              <p
                className="text-white/70 text-sm leading-relaxed italic"
                style={{ fontFamily: "var(--font-raleway)" }}
              >
                &quot;Great software is not just about solving today&apos;s problems
                — it&apos;s about building a foundation that makes tomorrow&apos;s
                problems easier.&quot;
              </p>
            </blockquote>
            <div className="mt-auto flex items-center gap-2">
              <Quote size={12} className="text-white/30" />
              <span
                className="text-xs text-white/40"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                My engineering philosophy
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
