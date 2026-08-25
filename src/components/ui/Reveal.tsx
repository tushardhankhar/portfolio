"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type ElementType,
} from "react";
import { cn } from "@/lib/utils";

type RevealVariant = "up" | "blur" | "scale" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** seconds of delay before the reveal transition */
  delay?: number;
  /** render as a different element (default div) */
  as?: ElementType;
  /** trigger once (default true) */
  once?: boolean;
  /** entrance style (default "up") */
  variant?: RevealVariant;
  /** stagger direct children instead of animating the wrapper as one block */
  stagger?: boolean;
  /** ms between staggered children (default 90) */
  staggerStep?: number;
}

const VARIANT_CLASS: Record<RevealVariant, string | undefined> = {
  up: undefined,
  blur: "reveal--blur",
  scale: "reveal--scale",
  left: "reveal--left",
  right: "reveal--right",
};

/**
 * Lightweight scroll-reveal wrapper. Adds `.is-visible` to the `.reveal`
 * class (defined in globals.css) when the element enters the viewport.
 * IntersectionObserver-based — cheap, no per-element GSAP instances.
 *
 * `variant` picks the entrance (rise / blur-in / scale / slide); `stagger`
 * cascades direct children with a CSS-custom-property delay instead of
 * animating the wrapper as a single block.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  once = true,
  variant = "up",
  stagger = false,
  staggerStep = 90,
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

  const style: CSSProperties & Record<string, string> = {};
  if (stagger) {
    if (delay) style["--stagger-base"] = `${delay}s`;
    if (staggerStep !== 90) style["--stagger-step"] = `${staggerStep}ms`;
  } else if (delay) {
    style.transitionDelay = `${delay}s`;
  }

  return createElement(
    Tag,
    {
      ref,
      className: cn(
        stagger ? "reveal-stagger" : "reveal",
        !stagger && VARIANT_CLASS[variant],
        visible && "is-visible",
        className
      ),
      style: Object.keys(style).length ? style : undefined,
    },
    children
  );
}
