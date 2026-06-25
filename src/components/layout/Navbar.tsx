"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/ui/Logo";
import { openChat } from "@/lib/chat-events";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  // Frost-on-scroll + auto-hide on scroll-down / reveal on scroll-up.
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const handleScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        setScrolled(y > 40);
        const delta = y - lastY;
        // Hide only when scrolling down past the hero; always show near top.
        if (y > 160 && delta > 6) setHidden(true);
        else if (delta < -6 || y < 160) setHidden(false);
        lastY = y;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) cancelAnimationFrame(frame);
    };
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
        hidden && !mobileOpen ? "-translate-y-full" : "translate-y-0",
        scrolled
          ? "glass-strong border-b border-[color:var(--line)]"
          : "bg-transparent border-b border-transparent"
      )}
      style={{ transitionTimingFunction: "var(--ease-luxe)" }}
    >
      <div className="container-luxe">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo lockup */}
          <button
            onClick={() => scrollToSection("#hero")}
            className="group cursor-pointer flex items-center gap-2.5"
            aria-label="Go to top"
          >
            <Logo
              animate
              className="h-6 w-[1.9rem] text-[#faf8f4] transition-[filter] duration-500 group-hover:[filter:drop-shadow(0_0_7px_rgba(233,200,75,0.55))]"
            />
            <span
              className="hidden sm:inline-block text-[#faf8f4] text-lg leading-none transition-colors group-hover:text-white"
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 600,
                letterSpacing: "-0.04em",
              }}
            >
              Tushar Dhankhar
            </span>
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
              onClick={openChat}
              aria-label="Ask the AI assistant about Tushar"
              className="inline-flex items-center gap-1.5 cursor-pointer text-xs uppercase text-muted-luxe hover:text-[#faf8f4] transition-colors group"
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 500,
                letterSpacing: "0.16em",
              }}
            >
              <Sparkles
                size={13}
                style={{ color: "var(--gold)" }}
                className="transition-transform duration-300 group-hover:rotate-12"
              />
              Ask AI
            </button>
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
            ? "max-h-[34rem] opacity-100 bg-[rgba(8,9,12,0.92)] backdrop-blur-xl border-t border-[color:var(--line)]"
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
            onClick={() => {
              setMobileOpen(false);
              openChat();
            }}
            className="flex items-center gap-2 text-left py-4 text-sm uppercase transition-colors duration-300 cursor-pointer border-t border-[color:var(--line)] text-muted-luxe hover:text-[#faf8f4]"
            style={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 500,
              letterSpacing: "0.16em",
            }}
          >
            <Sparkles size={15} style={{ color: "var(--gold)" }} />
            Ask AI
          </button>
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
