"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Subtle two-part cursor: a small solid dot that tracks instantly, and a
 * larger ring that lags slightly and expands over interactive elements.
 * Disabled on touch / coarse pointers and for reduced-motion users.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  // Decide whether to enable (fine pointer, no reduced-motion preference).
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (fine && !reduce) setEnabled(true);
  }, []);

  // Attach listeners only once enabled — at which point the refs are mounted.
  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, [role='button'], input, textarea, label");
      ring.style.setProperty("--ring-scale", interactive ? "1.9" : "1");
      ring.style.setProperty(
        "--ring-bg",
        interactive ? "rgba(233,200,75,0.10)" : "transparent"
      );
      ring.style.setProperty(
        "--ring-border",
        interactive ? "rgba(233,200,75,0.55)" : "rgba(236,233,228,0.28)"
      );
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(var(--ring-scale, 1))`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          borderRadius: "50%",
          background: "var(--gold)",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 34,
          height: 34,
          borderRadius: "50%",
          border: "1px solid var(--ring-border, rgba(236,233,228,0.28))",
          background: "var(--ring-bg, transparent)",
          pointerEvents: "none",
          zIndex: 9998,
          transition: "background 0.25s ease, border-color 0.25s ease, scale 0.18s ease",
        }}
      />
    </>
  );
}
