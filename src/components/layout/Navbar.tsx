"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active-section highlight via IntersectionObserver
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as unknown as {
      lenis?: { scrollTo: (target: Element, opts?: object) => void };
    }).lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: -80 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[rgba(8,9,12,0.72)] backdrop-blur-xl border-b border-[color:var(--line)]"
          : "bg-transparent border-b border-transparent"
      )}
      style={{ transitionTimingFunction: "var(--ease-luxe)" }}
    >
      <div className="container-luxe">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Wordmark */}
          <button
            onClick={() => scrollToSection("#hero")}
            className="group cursor-pointer flex items-baseline gap-2"
            aria-label="Go to top"
          >
            <span
              className="text-[#faf8f4] text-lg leading-none transition-colors group-hover:text-white"
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 600,
                letterSpacing: "-0.04em",
              }}
            >
              Tushar Dhankhar
            </span>
            <span
              className="hidden sm:inline-block w-1.5 h-1.5 rounded-full transition-colors"
              style={{ background: "var(--gold)" }}
            />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={cn(
                    "relative cursor-pointer text-xs uppercase transition-colors duration-300 group py-1",
                    isActive ? "text-[#faf8f4]" : "text-muted-luxe hover:text-[#faf8f4]"
                  )}
                  style={{
                    fontFamily: "var(--font-poppins)",
                    fontWeight: 500,
                    letterSpacing: "0.16em",
                  }}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 right-0 h-px origin-left transition-transform duration-500",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                    style={{
                      background: "var(--gold)",
                      transitionTimingFunction: "var(--ease-luxe)",
                    }}
                  />
                </button>
              );
            })}
            <button
              onClick={() => scrollToSection("#contact")}
              className="btn btn-ghost ml-1"
            >
              Let&apos;s talk
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-luxe hover:text-[#faf8f4] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-500",
          mobileOpen
            ? "max-h-96 opacity-100 bg-[rgba(8,9,12,0.92)] backdrop-blur-xl border-t border-[color:var(--line)]"
            : "max-h-0 opacity-0"
        )}
        style={{ transitionTimingFunction: "var(--ease-luxe)" }}
      >
        <nav className="container-luxe py-6 flex flex-col">
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className={cn(
                "text-left py-4 text-sm uppercase transition-colors duration-300 cursor-pointer",
                i !== 0 && "border-t border-[color:var(--line)]",
                active === link.href
                  ? "text-[#faf8f4]"
                  : "text-muted-luxe hover:text-[#faf8f4]"
              )}
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 500,
                letterSpacing: "0.16em",
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection("#contact")}
            className="btn btn-ghost mt-5 self-start"
          >
            Let&apos;s talk
          </button>
        </nav>
      </div>
    </header>
  );
}
