"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import MagneticButton from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";
import { fallbackSiteSettings, type SiteSettings } from "@/data/fallback";

/** 3D particle sphere — client-only, fades in as a faint ambient layer. */
const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

interface HeroSectionProps {
  id?: string;
  siteSettings?: SiteSettings;
}

export default function HeroSection({
  id,
  siteSettings = fallbackSiteSettings,
}: HeroSectionProps) {
  const ROLES = siteSettings.roles;
  const [firstName, ...lastNameParts] = siteSettings.name.split(" ");
  const lastName = lastNameParts.join(" ");
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
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
  }, [displayText, isTyping, currentRoleIndex, ROLES]);

  // GSAP staggered entrance for the left content
  useEffect(() => {
    if (!contentRef.current) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const children = contentRef.current?.querySelectorAll("[data-animate]");
      if (!children) return;

      gsap.fromTo(
        children,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "expo.out",
          delay: 0.15,
        }
      );
    }, contentRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const lenis = (window as unknown as {
      lenis?: { scrollTo: (target: Element, opts?: object) => void };
    }).lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: -80 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id={id}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      {/* Soft radial brand glow behind the canvas */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(720px 720px at 76% 38%, rgba(134,71,151,0.12), transparent 62%)",
        }}
      />

      {/* 3D particle sphere — ambient, edge-faded, behind content on small screens */}
      <div
        aria-hidden
        className="absolute inset-0 lg:inset-y-0 lg:left-auto lg:right-0 lg:w-[52%] pointer-events-none"
        style={{
          opacity: 0.78,
          WebkitMaskImage:
            "radial-gradient(70% 70% at 60% 45%, #000 38%, transparent 78%)",
          maskImage:
            "radial-gradient(70% 70% at 60% 45%, #000 38%, transparent 78%)",
        }}
      >
        <HeroCanvas />
      </div>

      <div className="container-luxe relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.55fr)] items-center gap-12">
          {/* LEFT — content */}
          <div ref={contentRef} className="flex flex-col gap-7 max-w-2xl">
            {/* Eyebrow greeting + live availability */}
            <div
              data-animate
              className="opacity-0 flex flex-wrap items-center gap-4"
            >
              <span className="eyebrow">{siteSettings.heroGreeting}</span>
              <span className="inline-flex items-center gap-2 text-[0.72rem] tracking-[0.18em] uppercase text-muted-luxe">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-dot-pulse"
                  style={{ background: "var(--gold)" }}
                />
                {siteSettings.availabilityStatus}
              </span>
            </div>

            {/* Name — oversized display, one accent word */}
            <h1
              data-animate
              className="opacity-0 display display-xl"
              style={{ lineHeight: 0.95, color: "#faf8f4" }}
            >
              {firstName}
              {lastName && (
                <>
                  <br />
                  <span className="gradient-text">{lastName}</span>
                </>
              )}
            </h1>

            {/* Role typewriter — small, refined, gold */}
            <div
              data-animate
              className="opacity-0 flex items-center gap-1.5 h-7"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              <span
                className="text-base lg:text-lg font-medium tracking-tight"
                style={{ color: "var(--gold)" }}
              >
                {displayText}
              </span>
              <span
                className="inline-block w-[2px] h-5 animate-cursor-blink"
                style={{ background: "var(--gold)" }}
              />
            </div>

            {/* Tagline */}
            <p
              data-animate
              className="opacity-0 text-muted-luxe text-[1.05rem] leading-relaxed max-w-[34rem]"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              {siteSettings.heroTagline}
            </p>

            {/* CTAs */}
            <div data-animate className="opacity-0 flex flex-wrap gap-3 pt-1">
              <MagneticButton
                className="btn-primary"
                onClick={() => scrollTo("work")}
                ariaLabel="View my work"
              >
                View Work
              </MagneticButton>
              <MagneticButton
                className="btn-ghost"
                href={siteSettings.resumeUrl}
                external
                ariaLabel="Open résumé in a new tab"
              >
                Résumé ↗
              </MagneticButton>
            </div>

            {/* Stats row — thin top hairline */}
            <div
              data-animate
              className="opacity-0 flex flex-wrap gap-x-12 gap-y-5 pt-7"
              style={{ borderTop: "1px solid var(--line)" }}
            >
              {siteSettings.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span
                    className="text-2xl lg:text-3xl tracking-tight"
                    style={{
                      fontFamily: "var(--font-poppins)",
                      fontWeight: 600,
                      color: "#faf8f4",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-[0.72rem] tracking-[0.12em] uppercase text-faint"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT column — intentionally empty; the canvas bleeds through here */}
          <div aria-hidden className="hidden lg:block" />
        </div>
      </div>

      {/* Minimal scroll indicator */}
      <button
        onClick={() => scrollTo("about")}
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3",
          "text-faint hover:text-soft transition-colors cursor-pointer group"
        )}
        aria-label="Scroll to next section"
      >
        <span
          className="text-[0.62rem] tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Scroll
        </span>
        <span
          className="block w-px h-10 animate-scroll-bounce"
          style={{
            background:
              "linear-gradient(180deg, var(--line-gold), transparent)",
          }}
        />
      </button>
    </section>
  );
}
