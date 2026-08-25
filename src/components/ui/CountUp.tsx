"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** Display value, e.g. "5+", "30+", "99.9%", "1.2k" — the numeric part animates. */
  value: string;
  /** total animation time in ms */
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

const EASE_OUT = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * Animates the numeric portion of a stat (prefix/suffix like "+", "%", "k"
 * render statically) when it scrolls into view. Falls back to the plain value
 * for reduced-motion users or unparsable strings.
 */
export default function CountUp({
  value,
  duration = 1400,
  className,
  style,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  const [display, setDisplay] = useState(match ? "0" : value);
  const started = useRef(false);

  const prefix = match?.[1] ?? "";
  const target = match ? parseFloat(match[2]) : 0;
  const decimals = match?.[2].includes(".") ? match[2].split(".")[1].length : 0;
  const suffix = match?.[3] ?? "";

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(match[2]);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1);
          setDisplay((target * EASE_OUT(p)).toFixed(decimals));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, target, decimals]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      <span className="tabular-nums">{display}</span>
      {suffix}
    </span>
  );
}
