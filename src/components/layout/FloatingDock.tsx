"use client";

import { useState, useEffect } from "react";
import { Code2, Link, AtSign, Mail } from "lucide-react";
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
    href: "https://linkedin.com/in/tushardhankhar",
    icon: Link,
  },
  {
    id: "twitter",
    label: "Twitter / X",
    href: "https://twitter.com/tushardhankhar",
    icon: AtSign,
  },
  {
    id: "email",
    label: "Email Me",
    href: "mailto:tdhankhar@viamedia.ai",
    icon: Mail,
  },
];

export default function FloatingDock() {
  const [visible, setVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside
      className={cn(
        "fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3 transition-all duration-500",
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12 pointer-events-none"
      )}
      aria-label="Social links"
    >
      {/* Top decorative line */}
      <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/20" />

      {SOCIAL_LINKS.map((link) => {
        const Icon = link.icon;
        const isHovered = hoveredId === link.id;

        return (
          <div key={link.id} className="relative flex items-center">
            {/* Label that appears on hover (left side) */}
            <div
              className={cn(
                "absolute right-full mr-3 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200",
                "bg-[#1a1f2e] border border-white/10 text-white/80",
                isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
              )}
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {link.label}
              {/* Arrow */}
              <span className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#1a1f2e] border-r border-t border-white/10 rotate-45" />
            </div>

            {/* Icon button */}
            <a
              href={link.href}
              target={link.id !== "email" ? "_blank" : undefined}
              rel={link.id !== "email" ? "noopener noreferrer" : undefined}
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer",
                "bg-white/[0.05] border border-white/[0.08]",
                isHovered
                  ? "bg-purple/20 border-purple/40 text-white scale-110 shadow-lg shadow-purple/20"
                  : "text-white/50 hover:text-white"
              )}
              onMouseEnter={() => setHoveredId(link.id)}
              onMouseLeave={() => setHoveredId(null)}
              aria-label={link.label}
            >
              <Icon size={15} />
            </a>
          </div>
        );
      })}

      {/* Bottom decorative line */}
      <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
    </aside>
  );
}
