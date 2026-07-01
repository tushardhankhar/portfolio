"use client";

import { useState, useEffect } from "react";
import { Code2, Link, Camera, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const SOCIAL_LINKS = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/tushardhankhar",
    icon: Code2,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tushar-dhankhar",
    icon: Link,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/tushardhankhar98/",
    icon: Camera,
  },
  {
    id: "email",
    label: "Email Me",
    href: "mailto:tushardhankhar98@gmail.com",
    icon: Mail,
  },
];

export default function FloatingDock() {
  const [visible, setVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside
      className={cn(
        "fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-4 transition-all duration-700",
        visible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-8 pointer-events-none"
      )}
      style={{ transitionTimingFunction: "var(--ease-luxe)" }}
      aria-label="Social links"
    >
      {/* Top hairline */}
      <div
        className="w-px h-14"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--line-strong))",
        }}
      />

      {SOCIAL_LINKS.map((link) => {
        const Icon = link.icon;
        const isHovered = hoveredId === link.id;

        return (
          <div key={link.id} className="relative flex items-center">
            {/* Label on hover */}
            <div
              className={cn(
                "absolute right-full mr-3 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all duration-300",
                "bg-[rgba(8,9,12,0.9)] border border-[color:var(--line)] backdrop-blur-md text-soft",
                isHovered
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-1.5 pointer-events-none"
              )}
              style={{
                fontFamily: "var(--font-poppins)",
                letterSpacing: "0.04em",
                transitionTimingFunction: "var(--ease-luxe)",
              }}
            >
              {link.label}
            </div>

            {/* Icon button */}
            <a
              href={link.href}
              target={link.id !== "email" ? "_blank" : undefined}
              rel={link.id !== "email" ? "noopener noreferrer" : undefined}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer",
                isHovered
                  ? "border-[color:var(--line-gold)] scale-110 bg-white/[0.03]"
                  : "border-[color:var(--line)] bg-white/[0.015]"
              )}
              style={{
                color: isHovered ? "var(--gold)" : "var(--text-muted)",
                transitionTimingFunction: "var(--ease-luxe)",
              }}
              onMouseEnter={() => setHoveredId(link.id)}
              onMouseLeave={() => setHoveredId(null)}
              aria-label={link.label}
            >
              <Icon size={15} />
            </a>
          </div>
        );
      })}

      {/* Bottom hairline */}
      <div
        className="w-px h-14"
        style={{
          background: "linear-gradient(to bottom, var(--line-strong), transparent)",
        }}
      />
    </aside>
  );
}
