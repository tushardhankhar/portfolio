"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, ArrowRight, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

const ROLES = [
  "Full Stack Engineer",
  "AI Builder",
  "Open Source Contributor",
  "Problem Solver",
];

interface HeroSectionProps {
  id?: string;
}

export default function HeroSection({ id }: HeroSectionProps) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Typewriter effect
  useEffect(() => {
    const role = ROLES[currentRoleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (isTyping) {
      if (displayText.length < role.length) {
        timeout = setTimeout(() => {
          setDisplayText(role.slice(0, displayText.length + 1));
        }, 60);
      } else {
        // Pause before erasing
        timeout = setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 35);
      } else {
        setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentRoleIndex]);

  // GSAP entrance animation
  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      const children = contentRef.current?.querySelectorAll("[data-animate]");
      if (!children) return;

      gsap.fromTo(
        children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }, contentRef);

    return () => ctx.revert();
  }, []);

  const scrollToWork = () => {
    const el = document.getElementById("work");
    if (el) {
      const lenis = (window as unknown as { lenis?: { scrollTo: (target: Element, opts?: object) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -80 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const scrollDown = () => {
    const el = document.getElementById("about");
    if (el) {
      const lenis = (window as unknown as { lenis?: { scrollTo: (target: Element, opts?: object) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -80 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id={id}
      ref={heroRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      style={{ background: "#0d1017" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(134,71,151,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(134,71,151,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Background glow spots */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-[0.08] blur-3xl"
        style={{ background: "#864797" }}
      />
      <div
        className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full opacity-[0.06] blur-3xl"
        style={{ background: "#0CC0DF" }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* LEFT — Content (60%) */}
          <div
            ref={contentRef}
            className="flex-1 lg:max-w-[60%] flex flex-col gap-5"
          >
            {/* Greeting pill */}
            <div data-animate className="opacity-0">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border"
                style={{
                  fontFamily: "var(--font-poppins)",
                  background: "rgba(134,71,151,0.1)",
                  borderColor: "rgba(134,71,151,0.3)",
                  color: "#B190C1",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available for opportunities
              </span>
            </div>

            {/* Greeting text */}
            <p
              data-animate
              className="opacity-0 text-white/60 text-lg"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              Hi there, I&apos;m
            </p>

            {/* Name */}
            <h1
              data-animate
              className="opacity-0"
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 700,
                fontSize: "clamp(2.5rem, 7vw, 5rem)",
                lineHeight: 1.05,
                background:
                  "linear-gradient(135deg, #ffffff 0%, #B190C1 60%, #864797 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Tushar
              <br />
              Dhankhar
            </h1>

            {/* Role typewriter */}
            <div
              data-animate
              className="opacity-0 flex items-center gap-2 h-10"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              <span
                className="text-xl lg:text-2xl font-semibold"
                style={{ color: "#F2DA00" }}
              >
                {displayText}
              </span>
              <span
                className="inline-block w-0.5 h-7 animate-cursor-blink"
                style={{ background: "#F2DA00" }}
              />
            </div>

            {/* Bio */}
            <p
              data-animate
              className="opacity-0 text-white/60 text-lg leading-relaxed max-w-lg"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              I build fast, beautiful, and intelligent web experiences. Passionate
              about full-stack engineering, AI integrations, and crafting products
              that make people&apos;s lives easier.
            </p>

            {/* CTA Buttons */}
            <div data-animate className="opacity-0 flex flex-wrap gap-4 pt-2">
              <button onClick={scrollToWork} className="btn-primary group">
                View My Work
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
              <a
                href="/Tushar_Dhankhar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-white"
              >
                <Download size={16} />
                Download Resume
              </a>
            </div>

            {/* Stats row */}
            <div
              data-animate
              className="opacity-0 flex flex-wrap gap-8 pt-4 border-t border-white/[0.06]"
            >
              {[
                { value: "5+", label: "Years Experience" },
                { value: "30+", label: "Projects Shipped" },
                { value: "10+", label: "Open Source Contributions" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span
                    className="text-2xl font-bold"
                    style={{
                      fontFamily: "var(--font-poppins)",
                      color: "#F2DA00",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-sm text-white/50"
                    style={{ fontFamily: "var(--font-raleway)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Animated blob (40%) */}
          <div className="lg:w-[40%] flex items-center justify-center">
            <div className="relative w-72 h-72 lg:w-96 lg:h-96">
              {/* Outer glow ring */}
              <div
                className="absolute inset-0 rounded-full animate-glow-pulse opacity-30"
                style={{
                  background:
                    "radial-gradient(circle, rgba(134,71,151,0.4) 0%, transparent 70%)",
                }}
              />

              {/* Blob */}
              <div
                className="absolute inset-8 animate-blob-morph animate-blob-float"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 40%, #864797 0%, #0CC0DF 50%, #2f3342 100%)",
                  animation:
                    "blobMorph 8s ease-in-out infinite, blobFloat 6s ease-in-out infinite, blobColorShift 10s ease-in-out infinite",
                  boxShadow:
                    "0 0 60px rgba(134,71,151,0.5), 0 0 120px rgba(12,192,223,0.2)",
                }}
              />

              {/* Inner highlight */}
              <div
                className="absolute inset-16 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent 60%)",
                  mixBlendMode: "overlay",
                }}
              />

              {/* Floating tech badges */}
              <div
                className="absolute -top-4 -right-4 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  fontFamily: "var(--font-poppins)",
                  background: "rgba(13,16,23,0.9)",
                  border: "1px solid rgba(242,218,0,0.4)",
                  color: "#F2DA00",
                  backdropFilter: "blur(8px)",
                }}
              >
                Next.js 15
              </div>
              <div
                className="absolute -bottom-2 -left-6 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  fontFamily: "var(--font-poppins)",
                  background: "rgba(13,16,23,0.9)",
                  border: "1px solid rgba(12,192,223,0.4)",
                  color: "#0CC0DF",
                  backdropFilter: "blur(8px)",
                }}
              >
                AI / LLM
              </div>
              <div
                className="absolute top-1/2 -right-8 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  fontFamily: "var(--font-poppins)",
                  background: "rgba(13,16,23,0.9)",
                  border: "1px solid rgba(177,144,193,0.4)",
                  color: "#B190C1",
                  backdropFilter: "blur(8px)",
                }}
              >
                TypeScript
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors cursor-pointer group"
        aria-label="Scroll down"
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ fontFamily: "var(--font-poppins)", fontSize: "0.65rem" }}
        >
          Scroll to explore
        </span>
        <ChevronDown
          size={20}
          className="animate-scroll-bounce group-hover:text-yellow"
        />
      </button>
    </section>
  );
}
