"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const lenis = (window as unknown as { lenis?: { scrollTo: (target: Element, opts?: object) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -80 });
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#0d1017]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("#hero")}
              className="flex items-center gap-2 group cursor-pointer"
              aria-label="Go to top"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold text-white transition-all duration-300 group-hover:scale-105"
                style={{
                  background:
                    "linear-gradient(135deg, #864797 0%, #0CC0DF 100%)",
                  boxShadow: "0 0 16px rgba(134,71,151,0.4)",
                }}
              >
                TD
              </div>
              <span
                className="hidden sm:block font-semibold text-white/80 group-hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Tushar
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 group cursor-pointer"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {link.label}
                  <span className="absolute bottom-1 left-4 right-4 h-px bg-yellow scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              ))}
              <a
                href="/Tushar_Dhankhar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 flex items-center gap-2 px-4 py-2 text-sm font-semibold border border-yellow/70 text-yellow rounded-lg hover:bg-yellow/10 transition-all duration-200 hover:border-yellow"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                <Download size={14} />
                Resume
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
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
            "md:hidden transition-all duration-300 overflow-hidden border-t border-white/[0.06]",
            mobileOpen
              ? "max-h-80 opacity-100 bg-[#0d1017]/95 backdrop-blur-xl"
              : "max-h-0 opacity-0"
          )}
        >
          <nav className="px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-left px-3 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.04] rounded-lg transition-all duration-200 cursor-pointer"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {link.label}
              </button>
            ))}
            <a
              href="/Tushar_Dhankhar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center gap-2 px-3 py-3 text-sm font-semibold text-yellow border border-yellow/50 rounded-lg hover:bg-yellow/10 transition-all duration-200"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              <Download size={14} />
              Download Resume
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
