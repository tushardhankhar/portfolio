"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Code2,
  Link as LinkIcon,
  Camera,
  Mail,
  ArrowUp,
  Sparkles,
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import { openChat } from "@/lib/chat-events";
import type { SiteSettings } from "@/data/fallback";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const STACK = ["Next.js", "TypeScript", "Three.js", "Tailwind", "Sanity"];

interface FooterProps {
  siteSettings: SiteSettings;
}

export default function Footer({ siteSettings }: FooterProps) {
  const year = new Date().getFullYear();
  const locale = siteSettings.roles.slice(0, 3).join(" · ");

  // Live local clock (IST) — set after mount to avoid hydration mismatch.
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const tick = () =>
      setNow(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  const socials = [
    { label: "GitHub", href: siteSettings.githubUrl, icon: Code2 },
    { label: "LinkedIn", href: siteSettings.linkedinUrl, icon: LinkIcon },
    { label: "Instagram", href: siteSettings.instagramUrl, icon: Camera },
    { label: "Email", href: `mailto:${siteSettings.email}`, icon: Mail },
  ].filter((s) => Boolean(s.href));

  const scrollTo = useCallback((target: "top" | string) => {
    const lenis = (
      window as unknown as {
        lenis?: { scrollTo: (target: Element | number, opts?: object) => void };
      }
    ).lenis;

    if (target === "top") {
      if (lenis) lenis.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(target.replace("#", ""));
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -80 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <footer className="relative overflow-hidden" style={{ background: "var(--ink)" }}>
      {/* Top gold hairline + soft glow */}
      <div className="hairline-gold" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-48"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(233,200,75,0.05), transparent 70%)",
        }}
      />

      <div className="container-luxe relative z-10 pt-12 pb-10">
        {/* Meta bar — status + live clock */}
        <div className="flex flex-col gap-3 pb-10 text-[0.7rem] uppercase tracking-[0.18em] text-faint sm:flex-row sm:items-center sm:justify-between"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          <span className="inline-flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ background: "#3fb950" }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ background: "#3fb950", boxShadow: "0 0 8px rgba(63,185,80,0.7)" }}
              />
            </span>
            {siteSettings.availabilityStatus}
          </span>
          <span className="inline-flex items-center gap-2 text-muted-luxe">
            New Delhi, IN
            <span style={{ color: "var(--line-strong)" }}>/</span>
            <span className="tabular-nums text-soft">
              {now ?? "––:––"} IST
            </span>
          </span>
        </div>

        <div className="hairline" />

        {/* CTA row */}
        <div className="flex flex-col gap-6 py-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="eyebrow">Let&apos;s connect</span>
            <h2
              className="display display-md mt-4 leading-[1.05]"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Have an idea?{" "}
              <span className="gradient-gold">Let&apos;s build it.</span>
            </h2>
          </div>
          <div className="flex flex-shrink-0 items-center gap-3">
            <button onClick={() => scrollTo("#contact")} className="btn btn-primary">
              Get in touch
            </button>
            <button
              onClick={openChat}
              className="btn btn-ghost inline-flex items-center gap-1.5"
              aria-label="Ask the AI assistant about Tushar"
            >
              <Sparkles size={14} style={{ color: "var(--gold)" }} />
              Ask AI
            </button>
          </div>
        </div>

        <div className="hairline" />

        {/* Columns */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <button
              onClick={() => scrollTo("top")}
              className="group flex w-fit items-center gap-2.5 cursor-pointer"
              aria-label="Back to top"
            >
              <Logo className="h-6 w-[1.9rem] text-[#faf8f4] transition-[filter] duration-500 group-hover:[filter:drop-shadow(0_0_7px_rgba(233,200,75,0.55))]" />
              <span
                className="text-lg leading-none text-[#faf8f4]"
                style={{
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 600,
                  letterSpacing: "-0.04em",
                }}
              >
                {siteSettings.name}
              </span>
            </button>
            <p
              className="max-w-xs text-sm leading-relaxed text-muted-luxe"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              {locale}
            </p>
            <div className="flex items-center gap-2.5">
              {socials.map(({ label, href, icon: Icon }) => {
                const external = !href.startsWith("mailto:");
                return (
                  <a
                    key={label}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="footer-social flex h-9 w-9 items-center justify-center rounded-full border"
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigate */}
          <nav className="flex flex-col gap-3.5 md:border-l md:border-[color:var(--line)] md:pl-10">
            <p className="footer-col-title">Navigate</p>
            {NAV_LINKS.map((link, i) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="footer-link group inline-flex w-fit items-center gap-2.5"
              >
                <span className="footer-index">{String(i + 1).padStart(2, "0")}</span>
                {link.label}
              </button>
            ))}
          </nav>

          {/* Connect */}
          <nav className="flex flex-col gap-3.5 md:border-l md:border-[color:var(--line)] md:pl-10">
            <p className="footer-col-title">Connect</p>
            <a
              href={`mailto:${siteSettings.email}`}
              className="footer-link w-fit break-all"
            >
              {siteSettings.email}
            </a>
            {siteSettings.resumeUrl && (
              <a
                href={siteSettings.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link w-fit"
              >
                Résumé
              </a>
            )}
            <button onClick={openChat} className="footer-link w-fit text-left">
              Ask AI
            </button>
          </nav>
        </div>

        <div className="hairline" />

        {/* Stack row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-8">
          <span
            className="text-[0.65rem] uppercase tracking-[0.2em] text-faint"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Built with
          </span>
          {STACK.map((t) => (
            <span key={t} className="tech-tag">
              {t}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p
            className="text-xs text-faint"
            style={{ fontFamily: "var(--font-raleway)" }}
          >
            © {year}{" "}
            <span className="text-soft" style={{ fontFamily: "var(--font-poppins)" }}>
              {siteSettings.name}
            </span>
            . All rights reserved.
          </p>
          <button
            onClick={() => scrollTo("top")}
            className="group inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.16em] text-muted-luxe transition-colors hover:text-[#faf8f4]"
            style={{ fontFamily: "var(--font-poppins)" }}
            aria-label="Back to top"
          >
            Back to top
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 group-hover:-translate-y-0.5"
              style={{ borderColor: "var(--line)" }}
            >
              <ArrowUp size={13} style={{ color: "var(--gold)" }} />
            </span>
          </button>
        </div>
      </div>

      {/* Oversized name watermark — desktop: single line tracked tight to fit width */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-7 left-1/2 hidden -translate-x-1/2 select-none whitespace-nowrap font-bold leading-none text-white/[0.018] md:block"
        style={{
          fontFamily: "var(--font-poppins)",
          letterSpacing: "-0.07em",
          fontSize: `min(15vw, ${(98 / (siteSettings.name.length * 0.46)).toFixed(1)}vw)`,
        }}
      >
        {siteSettings.name}
      </span>

      {/* Oversized name watermark — mobile: first name only, big & bold */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-5 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-bold leading-none text-white/[0.025] md:hidden"
        style={{
          fontFamily: "var(--font-poppins)",
          letterSpacing: "-0.05em",
          fontSize: `min(30vw, ${(96 / (siteSettings.name.split(" ")[0].length * 0.5)).toFixed(1)}vw)`,
        }}
      >
        {siteSettings.name.split(" ")[0]}
      </span>
    </footer>
  );
}
