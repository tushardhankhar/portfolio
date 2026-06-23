"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ElementType,
} from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** seconds of delay before the reveal transition */
  delay?: number;
  /** render as a different element (default div) */
  as?: ElementType;
  /** trigger once (default true) */
  once?: boolean;
}

/**
 * Lightweight scroll-reveal wrapper. Adds `.is-visible` to the `.reveal`
 * class (defined in globals.css) when the element enters the viewport.
 * IntersectionObserver-based — cheap, no per-element GSAP instances.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return createElement(
    Tag,
    {
      ref,
      className: cn("reveal", visible && "is-visible", className),
      style: { transitionDelay: delay ? `${delay}s` : undefined },
    },
    children
  );
}
